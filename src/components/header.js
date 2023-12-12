import React from "react";
import '../styles/header.css';

function Header({openCloseDialog, logOut}) {
  return (
    <div id="mainHeader">
      <div className="heading">Expense Tracker</div>
      <div className="headerOptions">
       <span className="material-symbols-outlined" id="notificationIcon" onClick={() => openCloseDialog()}>notifications</span>
       <span className="material-symbols-outlined" id="logoutIcon" onClick={() => logOut()}>logout</span>
      </div>
    </div>
  );
}

export default Header;
