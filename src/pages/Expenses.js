import React, { useRef, useEffect } from "react";
import ExpensesItem from "../components/Expenses.js/ExpensesItem";
import classes from "./Expenses.module.css";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/expense-slice";
import { themeActions } from "../store/themeSlice";

const Expenses = () => {
  const dispatch = useDispatch();
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const { expenseItem, editExpenseItem, totalAmount } = useSelector(
    (state) => state.expense
  );
  console.log(expenseItem);
  const theme = useSelector((state) => state.theme.darkTheme);

  const deleteExpenseHandler = (item) => {
    dispatch(expenseActions.removeExpenses(item));
  };

  const editExpenseHandler = (item) => {
    dispatch(expenseActions.editExpenses(item));
    amountInputRef.current.value = item.amount
    descriptionInputRef.current.value = item.description
    categoryInputRef.current.value = item.category
  };

  const addExpenseHandler = async (event) => {
    event.preventDefault();
    console.log("Added");
    const expenseData = {
      amount: Number(amountInputRef.current.value),
      description: descriptionInputRef.current.value,
      category: categoryInputRef.current.value,
      id: Math.random().toString()
    };
    dispatch(expenseActions.addExpense(expenseData));
    amountInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputRef.current.value = "";
  };

  const themeHandler = () => {
    dispatch(themeActions.toggleTheme({ value: true }));
  };
  useEffect(() => {
    if (totalAmount < 10000) {
      dispatch(themeActions.toggleTheme({ value: false }));
    }
  });

  console.log(expenseItem);
  const handleDownload = () => {
    const csvData = expenseItem
      .map(
        (data) =>
          `${data.amount},${data.category},${data.description},${data.id}\n`).join("");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  return (
    <div className={classes[theme ? "dark-theme" : ""]}>
      <div className={classes.auth}>
        <h1>Daily Expense</h1>
        <form onSubmit={addExpenseHandler}>
          <div className={classes.control}>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              required
              ref={amountInputRef}
              defaultValue={editExpenseItem.amount}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">description</label>
            <input
              type="text"
              id="description"
              required
              ref={descriptionInputRef}
              defaultValue={editExpenseItem.description}
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              className={classes.select}
              ref={categoryInputRef}
              defaultValue={editExpenseItem.category}
            >
              <option>Food</option>
              <option>Shopping</option>
              <option>Travel</option>
            </select>
          </div>
          <div className={classes.actions}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div>
        <ul>
          {expenseItem.map((data) => {
            return (
              <ExpensesItem
                item={data}
                key={data.id}
                deleteItem={deleteExpenseHandler}
                editItem={editExpenseHandler}
              />
            );
          })}
        </ul>
      </div>
      <div className={classes.list}>
        <span className={classes.listitem}>
          Total Amount: ₹{totalAmount}.00
        </span>
      </div>
      <div className={classes.actions}>
        {totalAmount > 10000 && (
          <button onClick={themeHandler}>Activate Premium</button>
        )}
        {totalAmount > 10000 && theme && (
          <button onClick={handleDownload}>Download File</button>
        )}
      </div>
    </div>
  );
};
export default Expenses;
