import React, { useState } from 'react';
import '../styles/addExpense.css'

function AddExpense({addExpense}) {
    const today = new Date();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(today.toISOString().substring(0, 10));
    const [type, setType] = useState('spent');
    const [category, setcategory] = useState('food');
    const spentCategories = [{text: '🍕 Food', value: 'food'}, {text: '🧳 Travel', value: 'travel'}, {text: '🏠 Rent', value: 'rent'}, {text: "🎁 Gift", value: 'gift'}, {text: '📚 Education', value: 'education'},
     {text: '📺 Entertainment', value: 'entertainment'}, {text: '🏥 Health', value: 'health'}, {text: '🛒 Shopping', value: 'shopping'}, {text: '🗒️ Bills', value: 'bills'}, {text: '💸 Other', value: 'other'}];

    const earnCatogories = [{text: '💰 Salary', value: 'salary'}, {text: '📈 Investment', value: 'investment'}, {text: '💼 Freelance', value: 'freelance'}, {text: '💸 Other', value: 'other'}];
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
        return `${month}/${day}/${year}`;
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
                            {
                                type === 'spent' ? spentCategories.map((category) => {
                                    return <option value={category.value}>{category.text}</option>
                                }) : earnCatogories.map((category) => {
                                    return <option value={category.value}>{category.text}</option>
                                })
                            }
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
