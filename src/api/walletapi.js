import api from "./axios";

export const listWallets = () => api.get("/wallet/");

export const createWallet = (data) => api.post("/wallet/", data);

export const listTransactions = () => api.get("/transaction/");

export const createTransaction = (data) => api.post("/transaction/", data);
