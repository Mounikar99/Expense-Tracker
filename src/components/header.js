import React from "react";
import '../styles/header.css';

function Header({openCloseDialog}) {
  return (
    <div id="mainHeader">
      <div className="heading">Expense Tracker</div>
      <div className="headerOptions">
       <span class="material-symbols-outlined" onClick={() => openCloseDialog()}>notifications</span>
      </div>
    </div>
  );
}

export default Header;
