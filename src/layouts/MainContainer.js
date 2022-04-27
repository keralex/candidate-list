import React from 'react';
import { Outlet} from "react-router-dom";

// where all the pages should show
function MainContainer() {
    return (
      <>
        <Outlet />
      </>
    );
  }
  
  export default MainContainer;
  