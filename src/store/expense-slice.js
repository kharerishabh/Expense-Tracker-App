import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  expenseItem: [],
  totalAmount: 0,
  changed: false,
  editExpenseItem: {},
};
const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {
    replaceExpenses(state, action) {
      state.expenseItem = action.payload.expenseItem;
      state.totalAmount = Number(action.payload.totalAmount);
    },
    addExpense(state, action) {
      state.changed = true;
      state.expenseItem.push(action.payload);
      state.totalAmount = state.totalAmount + action.payload.amount;
    },
    removeExpenses(state, action) {
      state.changed = true;
      const id = action.payload.id
      state.expenseItem = state.expenseItem.filter((item) => item.id !== id)
      state.totalAmount = state.totalAmount - action.payload.amount
    },
    editExpenses(state, action) {
      state.changed = true;
      const id = action.payload.id;
      state.expenseItem = state.expenseItem.filter((item) => item.id !== id);
      state.totalAmount = state.totalAmount - action.payload.amount;
      state.editExpenseItem = action.payload
    },
  },
});
export const expenseActions = expenseSlice.actions;
export default expenseSlice;
