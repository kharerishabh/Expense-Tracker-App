import React from "react";
import './ExpenseItem.css'

 const ExpensesItem = (props) => {
//   const deleteHandler = async () => {
  
//     //  console.log(props.item.id)
//     // try {
//     //   const res = await fetch(
//     //     `https://expense-tracker-app-34f7d-default-rtdb.firebaseio.com/${email}/Expenses/${props.item.id}.json`,
//     //     {
//     //       method: "DELETE",
//     //       headers: {
//     //         "Content-Type": "application/json",
//     //       },
//     //     }
//     //   );
//     //   const data = await res.json();
//     //   if (res.ok) {
//     //     alert("Expenses Successfully Deleted");
//     //     props.deleteItem(props.item)
//     //   } else {
//     //     throw data.error;
//     //   }
//     // } catch (err) {
//     //   console.log(err.message);
//     // }
//   };

  // const editHandler = async () => {
  //   try {
  //     const res = await fetch(
  //       `https://expense-tracker-app-34f7d-default-rtdb.firebaseio.com/${email}/Expenses/${props.item.id}.json`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application.json",
  //         },
  //       }
  //     );
  //     const data = await res.json();
  //     if (res.ok) {
  //       alert("Expenses Successfully Edited");
  //       props.editItem(props.item)
  //     } else {
  //       throw data.error;
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  return (
    <>
      <li className="llistlement">
        <b>Amount</b>:-RS {props.item.amount}
        <b>Description</b>:-{props.item.description}
        <b>Category</b> :-{props.item.category}
        <button className="bg-blue" onClick={() => props.editItem(props.item)}>
          Edit
        </button>
        <button className="bg-red" onClick={() => props.deleteItem(props.item)}>
          Delete
        </button>{" "}
      </li>
    </>
  );
};
export default ExpensesItem;
