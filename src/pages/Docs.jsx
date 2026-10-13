import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Copy,
  CreditCard,
  KeyRound,
  Lock,
  Send,
  ShieldCheck,
  SwatchBook,
  Wallet,
} from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon } from "@hugeicons/core-free-icons";

import { ACCESS } from "../api/constants";

const BASE_URL = "https://pseudopaybackend.onrender.com/api";

const CodeBlock = ({ title = "bash", code }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="rounded-xl border border-border bg-[#0d0d14] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
        <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">
          {title}
        </span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed text-slate-100 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const METHOD_COLORS = {
  GET: "bg-green-50 text-green-700 border-green-200",
  POST: "bg-blue-50 text-blue-700 border-blue-200",
  PUT: "bg-amber-50 text-amber-700 border-amber-200",
  PATCH: "bg-amber-50 text-amber-700 border-amber-200",
  DELETE: "bg-red-50 text-red-600 border-red-200",
};

const Endpoint = ({
  method,
  path,
  auth = "No",
  title,
  description,
  requestBody,
  request,
  response,
  note,
}) => (
  <div className="flex flex-col gap-3 py-6 border-b border-border last:border-b-0">
    <div className="flex flex-wrap items-center gap-3">
      <span
        className={`text-xs font-bold px-2.5 py-1 rounded-md border ${METHOD_COLORS[method]}`}
      >
        {method}
      </span>
      <code className="text-sm font-mono font-medium">{path}</code>
      <span className="text-xs text-muted-foreground flex items-center gap-1">
        <Lock size={11} /> {auth}
      </span>
    </div>
    <div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    {requestBody && (
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Request body
        </p>
        <CodeBlock title="json" code={requestBody} />
      </div>
    )}
    {request && (
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Example request
        </p>
        <CodeBlock title="bash" code={request} />
      </div>
    )}
    {response && (
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Response
        </p>
        <CodeBlock title="json" code={response} />
      </div>
    )}
    {note && (
      <p className="text-xs text-muted-foreground flex items-start gap-1.5">
        <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
        {note}
      </p>
    )}
  </div>
);

const NAV = [
  { id: "overview", label: "Overview" },
  { id: "getting-started", label: "Getting started" },
  { id: "flow", label: "How payments work" },
  { id: "auth", label: "Authentication" },
  { id: "reference", label: "API reference" },
  { id: "webhooks", label: "Webhooks" },
  { id: "rate-limits", label: "Rate limits" },
  { id: "errors", label: "Errors" },
  { id: "examples", label: "Server examples" },
];

const Docs = () => {
  const token = localStorage.getItem(ACCESS);

  return (
    <section className="w-screen min-h-screen">
      <nav className="w-full h-14 border-b border-border bg-white/70 backdrop-blur sticky top-0 z-40">
        <div className="cont flex items-center justify-between h-full">
          <Link to="/">
            <div className="flex items-center gap-2">
              <p className="text-[16px] font-semibold flex items-center gap-2 tracking-wide text-primary">
                <span className="bg-primary p-2 rounded-sm flex items-center justify-center">
                  <SwatchBook strokeWidth={2} className="text-white" />
                </span>
                PseudoPay
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-4">
              <Link to="/">
                <p className="text-sm font-medium tracking-wider">Home</p>
              </Link>
              <Link to="/docs">
                <p className="text-sm font-medium tracking-wider text-primary">
                  Docs
                </p>
              </Link>
              <HugeiconsIcon
                icon={GithubIcon}
                size={20}
                className="cursor-pointer"
              />
            </div>
            {token ? (
              <Link to="/dashboard">
                <button className="px-5 font-semibold py-1.5 bg-primary text-primary-foreground rounded-full flex items-center gap-2">
                  Dashboard
                </button>
              </Link>
            ) : (
              <Link to="/auth">
                <button className="px-5 font-semibold py-1.5 bg-primary text-primary-foreground rounded-full flex items-center gap-2">
                  Join us <ArrowUpRight strokeWidth={1.5} size={19} />
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="cont grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 py-12">
        <aside className="hidden lg:block">
          <div className="sticky top-20 flex flex-col gap-1">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-3">
              Contents
            </p>
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-6 rounded-xl bg-primary text-white p-4">
              <p className="text-sm font-semibold mb-1">Ready to integrate?</p>
              <p className="text-xs text-white/70 mb-3">
                Create a wallet and grab your API key from the dashboard.
              </p>
              <Link to="/dashboard">
                <button className="w-full flex items-center justify-center gap-2 bg-white text-primary rounded-lg px-3 py-2 text-sm font-semibold">
                  Open dashboard <ChevronRight size={15} />
                </button>
              </Link>
            </div>
          </div>
        </aside>

        <main className="flex flex-col gap-14 max-w-3xl">
          {/* Overview */}
          <section id="overview" className="flex flex-col gap-4 scroll-mt-24">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck size={18} />
              <span className="text-sm font-semibold uppercase tracking-widest">
                Documentation
              </span>
            </div>
            <h1 className="text-4xl font-bold leading-tight">
              Build with the PseudoPay API
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              PseudoPay is a mock payment gateway for testing integrations. It
              lets you issue merchant wallets, initialize transactions, send
              customers to a hosted checkout page, and get notified via
              webhooks — all with a simple REST API. No real money moves.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: <Wallet size={18} />,
                  title: "Wallets",
                  text: "Create up to 3 currency wallets for your business.",
                },
                {
                  icon: <CreditCard size={18} />,
                  title: "Hosted checkout",
                  text: "Redirect customers to PseudoPay's payment page.",
                },
                {
                  icon: <Send size={18} />,
                  title: "Webhooks",
                  text: "Get payment confirmations on your own URL.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border border-border bg-white p-4"
                >
                  <span className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                    {f.icon}
                  </span>
                  <p className="text-sm font-semibold mb-1">{f.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {f.text}
                  </p>
                </div>
              ))}
            </div>
            <CodeBlock title="base url" code={BASE_URL} />
          </section>

          {/* Getting started */}
          <section
            id="getting-started"
            className="flex flex-col gap-4 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold">Getting started</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Four steps to your first test payment. Everything lives in the{" "}
              <Link to="/dashboard" className="text-primary font-medium">
                dashboard
              </Link>
              .
            </p>
            <ol className="flex flex-col gap-4">
              {[
                {
                  title: "Create an account",
                  text: "Sign up and verify your email with the token we send you. Accounts stay inactive until verified.",
                },
                {
                  title: "Create a wallet",
                  text: "Pick a currency and set request_origin — the webhook URL PseudoPay calls when payments complete.",
                },
                {
                  title: "Generate an API key",
                  text: "Create a secret key and send it as X-Api-Key when initializing transactions. It is shown only once.",
                },
                {
                  title: "Initialize a transaction",
                  text: "Charge a customer from your server. PseudoPay returns a checkout_url — redirect the customer there.",
                },
              ].map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">{step.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Flow */}
          <section id="flow" className="flex flex-col gap-4 scroll-mt-24">
            <h2 className="text-2xl font-bold">How payments work</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A payment moves through{" "}
              <code className="text-xs">INITIATED</code> →{" "}
              <code className="text-xs">SUCCESSFUL</code> (or{" "}
              <code className="text-xs">FAILED</code>). Your integration only
              touches the first and last steps.
            </p>
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: <KeyRound size={16} />,
                  step: "1. Initialize (your server)",
                  text: "POST /transaction/initialize/ with your secret API key and an Idempotency-Key. You get back a checkout_url.",
                },
                {
                  icon: <CreditCard size={16} />,
                  step: "2. Redirect (your frontend)",
                  text: "Send the customer to checkout_url. They pay with the test card 4084 0840 8408 4081 — any future expiry, any CVV.",
                },
                {
                  icon: <Send size={16} />,
                  step: "3. Fulfil (your webhook)",
                  text: "PseudoPay POSTs to your wallet's request_origin. Mark the order paid and respond 200 quickly.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="flex items-start gap-3 rounded-xl border border-border bg-white p-4"
                >
                  <span className="shrink-0 w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                    {s.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-sm mb-0.5">{s.step}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {s.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <CodeBlock
              title="javascript — checkout redirect"
              code={`// After initializing on your server, redirect the customer
window.location.href = checkout_url; // from POST /transaction/initialize/`}
            />
          </section>

          {/* Auth */}
          <section id="auth" className="flex flex-col gap-4 scroll-mt-24">
            <h2 className="text-2xl font-bold">Authentication</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Two schemes, two audiences. Dashboard operations (wallets, keys,
              profile) use JWT:{" "}
              <code className="text-xs">Authorization: Bearer &lt;token&gt;</code>
              . Charging customers uses your secret API key:{" "}
              <code className="text-xs">X-Api-Key: sk_pseudo_…</code>. Access
              tokens last 5 days; refresh tokens last 30 days.
            </p>
            <Endpoint
              method="POST"
              path="/auth/token/"
              auth="No"
              title="Log in"
              description="Exchange your email and password for a JWT pair."
              requestBody={`{
  "email": "merchant@example.com",
  "password": "S3curePass123!"
}`}
              response={`{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`}
            />
            <Endpoint
              method="POST"
              path="/auth/token/refresh/"
              auth="No"
              title="Refresh access token"
              description="Get a new access token using a valid refresh token."
              requestBody={`{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`}
              response={`{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`}
            />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Also available: Google login via{" "}
              <code className="text-xs">POST /auth/google/</code>, and password
              reset via{" "}
              <code className="text-xs">POST /reset-password/</code> →{" "}
              <code className="text-xs">
                GET /reset-password/verify/&lt;uidb64&gt;/&lt;token&gt;/
              </code>{" "}
              → <code className="text-xs">POST /reset-password/confirm/</code>.
            </p>
          </section>

          {/* Reference */}
          <section id="reference" className="flex flex-col gap-4 scroll-mt-24">
            <h2 className="text-2xl font-bold">API reference</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Paths below are relative to the base URL above.
            </p>

            <h3 className="text-lg font-semibold mt-4">Accounts</h3>
            <Endpoint
              method="POST"
              path="/register/"
              auth="No"
              title="Create an account"
              description="Register a new merchant. Accounts start inactive until the email token is verified."
              requestBody={`{
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "merchant@example.com",
  "password": "S3curePass123!",
  "date_of_birth": "1995-06-15",
  "gender": "Female"
}`}
              response={`{
  "id": 1,
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "merchant@example.com",
  "profile": null
}`}
              note="password is write-only and never returned."
            />
            <Endpoint
              method="POST"
              path="/verify-email/"
              auth="No"
              title="Verify your email"
              description="Confirm your account with the token sent to your inbox."
              requestBody={`{
  "token": "A1B2C3D4"
}`}
              response={`{
  "message": "Email verified successfully"
}`}
              note="Tokens expire after 15 minutes. Lost it? POST /resend-code/ with {email} for a new one."
            />

            <h3 className="text-lg font-semibold mt-8">Wallets</h3>
            <Endpoint
              method="POST"
              path="/wallet/"
              auth="Bearer token"
              title="Create a wallet"
              description="Create a currency wallet (NGN, USD or EUR). New wallets start with a 500,000.00 mock balance."
              requestBody={`{
  "currency": "NGN",
  "status": "ACTIVE",
  "request_origin": "https://mysite.com/pseudopay/webhook"
}`}
              response={`{
  "id": 1,
  "profile": 1,
  "balance": "500000.00",
  "currency": "NGN",
  "status": "ACTIVE",
  "request_origin": "https://mysite.com/pseudopay/webhook"
}`}
              note="Max 3 wallets per merchant. balance and profile are managed by PseudoPay."
            />
            <Endpoint
              method="GET"
              path="/wallet/"
              auth="Bearer token"
              title="List wallets"
              description="List all wallets on your merchant profile."
            />
            <Endpoint
              method="PUT"
              path="/wallet/<id>/"
              auth="Bearer token"
              title="Point a wallet at your webhook"
              description="Set the request_origin URL PseudoPay calls when payments complete. PUT and PATCH both work."
              requestBody={`{
  "request_origin": "https://mysite.com/pseudopay/webhook"
}`}
            />

            <h3 className="text-lg font-semibold mt-8">API keys</h3>
            <Endpoint
              method="POST"
              path="/api-keys/create/"
              auth="Bearer token"
              title="Create an API key"
              description="Generate a secret key for server-side calls. The full key is returned once — save it immediately."
              requestBody={`{
  "name": "Production server"
}`}
              response={`{
  "id": 1,
  "name": "Production server",
  "prefix": "sk_pseudo_",
  "is_active": true,
  "raw_key": "sk_pseudo_9fT2...xKp7"
}`}
              note="PseudoPay stores only a SHA-256 hash. List keys with GET /api-keys/; revoke with DELETE /api-keys/<id>/."
            />

            <h3 className="text-lg font-semibold mt-8">Transactions</h3>
            <Endpoint
              method="GET"
              path="/transaction/"
              auth="Bearer token"
              title="List transactions"
              description="List transactions on your merchant profile."
            />
            <Endpoint
              method="POST"
              path="/transaction/initialize/"
              auth="X-Api-Key"
              title="Initialize a transaction"
              description="Create a transaction and get a checkout_url to redirect your customer to. Uses your secret API key — never call this from the browser."
              requestBody={`{
  "wallet": 1,
  "amount": 5000,
  "transaction_type": "DEBIT",
  "customer_email": "customer@example.com",
  "customer_name": "Alice",
  "transaction_metadata": { "order_id": "ORD-123" }
}`}
              request={`curl -X POST ${BASE_URL}/transaction/initialize/ \\
  -H "X-Api-Key: sk_pseudo_9fT2...xKp7" \\
  -H "Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000" \\
  -H "Content-Type: application/json" \\
  -d '{
    "wallet": 1,
    "amount": 5000,
    "transaction_type": "DEBIT",
    "customer_email": "customer@example.com",
    "customer_name": "Alice",
    "transaction_metadata": { "order_id": "ORD-123" }
  }'`}
              response={`{
  "id": 1,
  "wallet": 1,
  "amount": "5000.00",
  "transaction_type": "DEBIT",
  "transaction_status": "INITIATED",
  "transaction_reference": "TRX-1a2b3c4d1700000000000",
  "customer_email": "customer@example.com",
  "customer_name": "Alice",
  "transaction_metadata": { "order_id": "ORD-123" },
  "checkout_url": "${BASE_URL}/checkout/TRX-1a2b3c4d1700000000000/"
}`}
              note="amount must be >= 500, transaction_type is DEBIT or CREDIT, and the wallet must be ACTIVE. Fallback header Authorization: Api-Key <key> also works."
            />

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex flex-col gap-2">
              <p className="text-sm font-semibold">
                Idempotency-Key is required
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every initialize call must send{" "}
                <code className="text-xs">Idempotency-Key: &lt;uuid4&gt;</code>.
                Retrying with the same key and the same body replays the
                original response without creating a second transaction.
                Reusing a key with a different body returns{" "}
                <code className="text-xs">409 Conflict</code>. Generate one key
                per checkout and keep it across retries.
              </p>
            </div>

            <h3 className="text-lg font-semibold mt-8">Hosted pages</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <code className="text-xs">
                GET /checkout/&lt;reference&gt;/
              </code>{" "}
              is the payment page customers complete;{" "}
              <code className="text-xs">
                GET /payment/success/&lt;reference&gt;/
              </code>{" "}
              is the confirmation page. Both are public HTML — just redirect,
              there is nothing to integrate.
            </p>
          </section>

          {/* Webhooks */}
          <section id="webhooks" className="flex flex-col gap-4 scroll-mt-24">
            <h2 className="text-2xl font-bold">Webhooks</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When a transaction completes, PseudoPay{" "}
              <code className="text-xs">POST</code>s to the{" "}
              <code className="text-xs">request_origin</code> URL on your
              wallet. Webhooks are unsigned and carry no order reference of
              their own — that is why{" "}
              <code className="text-xs">transaction_metadata.order_id</code> in
              your initialize call matters: it is the only way to link the
              callback to your order.
            </p>
            <CodeBlock
              title="json — webhook payload"
              code={`{
  "transaction_id": 1,
  "amount": "5000.00",
  "status": "SUCCESSFUL",
  "created_at": "2026-08-10T12:00:00+00:00"
}`}
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fulfil idempotently: if the order is already paid, just return
              200. Always verify the amount matches before fulfilling, and
              respond with 2xx quickly (retry logic is not guaranteed).
            </p>
            <CodeBlock
              title="javascript — express"
              code={`app.post("/pseudopay/webhook", express.json(), async (req, res) => {
  const { amount, status } = req.body;
  // Link via the order_id YOU sent in transaction_metadata at init time.
  const orderId = req.body.transaction_metadata?.order_id;
  const order = orderId ? await db.orders.findById(orderId) : null;

  if (!order) return res.sendStatus(404);
  if (order.status === "paid") return res.sendStatus(200); // replay-safe
  if (status === "SUCCESSFUL" && Number(amount) === Number(order.amount)) {
    await db.orders.markPaid(order.id);
  }
  res.sendStatus(200);
});`}
            />
          </section>

          {/* Rate limits */}
          <section id="rate-limits" className="flex flex-col gap-4 scroll-mt-24">
            <h2 className="text-2xl font-bold">Rate limits</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Exceeding a limit returns{" "}
              <code className="text-xs">429 Too Many Requests</code> with a{" "}
              <code className="text-xs">Retry-After</code> header. These are
              the scopes integrators hit most:
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm min-w-[420px]">
                <thead>
                  <tr className="bg-muted/50 text-left">
                    <th className="px-4 py-3 font-semibold">Scope</th>
                    <th className="px-4 py-3 font-semibold">Limit</th>
                    <th className="px-4 py-3 font-semibold">Applies to</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["payments", "30 / minute", "Initializing transactions"],
                    ["transactions", "60 / minute", "Listing transactions"],
                    ["wallet", "100 / minute", "Wallet reads and updates"],
                    ["api_keys", "30 / minute", "Managing API keys"],
                    ["anon", "50 / minute", "Unauthenticated requests"],
                  ].map(([scope, limit, applies]) => (
                    <tr key={scope}>
                      <td className="px-4 py-3 font-mono text-xs">{scope}</td>
                      <td className="px-4 py-3">{limit}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {applies}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Account scopes are tighter: registration 5/hour, verification
              emails 3/hour, password reset 20/hour.
            </p>
          </section>

          {/* Errors */}
          <section id="errors" className="flex flex-col gap-4 scroll-mt-24">
            <h2 className="text-2xl font-bold">Errors</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Validation failures return field-level maps; framework errors
              return a <code className="text-xs">detail</code> key. The errors
              you will actually hit while integrating:
            </p>
            <CodeBlock
              title="json — initialize errors"
              code={`// Missing / malformed Idempotency-Key ............ 400
{ "details": "a valid idempotency key is required" }

// amount < 500 ................................... 400
{ "amount": ["Amount cannot be less than 500"] }

// Wallet not ACTIVE .............................. 400
{ "error": "Wallet is not active" }

// Same key, different body ........................ 409
{ "error": "Duplicate key error for another transaction" }`}
            />
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm min-w-[440px]">
                <thead>
                  <tr className="bg-muted/50 text-left">
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["400 Bad Request", "Invalid body, headers, or wallet state."],
                    ["401 Unauthorized", "Missing or invalid token / API key."],
                    ["403 Forbidden", "Authenticated but not allowed."],
                    ["404 Not Found", "Bad id or reference."],
                    ["409 Conflict", "Idempotency-Key reused with a new body."],
                    ["429 Too Many Requests", "Slow down and retry."],
                  ].map(([code, meaning]) => (
                    <tr key={code}>
                      <td className="px-4 py-3 font-mono text-xs">{code}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {meaning}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Server examples */}
          <section id="examples" className="flex flex-col gap-4 scroll-mt-24">
            <h2 className="text-2xl font-bold">Server examples</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Initialize from your server — never expose your secret key in the
              browser. Both examples do the same thing: create a transaction
              and print the URL to redirect the customer to.
            </p>

            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">
              Node.js
            </p>
            <CodeBlock
              title="javascript"
              code={`import { randomUUID } from "crypto";

const res = await fetch("${BASE_URL}/transaction/initialize/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": process.env.PSEUDOPAY_SECRET_KEY,
    "Idempotency-Key": randomUUID(), // one per checkout, reuse on retry
  },
  body: JSON.stringify({
    wallet: 1,
    amount: 5000,
    transaction_type: "DEBIT",
    customer_email: "customer@example.com",
    customer_name: "Alice",
    transaction_metadata: { order_id: "ORD-123" }, // link webhooks to orders
  }),
});

const data = await res.json();
console.log(data.checkout_url); // redirect the customer here`}
            />

            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-4">
              Python
            </p>
            <CodeBlock
              title="python"
              code={`import os
import requests
from uuid import uuid4

BASE_URL = "${BASE_URL}"

response = requests.post(
    f"{BASE_URL}/transaction/initialize/",
    headers={
        "X-Api-Key": os.environ["PSEUDOPAY_SECRET_KEY"],
        "Idempotency-Key": str(uuid4()),  # one per checkout, reuse on retry
    },
    json={
        "wallet": 1,
        "amount": 5000,
        "transaction_type": "DEBIT",
        "customer_email": "customer@example.com",
        "customer_name": "Alice",
        "transaction_metadata": {"order_id": "ORD-123"},
    },
)

data = response.json()
print(data["checkout_url"])  # redirect the customer here`}
            />
          </section>

          <footer className="flex items-center justify-between border-t border-border pt-6 text-sm text-muted-foreground">
            <p>&copy; 2026 PseudoPay. Docs for developers.</p>
            <Link
              to="/dashboard"
              className="flex items-center gap-1 font-medium text-primary"
            >
              Go to dashboard <ArrowUpRight size={15} />
            </Link>
          </footer>
        </main>
      </div>
    </section>
  );
};

export default Docs;
