/* eslint-disable react-hooks/exhaustive-deps */
import Header from "./components/header";
import Overview from "./components/overview";
import ExpensesHistory from "./components/expensesHistory";
import AddExpense from "./components/addExpense";
import ChartComponent from "./components/chart";
import Loader from "./components/loader";
import Dialog from "./components/dialog";
import "./App.css";
import { useEffect, useState } from "react";
import { ExpenseContext } from "./store/ExpenseContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./store/Firebase";
import LoginSignup from "./components/login-signup";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);
  const [spentAmount, setSpentAmount] = useState(0);
  const [earnAmount, setEarnAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const addExpenseToList = async (newExpense) => {
    setExpenses([...expenses, newExpense]);
    newExpense.uid = user.uid;
    await addExpensesInDB(newExpense);
  };

  const deleteExpenseInList = async (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
    await deleteExpenseInDB(id);
  };

  const addExpensesInDB = async (newExpense) => {
    addDoc(collection(db, "expenses"), newExpense);
  }

  const deleteExpenseInDB = async (id) => {
    await deleteDoc(doc(db, "expenses", id));
  }

  const setBugetLimit = (newBudget) => {
    setBudget(newBudget);
    setBalance(newBudget - spentAmount);
    setBugetLimitInDB(newBudget);
  };

  const setBugetLimitInDB = async (newBudget) => {
    const querySnapshot = await getDocs(collection(db, "budget"));
    let budgets = [];
    querySnapshot.forEach((budget) => {
      budgets.push({ ...budget.data(), id: budget.id });
    });
    budgets = budgets.filter((budget) => user && budget.uid === user.uid);
    if(budgets.length > 0) {
      budgets.forEach(async (budget) => {
        await deleteDoc(doc(db, "budget", budget.id));
      });
    }
    await addDoc(collection(db, "budget"), { budget: newBudget, uid: user.uid });
  }

  useEffect(() => {
    updateAmounts();
    
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
  });

  useEffect(() => {
    getExpensesFromDB();
    getBudgetLimitFromDB();
  }, [user]);

  const getExpensesFromDB = async () => {
    const querySnapshot = await getDocs(collection(db, "expenses"));
    let docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    docs = docs.filter((doc) => user && doc.uid === user.uid);
    setExpenses(docs);
    setIsLoading(false);
  }

  const getBudgetLimitFromDB = async () => {
    const querySnapshot = await getDocs(collection(db, "budget"));
    let docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    docs = docs.filter((doc) => user && doc.uid === user.uid);
    if(docs.length > 0) {
      setBudget(docs[0].budget);
    }
  }

  const updateAmounts = () => {
    let totalSpent = 0;
    let totalEarned = 0;
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].type === "spent") {
        totalSpent += expenses[i].amount;
      } else if (expenses[i].type === "earn") {
        totalEarned += expenses[i].amount;
      }
    }
    setSpentAmount(totalSpent);
    setEarnAmount(totalEarned);
    let spentExpenses = expenses.filter((expense) => expense.type === "spent")
    let totalExpense = spentExpenses && spentExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    setBalance(budget + totalEarned - totalExpense);
  };

  const openCloseDialog = () => {
    setOpenDialog(!openDialog);
  }

  const logOut = () => {
    signOut(auth);
    setUser(null);
  }
  return (
    <ExpenseContext.Provider
      value={{ expenses, setExpenses, budget, setBudget }}
    >
      {openDialog && (<Dialog openCloseDialog={openCloseDialog} />)}
      {isLoading && (<Loader />)}
      {user ? (
        <div className="App">
          <Header openCloseDialog={openCloseDialog} logOut={logOut} />
          <Overview
            spent={spentAmount}
            earned={earnAmount}
            balance={balance}
            budget={budget}
            setBudget={setBugetLimit}
          />
          <div className="expenseSection">
            <ExpensesHistory expenses={expenses} deleteExpense={deleteExpenseInList} />
            <AddExpense addExpense={addExpenseToList} />
            <ChartComponent expenses={expenses} type="spent" />
            <ChartComponent expenses={expenses} type="earn" />
          </div>
        </div>
      ) : (
        <LoginSignup />
      )}
    </ExpenseContext.Provider>
  );
}


export default App;
