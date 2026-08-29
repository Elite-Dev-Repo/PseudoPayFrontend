import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowUpRight, SwatchBook, CheckCircle2, XCircle } from "lucide-react";
import { verifyResetToken, confirmPasswordReset } from "../api/authapi";

const ResetPassword = () => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [valid, setValid] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [emailHint, setEmailHint] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!uidb64 || !token) {
        setVerifyError("Invalid reset link.");
        setVerifying(false);
        return;
      }
      try {
        const res = await verifyResetToken(uidb64, token);
        setValid(true);
        setEmailHint(res.data?.email || "");
      } catch (err) {
        const msg = err?.response?.data?.error || err?.response?.data?.detail || "This reset link is invalid or has expired. Please request a new one.";
        setVerifyError(msg);
        setValid(false);
      } finally {
        setVerifying(false);
      }
    };
    verify();
  }, [uidb64, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await confirmPasswordReset({
        uidb64,
        token,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      setSuccess(res.data?.success || "Password reset successful. Redirecting to sign in...");
      setTimeout(() => navigate("/auth"), 1800);
    } catch (err) {
      const data = err?.response?.data;
      const msg =
        data?.error ||
        data?.detail ||
        data?.new_password?.join(", ") ||
        data?.confirm_password?.join(", ") ||
        (typeof data === "object" ? Object.values(data).flat().join(", ") : "") ||
        "Failed to reset password. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <section className="min-h-screen w-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
          <p className="text-muted-foreground animate-pulse">Verifying reset link...</p>
        </div>
      </section>
    );
  }

  if (!valid) {
    return (
      <section className="min-h-screen w-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col gap-6 text-center">
          <div className="flex justify-center">
            <span className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
              <XCircle size={28} />
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold">Link invalid or expired</h1>
            <p className="text-sm text-muted-foreground break-words">{verifyError}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/forgot-password" className="w-full py-3 bg-primary text-primary-foreground rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-primary/90">
              Request new link
            </Link>
            <Link to="/auth" className="text-sm text-primary font-medium hover:underline">
              Back to sign in
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <span className="bg-primary p-1.5 rounded-sm flex items-center justify-center">
            <SwatchBook strokeWidth={2} className="text-white" size={18} />
          </span>
          <span className="font-semibold tracking-wide text-primary">PseudoPay</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-bold">Set new password</h1>
          <p className="text-sm text-muted-foreground">
            {emailHint ? `Reset password for ${emailHint}` : "Enter your new password below."}
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 break-words">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0" /> {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">New password</span>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full py-3 px-3.5 pl-10 pr-10 bg-muted/60 border border-transparent rounded-xl text-sm outline-none placeholder:text-muted-foreground/60 focus:bg-background focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all"
              />
              <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Confirm new password</span>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-3 px-3.5 pl-10 pr-10 bg-muted/60 border border-transparent rounded-xl text-sm outline-none placeholder:text-muted-foreground/60 focus:bg-background focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset password"} <ArrowUpRight strokeWidth={1.5} size={18} />
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          <Link to="/auth" className="text-primary font-medium hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;

