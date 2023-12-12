import React from "react";
import "../styles/dialog.css";

function Dialog({ openCloseDialog }) {
  const alerts = [
    { id: 1, text: "Notification feature will be added soon" },
    { id: 2, text: "You can upload your bills and expenses will be added in your account" },
    { id: 3, text: "By adding your bank accounts the expenses will be analyzed and added here!" },
  ];
  return (
    <div>
      <div className="dialog-overlay"></div>
      <div className="dialog">
        <div className="dialog-header">
          <div className="dialog-title">Upcoming Features 😎</div>
          <span
            className="material-symbols-outlined"
            onClick={() => openCloseDialog()} id="closeIcon">
            close
          </span>
        </div>
        <div></div>
        {alerts.map((alert) => (
          <div className="alert" key={alert.id}>
            {alert.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dialog;
