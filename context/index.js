import React from "react";

export const CurrencyContext = React.createContext({
  currency: "USD",
  setCurrency: () => {},
});

export const TransactionContext = React.createContext({
  transaction: null,
  setTransaction: () => {},
});

export const UserContext = React.createContext({
  user: null,
  authModalIsOpen: false,
  successfullyBooked: false,
  setUser: () => {},
  authenticating: false,
  setIsAuthenticating: () => {},
  setAuthModalIsOpen: () => {},
  setSuccessfullyBooked: () => {},
});
