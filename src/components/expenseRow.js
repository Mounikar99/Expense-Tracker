import React, { useEffect, useState } from 'react';
import '../styles/expenseRow.css';

function ExpenseRow({ expense, deleteExpense }) {
    const [expenseIcon, setExpenseIcon] = useState('🍕');
    const isEarn = expense.type === 'earn';
    const amount = isEarn ? `$${expense.amount}` : `-$${expense.amount}`;
    useEffect(() => {
        updateExpenseIcon(expense.category);
    }, [expense])

    const updateExpenseIcon = (category) => {
        if(category === 'food') {
            setExpenseIcon('🍕');
        } else if(category === 'travel') {
            setExpenseIcon('🧳');
        } else if(category === 'rent') {
            setExpenseIcon('🏠');
        } else if(category === 'shopping') {
            setExpenseIcon('🛒');
        } else if(category === 'entertainment') {
            setExpenseIcon('🎬');
        } else if(category === 'health') {
            setExpenseIcon('🏥');
        } else if(category === 'bills') {
            setExpenseIcon('🗒️');
        } else if(category === 'other') {
            setExpenseIcon('💸');
        }
    }
    return (
        <div className='expenseRow' style={{ borderLeft: `2px solid ${isEarn ? 'var(--earn-color)' : 'var(--spent-color)'}`}}>
            <span className="expenseIcon">{expenseIcon}</span>
            <span className='expenseName'>{expense.name}</span>
            <span className='expenseDate'>{expense.date}</span>
            <span className={`expenseAmount ${expense.type}`}>{amount}</span>
            <span className="material-symbols-outlined deleteExpense" onClick={() => deleteExpense(expense.id)}>delete</span>
        </div>
    )
}

export default ExpenseRow
