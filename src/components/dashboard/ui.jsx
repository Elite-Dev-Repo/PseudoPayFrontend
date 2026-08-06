import { Loader2 } from "lucide-react";

export const PageHeader = ({ title, description, action }) => (
  <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{title}</h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
    {action}
  </div>
);

export const Button = ({
  children,
  variant = "primary",
  loading,
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/80 disabled:opacity-50",
    outline:
      "bg-white border border-border text-foreground hover:bg-muted disabled:opacity-50",
    ghost: "hover:bg-muted text-foreground disabled:opacity-50",
    destructive:
      "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 disabled:opacity-50",
  };
  return (
    <button
      disabled={loading || props.disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
};

export const Card = ({ className = "", children }) => (
  <div
    className={`bg-white rounded-2xl border border-border p-6 ${className}`}
  >
    {children}
  </div>
);

export const Badge = ({ children, tone = "neutral" }) => {
  const tones = {
    neutral: "bg-slate-100 text-slate-700",
    success: "bg-green-50 text-green-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-red-50 text-red-600",
    primary: "bg-primary/10 text-primary",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
};

export const Spinner = () => (
  <div className="flex items-center justify-center py-20">
    <Loader2 size={28} className="animate-spin text-primary" />
  </div>
);

export const EmptyState = ({ title, description }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center gap-2">
    <p className="font-medium text-foreground">{title}</p>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export const ErrorBanner = ({ message }) =>
  message ? (
    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
      {message}
    </p>
  ) : null;

export const SuccessBanner = ({ message }) =>
  message ? (
    <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
      {message}
    </p>
  ) : null;

export const Field = ({ label, children, hint }) => (
  <label className="flex flex-col gap-1.5">
    <span className="text-sm font-medium">{label}</span>
    {children}
    {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
  </label>
);

export const inputClasses =
  "w-full py-2.5 px-3.5 bg-muted/60 border border-transparent rounded-xl text-sm outline-none placeholder:text-muted-foreground/60 focus:bg-background focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all";

export const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-background rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
