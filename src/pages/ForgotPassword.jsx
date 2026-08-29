import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, ArrowUpRight, SwatchBook, CheckCircle2 } from "lucide-react";
import { requestPasswordReset } from "../api/authapi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await requestPasswordReset(email);
      setSuccess(res.data?.success || "If an account exists for that email, a reset link has been sent. Please check your inbox (and spam folder).");
    } catch (err) {
      const data = err?.response?.data;
      const msg =
        data?.error ||
        data?.detail ||
        (data?.email ? data.email.join(", ") : "") ||
        "Unable to send reset link. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col gap-6">
        <Link to="/auth" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft size={16} /> Back to sign in
        </Link>

        <div className="flex items-center gap-2">
          <span className="bg-primary p-1.5 rounded-sm flex items-center justify-center">
            <SwatchBook strokeWidth={2} className="text-white" size={18} />
          </span>
          <span className="font-semibold tracking-wide text-primary">PseudoPay</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-bold">Forgot password?</h1>
          <p className="text-sm text-muted-foreground">
            No worries - enter your email and we&apos;ll send you a reset link.
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 break-words">
            {error}
          </p>
        )}
        {success && (
          <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex gap-2 break-words">
            <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
            <span className="break-all">{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Email address</span>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 px-3.5 pl-10 bg-muted/60 border border-transparent rounded-xl text-sm outline-none placeholder:text-muted-foreground/60 focus:bg-background focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send reset link"} <ArrowUpRight strokeWidth={1.5} size={18} />
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link to="/auth" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;

