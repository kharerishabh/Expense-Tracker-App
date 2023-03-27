import React from "react";

const ExpensesItem = (props) => {
  return (
    <div>
      <li>
        {`${props.item.amount} ${props.item.description} ${props.item.category}`}
      </li>
    </div>
  );
};
export default ExpensesItem;
