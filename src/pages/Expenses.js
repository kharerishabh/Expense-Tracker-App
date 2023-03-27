import React, { useEffect, useRef, useState } from "react";
import ExpensesItem from "../components/Expenses.js/ExpensesItem";
import "./Expenses.css";
const Expenses = () => {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const Dummy_Expenses = [];
  const [expenses, setExpenses] = useState(Dummy_Expenses);

  const fetchExpenses = async () => {
    try {
      const res = await fetch(
        `https://expense-tracker-app-34f7d-default-rtdb.firebaseio.com/Expenses.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        const newData = [];
        for (let key in data) {
          newData.push({ id: key, ...data[key] });
          console.log(data[key].category)
        }
        setExpenses(newData);
      } else {
        throw data.error;
      }
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    fetchExpenses()
  },[])
  const addExpenseHandler = async (event) => {
    event.preventDefault();
    const obj = {
      amount: amountInputRef.current.value,
      description: descriptionInputRef.current.value,
      category: categoryInputRef.current.value,
    };
    try {
      const res = await fetch(
        `https://expense-tracker-app-34f7d-default-rtdb.firebaseio.com/Expenses.json`,
        {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );
      const data = await res.json()
      if(res.ok){
        alert('Expenses are added successfully')
        amountInputRef.current.value = ''
        descriptionInputRef.current.value = ''
        categoryInputRef.current.value = ''
        await fetchExpenses()
      }else{
        throw data.error
      }

    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div>
        <form className="form-expenses" onSubmit={addExpenseHandler}>
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" required ref={amountInputRef} />
          <label htmlFor="desc">Description</label>
          <textarea
            type="text"
            id="des"
            rows="3"
            required
            ref={descriptionInputRef}
          />
          <label htmlFor="cat">Choose One</label>
          <select id="cat" ref={categoryInputRef}>
            <option value="food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Rent">Rent</option>
            <option value="Others">Others</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="expenses-list">
        <h5>All Expenses</h5>
        {expenses.map((expense) => {
            return (<ExpensesItem key={expense.id} item={expense}/>)
        })}
      </div>
    </div>
  );
};
export default Expenses;
