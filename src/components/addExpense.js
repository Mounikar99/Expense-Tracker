import React, { useState } from 'react';
import '../styles/addExpense.css'

function AddExpense({addExpense}) {
    const today = new Date();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(today.toISOString().substring(0, 10));
    const [type, setType] = useState('spent');
    const [category, setcategory] = useState('food');
    const updateExpenseData = (e) => {
        if (e.target.id === 'name') {
            setName(e.target.value);
        } else if (e.target.id === 'amount') {
            setAmount(e.target.value);
        } else if (e.target.id === 'date') {
            setDate(e.target.value);
        } else if (e.target.id === 'category') {
            setcategory(e.target.value);
        } else if (e.target.id === 'type') {
            setType(e.target.value);
        }
    }
    const addExpenseToList = () => {
        if (name === '' || amount === '' || date === '' || type === '' || category === '') {
            return;
        }
        const newExpense = {
            name: name,
            amount: +amount,
            date: getFormattedDate(new Date(date)),
            type: type,
            category: category
        }
        addExpense(newExpense);
    }

    const getFormattedDate = (inputDate) => {
        const day = inputDate.getDate().toString().padStart(2, '0');
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = inputDate.getFullYear();

        // Format the date in the desired format
        return `${day}/${month}/${year}`;
    }
    return (
        <div id='addExpenseContainer'>
            <h1 className='headingForSection'>Add Expense</h1>
            <span className='horizontalLine'></span>
            <div className='addExpenseFieldContainer'>
                <div className='addExpenseField'>
                    <div className='categoryContainer'>
                        <select id='type' onChange={(e) => updateExpenseData(e)}>
                            <option value='spent'>🔴 Spent</option>
                            <option value='earn'>🟢 Earn</option>
                        </select>
                        <select id='category' onClick={(e) => updateExpenseData(e)}>
                            <option value='food'>🍕 Food</option>
                            <option value='rent'>🏠 Rent</option>
                            <option value='travel'>🧳 Travel</option>
                            <option value='bills'>🗒️ Bills</option>
                            <option value='shopping'>🛒 Shopping</option>
                            <option value='entertainment'>📺 Entertainment</option>
                            <option value='health'>🏥 Health</option>
                            <option value='other'>💸 Other</option>
                        </select>
                    </div>
                </div>
                <div className='addExpenseField'>
                    <input type='text' id='name' placeholder='Expense' autoComplete='off' onChange={(e) => updateExpenseData(e)} />
                </div>
                <div className='addExpenseField'>
                    <input type='number' id='amount' placeholder='$' autoComplete='off' onChange={(e) => updateExpenseData(e)} />
                </div>
                <div className='addExpenseField'>
                    <input type='date' id='date' value={date} placeholder='dd/mm/yyyy' onChange={(e) => updateExpenseData(e)}/>
                </div>
                <button className='addExpenseButton' onClick={() => addExpenseToList()}>ADD</button>
            </div>
            
        </div>
    )
}

export default AddExpense
