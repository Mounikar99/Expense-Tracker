import React, {useState} from "react";
import "../styles/overview.css";

function Overview({spent, earned, budget, setBudget, balance}) {
  const [isEditBudget, setIsEditBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);
  const editBudget = () => {
    setIsEditBudget(!isEditBudget);
  }

  const setBudgetLimit = () => {
    debugger
    setBudget(+newBudget);
    editBudget();
  }
  return (
    <div id="overviewSection">
      {/* <div id="overviewProgress">
      <div className="progressBar">
        <div className="progress"></div>
      </div>
      <label className="toggleSwitch">
          <input type="checkbox"/>
          <span className="slider"></span>
      </label>
      </div> */}
      <div className="overviewContainers">
        <div className="overviewBox">
          <div className="overviewBoxLeft">
            <span className="overviewBoxTitle">Total Budget</span>
            { isEditBudget ? 
              <div id="budgetInputContainer">
                <input type="number" id="budgetInput" placeholder="Monthly Budget" value={newBudget} onChange={(e) => setNewBudget(e.target.value)}/>
                <span id="budgetDoneIcon" onClick={() => setBudgetLimit()} className="material-symbols-outlined">done</span>
              </div> : 
              <span className="overviewBoxAmount">${budget}
                <span id="budgetEditIcon" onClick={() => editBudget()} className="material-symbols-outlined">edit</span>
              </span>
            }
          </div>
          <div className="overviewBoxRight">
            <span className="material-symbols-outlined moneyOverviewIcon">send_money</span>
          </div>
        </div>
        <div className="overviewBox">
          <div className="overviewBoxLeft">
            <span className="overviewBoxTitle">Total Expense</span>
            <span className="overviewBoxAmount">${spent}</span>
          </div>
          <div className="overviewBoxRight">
            <span className="material-symbols-outlined moneyOverviewIcon spendIcon">send_money</span>
          </div>
        </div>
        <div className="overviewBox">
          <div className="overviewBoxLeft">
            <span className="overviewBoxTitle">Total Balance</span>
            <span className="overviewBoxAmount">${balance}</span>
          </div>
          <div className="overviewBoxRight">
            <span className="material-symbols-outlined moneyOverviewIcon savingsIcon">wallet</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
