import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();
export const reducer = (state, action) => {
  switch (action.type) {
    case "setMenu":
      return { ...state, setMenu: action.payload };
    case "setBreadcrumb":
      return { ...state, breadcrumb: action.payload };
    case "deleteBreadcrumb":
      delete state.breadcrumb;
      return state;
    default:
      return state;
  }
};

const persist = (reducer) => {
  return (state, action) => {
    const newState = reducer(state, action);
    localStorage.setItem("store", JSON.stringify(newState));
    return newState;
  };
};

export const Context = ({ children }) => {
  const cache = localStorage.getItem("store");
  const initialState = cache ? JSON.parse(cache) : {};

  return (
    <StateContext.Provider value={useReducer(persist(reducer), initialState)}>
      {children}
    </StateContext.Provider>
  );
};

export const useStore = () => useContext(StateContext);
