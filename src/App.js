import './App.css';
import "../node_modules/video-react/dist/video-react.css"; 
import "./SCSS/index.scss";
import { Routes, Route } from "react-router-dom";

// import components 
import MainContainer from './layouts/MainContainer'
import CandidatesList from './components/CandidatesList';
import ApplicationDetails from './components/ApplicationDetails';
import Header from './layouts/Header';


function App() {
  return (
    <div className="App">
      <div className="header"><Header/></div>
      <Routes>
          <Route path="/" element={<MainContainer />}>
            <Route index element={<CandidatesList />} />
            <Route path="/application/:applicationId" element={<ApplicationDetails />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
