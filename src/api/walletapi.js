import api from "./axios";

export const listWallets = () => api.get("/wallet/");

export const createWallet = (data) => api.post("/wallet/", data);

export const updateWallet = (id, data) => api.patch(`/wallet/${id}/`, data);

export const listTransactions = () => api.get("/transaction/");
