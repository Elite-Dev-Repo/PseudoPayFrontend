import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  SwatchBook,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { login, register, resendCode, verifyEmail } from "./api/authapi";
import { ACCESS, REFRESH } from "./api/constants";

import authbg from "./assets/auth_bg.png";

const GENDER_CHOICES = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [verifyingEmail, setVerifyingEmail] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [registerData, setRegisterData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    email: "",
    password: "",
  });

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setShowPassword(false);
    setError("");
    setNotice("");
  };

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);
    try {
      const res = await login({
        email: loginData.email,
        password: loginData.password,
      });
      localStorage.setItem(ACCESS, res.data.access);
      localStorage.setItem(REFRESH, res.data.refresh);
      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.detail || "Unable to sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);
    try {
      const res = await register(registerData);
      setRegisterData({
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        email: "",
        password: "",
      });
      setVerifyingEmail(res.data.email);
      setNotice("We sent a verification code to your email.");
    } catch (err) {
      const data = err?.response?.data;
      const firstError = data
        ? Object.values(data)
            .flat()
            .join(", ")
        : "";
      setError(
        firstError || "Unable to create your account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);
    try {
      await verifyEmail(verificationCode);
      setNotice("Email verified successfully. You can now sign in.");
      setVerifyingEmail(null);
      setVerificationCode("");
      setMode("login");
    } catch (err) {
      const data = err?.response?.data;
      setError(data?.message || "Invalid verification code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    setNotice("");
    try {
      await resendCode(verifyingEmail);
      setNotice("A new verification code was sent.");
    } catch (err) {
      const data = err?.response?.data;
      setError(data?.message || "Unable to resend the code.");
    }
  };

  const inputClasses =
    "w-full py-3 px-3.5 bg-muted/60 border border-transparent rounded-xl text-sm outline-none placeholder:text-muted-foreground/60 focus:bg-background focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all";

  return (
    <section className="min-h-screen w-screen flex items-center justify-center relative">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full min-h-screen grid lg:grid-cols-2 bg-background">
          <div className="relative hidden lg:block bg-primary overflow-hidden">
            <img
              src={authbg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-primary/20" />

            <div className="relative h-full flex flex-col justify-between p-10 text-white">
              <div className="flex items-center gap-2">
                <span className="bg-white p-2 rounded-sm flex items-center justify-center">
                  <SwatchBook strokeWidth={2} className="text-primary" />
                </span>
                <p className="text-lg font-semibold tracking-wide">PseudoPay</p>
              </div>

              <div className="flex flex-col gap-6">
                <span className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                  <Sparkles size={22} />
                </span>
                <h2 className="text-4xl font-bold leading-tight">
                  The easiest way to <br /> get paid online.
                </h2>
                <p className="text-white/70">
                  Join thousands of internet businesses accepting payments
                  worldwide with PseudoPay.
                </p>

                <div className="flex flex-col gap-3 pt-2">
                  {[
                    "Instant global payouts",
                    "Bank-grade security & fraud protection",
                    "No hidden fees, cancel anytime",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-white/80"
                    >
                      <CheckCircle2 size={18} className="shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur rounded-2xl p-4">
                <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <ShieldCheck size={20} />
                </span>
                <div>
                  <p className="text-xs text-white/60">
                    Trusted by 250,000+ businesses worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-8 sm:p-12 relative overflow-hidden">
            <div className="w-64 h-64 bg-primary/5 rounded-full absolute -top-24 -right-24 blur-3xl" />

            <div className="w-full max-w-lg flex flex-col gap-6 relative">
              <div className="lg:hidden flex flex-col items-center gap-2">
                <span className="bg-primary p-2 rounded-sm flex items-center justify-center">
                  <SwatchBook strokeWidth={2} className="text-white" />
                </span>
                <p className="text-xl font-semibold tracking-wide text-primary">
                  PseudoPay
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="text-3xl font-bold">
                  {mode === "login" ? "Welcome back" : "Create your account"}
                </h3>
                <p className="text-muted-foreground">
                  {mode === "login"
                    ? "Enter your details to sign in to your account"
                    : "Sign up and start accepting payments in minutes"}
                </p>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}
              {notice && (
                <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  {notice}
                </p>
              )}

              {verifyingEmail ? (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-3xl font-bold">Verify your email</h3>
                    <p className="text-muted-foreground">
                      We sent an 8-character code to{" "}
                      <span className="text-foreground font-medium">
                        {verifyingEmail}
                      </span>
                      . Enter it below to activate your account.
                    </p>
                  </div>

                  <form
                    className="flex flex-col gap-4"
                    onSubmit={handleVerifyEmail}
                  >
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-medium">
                        Verification Code
                      </span>
                      <div className="relative">
                        <ShieldCheck
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <input
                          type="text"
                          name="code"
                          placeholder="e.g. 4F9A2C7E"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          maxLength={8}
                          className={`${inputClasses} pl-10`}
                        />
                      </div>
                    </label>

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-2 w-full py-3 bg-primary text-primary-foreground rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-primary/80 transition-colors disabled:opacity-50"
                    >
                      {loading ? "Verifying..." : "Verify Email"}{" "}
                      <ArrowUpRight strokeWidth={1.5} size={19} />
                    </button>
                  </form>

                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-sm text-primary font-medium hover:underline self-center"
                  >
                    Resend code
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    className="w-full py-2.5 bg-white border border-border rounded-xl flex items-center justify-center gap-2 text-sm font-medium hover:bg-muted transition-colors"
                  >
                    <GoogleIcon />
                Continue with Google
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  or continue with email
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <form
                className="flex flex-col gap-4"
                onSubmit={
                  mode === "login" ? handleLoginSubmit : handleRegisterSubmit
                }
              >
                {mode === "signup" && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium">First Name</span>
                        <input
                          type="text"
                          name="first_name"
                          placeholder="Jane"
                          value={registerData.first_name}
                          onChange={handleRegisterChange}
                          className={inputClasses}
                        />
                      </label>
                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium">Last Name</span>
                        <input
                          type="text"
                          name="last_name"
                          placeholder="Doe"
                          value={registerData.last_name}
                          onChange={handleRegisterChange}
                          className={inputClasses}
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium">
                          Date of Birth
                        </span>
                        <div className="relative">
                          <CalendarDays
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                          />
                          <input
                            type="date"
                            name="date_of_birth"
                            value={registerData.date_of_birth}
                            onChange={handleRegisterChange}
                            className={`${inputClasses} pl-10`}
                          />
                        </div>
                      </label>

                      <label className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium">Gender</span>
                        <div className="relative">
                          <ChevronDown
                            size={16}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                          />
                          <select
                            name="gender"
                            value={registerData.gender}
                            onChange={handleRegisterChange}
                            className={`${inputClasses} appearance-none pr-10`}
                          >
                            <option value="" disabled>
                              Select gender
                            </option>
                            {GENDER_CHOICES.map((choice) => (
                              <option key={choice.value} value={choice.value}>
                                {choice.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </label>
                    </div>
                  </>
                )}

                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium">
                    {mode === "signup" ? "Email" : "Email"}
                  </span>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@email.com"
                      value={
                        mode === "login" ? loginData.email : registerData.email
                      }
                      onChange={
                        mode === "login"
                          ? handleLoginChange
                          : handleRegisterChange
                      }
                      className={`${inputClasses} pl-10`}
                    />
                  </div>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium">Password</span>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      value={
                        mode === "login"
                          ? loginData.password
                          : registerData.password
                      }
                      onChange={
                        mode === "login"
                          ? handleLoginChange
                          : handleRegisterChange
                      }
                      className={`${inputClasses} pl-10 pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </label>

                {mode === "login" && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="remember"
                        checked={loginData.remember}
                        onChange={handleLoginChange}
                        className="accent-primary rounded"
                      />
                      <span className="text-muted-foreground">Remember me</span>
                    </label>
                    <button type="button" className="text-primary font-medium">
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full py-3 bg-primary text-primary-foreground rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-primary/80 transition-colors disabled:opacity-50"
                >
                  {loading
                    ? mode === "login"
                      ? "Signing in..."
                      : "Creating account..."
                    : mode === "login"
                      ? "Sign In"
                      : "Create Account"}{" "}
                  <ArrowUpRight strokeWidth={1.5} size={19} />
                </button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                {mode === "login"
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={toggleMode}
                  className="text-primary font-medium hover:underline"
                >
                  {mode === "login" ? "Sign up" : "Log in"}
                </button>
              </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
