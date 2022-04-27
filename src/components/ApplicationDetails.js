import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Player } from "video-react";
function ApplicationDetails(props) {
  // state ==================================================================================================
  const [candidate, setCandidate] = useState({ name: "" });
  const [applicationData, setApplicationData] = useState({
    id: "",
    videos: [],
  });
  const [questions, setQuestions] = useState([]);
  const [errorState, setErrorState] = useState({ hasError: false });
  // this state is to know when to update the comment section 
  const [applicationUpdated, setApplicationUpdated] = useState(false);
  let applicationId = useParams().applicationId;

  // function handle error when fetch api
  const handleError = (err) => {
    setErrorState({ hasError: true, message: err.message });
  };

  // api calls ================================================================================================
  // get the name of the candidate
  async function getCandidateData() {
    try {
      const responseCandidateData = await fetch(
        "http://localhost:3010/candidates?applicationId=" + applicationId
      );
      if (!responseCandidateData.ok) {
        throw "Network Error";
      }
      const data = await responseCandidateData.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  // get application data like videos
  async function getApplicationData() {
    try {
      const responseApplicationData = await fetch(
        "http://localhost:3010/applications/" + applicationId
      );
      if (!responseApplicationData.ok) {
        throw "Network Error";
      }
      const data = await responseApplicationData.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  // get question list
  async function getQuestions() {
    try {
      const questionData = await fetch("http://localhost:3010/questions");
      if (!questionData.ok) {
        throw "Network Error";
      }
      const data = await questionData.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  // update comment
  function addComments(event) {
    event.preventDefault();
    let dataToUpdate = applicationData;
    fetch("http://localhost:3010/applications/" + applicationId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToUpdate),
    }).then(setApplicationUpdated(true));
  }
  // get question div ============================================================================
  function getQuestion(questionId) {
    let filteredQuestion = questions[0].filter(
      (question) => question.id == questionId
    )[0];
    return <div>{filteredQuestion.question}</div>;
  }
  //handle input change and set new application data - comments 
  function handleInputChange(e) {
    const videoIndex = e.target.name;
    let comment = e.target.value;
    let dataToUpdate = applicationData;
    dataToUpdate.videos[videoIndex].comments = comment;
    setApplicationData(dataToUpdate);
  }
  // useEffect =========================================================================================================================
  useEffect(() => {
    getQuestions()
      .then((data) => {
        if (questions.length == 0) {
          setQuestions((prevArray) => [...prevArray, data]);
        }
      })
      .catch(handleError);
  }, []);

  useEffect(() => {
    getCandidateData()
      .then((data) => {
        setCandidate((prevState) => ({
          ...prevState,
          name: data[0].name,
        }));
      })
      .catch(handleError);
  }, []);

  useEffect(() => {
    getApplicationData()
      .then((data) => {
        setApplicationData((prevState) => ({
          ...prevState,
          videos: data.videos,
        }));
        setApplicationUpdated(false);
      })
      .catch(handleError);
  }, [applicationUpdated]);

  // return app ===================================================================================================================
  return (
    <div className="application-page">
      <div className="application-container">
        {errorState.hasError && <div>{errorState.message}</div>}
        <div className="candidate-info">
          <h4 className="name">{candidate.name}</h4>
        </div>
        <div className="videos">
          {applicationData.videos.map((video, i) => (
            <div className="video-container" key={video.questionId}>
              <div className="video-question">

              <p className="video-question-text">
                <span>Question:</span>
                {getQuestion(video.questionId)}
              </p>
              <Player playsInline src={video.src} />
              </div>
              <div className="video-Comment">
              <form>
                  <label>
                    Leave a comment:
                    <input type="text" name={i} placeholder="comments...." onChange={handleInputChange} />
                  </label>
                  <input
                    type="submit"
                    value="Save"
                    onClick={(event) => addComments(event, i)}
                    className="btn-submit"
                  />
                </form>
                {video.comments != "" && (
                  <div className="comment-container">
                    <h4>Recruiter Comment:</h4>
                    <p>
                    {video.comments}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetails;
