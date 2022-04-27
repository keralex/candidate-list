import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// candidates list
function CandidatesList() {
    // state ========================================================================
    const [candidates, setCandidates] = useState([])
    const [errorState, setErrorState] = useState({hasError: false})
    // handle fetch error 
    const handleError = (err) => {
      setErrorState({hasError:true, message: err.message});
    }

    async function getCandidates() {
      try{
        const response = await fetch('http://localhost:3010/candidates');
        if(!response.ok) {
            throw 'Network Error';
        }
        const data = await response.json();
        return data;

      }
      catch(error){
          throw error;
      }
    }
    // use effet to set candidates 
    useEffect(() => {
      getCandidates().then((data) => setCandidates(data)).catch(handleError);
    },[])

    return (
      <div className="list-page">
        <div className="list-container">
          <h4>Candidates List</h4>
          <ul>
          {errorState.hasError && <div>{errorState.message}</div>}
          {
            candidates.map((candidate)=>(
              candidate.applicationId ? 
                <li key={candidate.id}><Link to={`/application/${candidate.applicationId}`}><p>{candidate.name}</p></Link></li>
                :
                <li key={candidate.id} className="without-appliccation"><Link to='#' className='disabled-link'><p>{candidate.name}</p>  <p className='disabled-info'>doesn't exist application yet</p> </Link></li>
            ))
          }
        </ul>
        </div>
      </div>
    );
  }
  
  export default CandidatesList;
  