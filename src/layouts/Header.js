import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  //the only thing that we do here is to add a button to get back to the list in case that you are not in the list page
  const navigate = useNavigate();
  let path = useLocation();
  return (
    <div>
      {path.pathname != "/" && (
        <button onClick={() => navigate(-1)}>Back</button>
      )}
    </div>
  );
}

export default Header;
