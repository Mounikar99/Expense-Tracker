import React from 'react';
import '../styles/expensehistory.css';
import ExpenseRow from './expenseRow';

function ExpensesHistory({expenses, deleteExpense}) {
    return (
        <div id='expensesHistory'>
            <h1 className='headingForSection'>Expenses History</h1>
            <span className='horizontalLine'></span>
            <div className='expenseHistoryList'>
                {
                   expenses.length > 0 ? 
                   (expenses.map((expense, index) => <ExpenseRow expense={expense} key={index} deleteExpense={deleteExpense} />)) :
                   (<span style={{color: '#a4a4a4'}}>No expenses found</span>)
                }
            </div>
        </div>
    )
}

export default ExpensesHistory;
