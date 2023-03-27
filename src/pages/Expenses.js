import React, { useState } from "react";
import './Expenses.css'
const Expenses = () => {
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");

  const [expenses, setExpenses] = useState([]);

  const addExpenseHandler = (event) => {
    event.preventDefault();
    setExpenses((prev) => {
      return [
        ...prev,
        {
          eAmount: expenseAmount,
          eDescription: expenseDescription,
          eCategory: expenseCategory,
        },
      ];
    });
  };

  return (
    <div>
        <div>
        <form className="form-expenses" onSubmit={addExpenseHandler}>
        <lable htmlFor="amount">Amount</lable>
        <input
          type="number"
          id="amount"
          required
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
        <label htmlFor="desc">Description</label>
        <textarea
          type="text"
          id="des"
          rows="3"
          value={expenseDescription}
          required
          onChange={(e) => setExpenseDescription(e.target.value)}
        />
        <label htmlFor="cat">Category</label>
        <select
        value={expenseCategory}
        id='cat'
        onChange={(e) => setExpenseCategory(e.target.value)}>
         <option value="food">Food</option>
         <option value="Shopping">Shopping</option>
         <option value="Rent">Rent</option>
         <option value="Others">Others</option>
        </select>
      <button type="submit">Submit</button>
      </form>
    </div>
    <div>All Expenses</div>
    <table >
        <tbody>
            {expenses.map((expense, index) => {
               return  (<tr key={index}>
                    <td>{expense.eAmount}</td>
                    <td>{expense.eDescription}</td>
                    <td>{expense.eCategory}</td>
                </tr>)
            })}
        </tbody>
    </table>
    </div>
  );
};
export default Expenses;
