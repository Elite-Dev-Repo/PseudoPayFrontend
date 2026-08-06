import api from "./axios";

export const register = (data) => api.post("/register/", data);

export const login = (data) => api.post("/auth/token/", data);

export const refresh = (token) => api.post("/auth/token/refresh/", { refresh: token });

export const verifyEmail = (token) => api.post("/verify-email/", { token });

export const resendCode = (email) => api.post("/resend-code/", { email });

export const getProfile = () => api.get("/profile/");

export const updateMerchantProfile = (data) =>
  api.put("/update-merchant-profile/", data);
