import api from "./axios";

export const register = (data) => api.post("/register/", data);

export const login = (data) => api.post("/auth/token/", data);

export const refresh = (token) => api.post("/auth/token/refresh/", { refresh: token });

export const googleLogin = (accessToken) =>
  api.post("/auth/google/", { access_token: accessToken });

export const verifyEmail = (token) => api.post("/verify-email/", { token });

export const resendCode = (email) => api.post("/resend-code/", { email });

export const getProfile = () => api.get("/profile/");

export const updateMerchantProfile = (data) =>
  api.put("/update-merchant-profile/", data);

export const updateUserProfile = (data) =>
  api.patch("/update-profile/", data);

// Password reset
export const requestPasswordReset = (email) =>
  api.post("/reset-password/", { email });

export const verifyResetToken = (uidb64, token) =>
  api.get(`/reset-password/verify/${uidb64}/${token}/`);

export const confirmPasswordReset = (data) =>
  api.post("/reset-password/confirm/", data);

