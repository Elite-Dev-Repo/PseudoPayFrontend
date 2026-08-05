import { useState } from "react";
import {
  ArrowUpRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  SwatchBook,
  User,
} from "lucide-react";

import authbg from "./assets/auth_bg.png";

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
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const toggleMode = () =>
    setMode((prev) => (prev === "login" ? "signup" : "login"));

  return (
    <section className="min-h-screen w-screen flex items-center justify-center p-5 relative">
      {/* <div className="w-screen min-h-screen bg-primary absolute brightness-50 top-0 left-0 right-0 bottom-0">
        <img src={authbg} alt="" className="w-full h-full" />
      </div> */}

      <div className="cont w-full flex items-center justify-center">
        <div className="w-full max-w-md bg-slate-100 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden shadow-sm">
          <div className="w-52 h-52 bg-primary/5 rounded-full absolute -top-16 -right-16 blur-2xl" />

          <div className="flex flex-col items-center gap-2 relative">
            <span className="bg-primary p-2 rounded-sm flex items-center justify-center">
              <SwatchBook strokeWidth={2} className="text-white" />
            </span>
            <p className="text-xl font-semibold tracking-wide text-primary">
              PseudoPay
            </p>
            <h3 className="text-3xl font-bold pt-2">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h3>
            <p className="text-muted-foreground">
              {mode === "login"
                ? "Enter your details to sign in to your account"
                : "Sign up and start accepting payments in minutes"}
            </p>
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-lg relative">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === "login"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === "signup"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form className="flex flex-col gap-4 relative">
            {mode === "signup" && (
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Full Name</span>
                <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3">
                  <User size={16} className="text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="flex-1 py-2.5 bg-transparent outline-none text-sm"
                  />
                </div>
              </label>
            )}

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">
                {mode === "signup" ? "Work Email" : "Email"}
              </span>
              <div className="flex items-center gap-2 bg-secondary border border-border rounded-lg px-3">
                <Mail size={16} className="text-muted-foreground" />
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="flex-1 py-2.5 bg-transparent outline-none text-sm"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Password</span>
              <div className="flex items-center gap-2 bg-secondary border border-border rounded-lg px-3">
                <Lock size={16} className="text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="flex-1 py-2.5 bg-transparent outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-muted-foreground hover:text-primary"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            {mode === "login" && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-primary" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <button type="button" className="text-primary font-medium">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="mt-2 w-full py-2.5 bg-primary text-primary-foreground rounded-full flex items-center justify-center gap-2"
            >
              {mode === "login" ? "Sign In" : "Create Account"}{" "}
              <ArrowUpRight strokeWidth={1.5} size={19} />
            </button>
          </form>

          <div className="flex items-center gap-3 relative">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button
            type="button"
            className="w-full py-2.5 bg-white border border-border rounded-full flex items-center justify-center gap-2 text-sm font-medium hover:bg-muted"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="text-center text-sm text-muted-foreground relative">
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
        </div>
      </div>
    </section>
  );
};

export default Auth;
