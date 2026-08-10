import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Copy,
  CreditCard,
  Globe,
  KeyRound,
  Lock,
  RefreshCw,
  Send,
  ShieldCheck,
  SwatchBook,
  Wallet,
  Zap,
} from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon } from "@hugeicons/core-free-icons";

import { ACCESS } from "../api/constants";

const BASE_URL = "http://127.0.0.1:8000/api";

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
  request,
  requestBody,
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
  { id: "sdk", label: "Code examples" },
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
              PseudoPay is a mock payment gateway for internet businesses. It
              lets you issue merchant wallets, initialize transactions, send
              customers to a hosted checkout page, and get notified in
              real-time via webhooks — all with a simple REST API.
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
                  text: "Get real-time payment confirmations.",
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
            <CodeBlock
              title="base url"
              code={`${BASE_URL}`}
            />
          </section>

          {/* Getting started */}
          <section id="getting-started" className="flex flex-col gap-4 scroll-mt-24">
            <h2 className="text-2xl font-bold">Getting started</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Follow these four steps to start accepting payments. Everything
              you need lives in the{" "}
              <Link to="/dashboard" className="text-primary font-medium">
                dashboard
              </Link>
              .
            </p>
            <ol className="flex flex-col gap-4">
              {[
                {
                  title: "Create an account",
                  text: "Register through the sign-up page and verify your email address with the token you receive. You won't be active until you verify.",
                },
                {
                  title: "Create a wallet",
                  text: "Give your business a wallet. Pick a currency and set your request_origin — the webhook URL PseudoPay will call when payments complete.",
                },
                {
                  title: "Generate an API key",
                  text: "Create a secret key from the API Keys page. Send it in the X-Api-Key header when initializing transactions. It is shown only once — store it securely.",
                },
                {
                  title: "Initialize a transaction",
                  text: "Charge a customer by creating a transaction. PseudoPay returns a checkout URL that redirects to the hosted checkout page.",
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
              A single payment moves through five states —{" "}
              <code className="text-xs">INITIATED</code>,{" "}
              <code className="text-xs">PENDING</code>,{" "}
              <code className="text-xs">SUCCESSFUL</code> or{" "}
              <code className="text-xs">FAILED</code>.
            </p>
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: <KeyRound size={16} />,
                  step: "Initialize",
                  text: "Your server calls POST /transaction/initialize/ with your secret API key. PseudoPay creates the transaction and returns a checkout_url.",
                },
                {
                  icon: <Globe size={16} />,
                  step: "Redirect",
                  text: "Your app sends the customer to the hosted checkout page at /api/checkout/<reference>/.",
                },
                {
                  icon: <CreditCard size={16} />,
                  step: "Complete",
                  text: "The customer completes the mock payment. The transaction is marked SUCCESSFUL and the wallet balance is updated atomically.",
                },
                {
                  icon: <Send size={16} />,
                  step: "Notify",
                  text: "PseudoPay POSTs a webhook to your wallet's request_origin and emails a receipt to the customer.",
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
              code={`// After initializing, send your customer to the hosted page
const { checkout_url } = await initializeTransaction(payload);
window.location.href = checkout_url;`}
            />
          </section>

          {/* Auth */}
          <section id="auth" className="flex flex-col gap-4 scroll-mt-24">
            <h2 className="text-2xl font-bold">Authentication</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              PseudoPay uses JWT access and refresh tokens. Send the access
              token in the{" "}
              <code className="text-xs">Authorization: Bearer &lt;token&gt;</code>{" "}
              header. Access tokens last 15 days; refresh tokens last 30.
            </p>
            <Endpoint
              method="POST"
              path="/api/auth/token/"
              auth="No"
              title="Log in"
              description="Exchange your email and password for a JWT pair."
              requestBody={`{
  "email": "merchant@example.com",
  "password": "S3curePass123!"
}`}
              request={`curl -X POST ${BASE_URL}/auth/token/ \\
  -H "Content-Type: application/json" \\
  -d '{"email": "merchant@example.com", "password": "S3curePass123!"}'`}
              response={`{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`}
            />
            <Endpoint
              method="POST"
              path="/api/auth/token/refresh/"
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
          </section>

          {/* Reference */}
          <section id="reference" className="flex flex-col gap-4 scroll-mt-24">
            <h2 className="text-2xl font-bold">API reference</h2>

            <h3 className="text-lg font-semibold mt-4">Accounts</h3>
            <Endpoint
              method="POST"
              path="/api/register/"
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
              request={`curl -X POST ${BASE_URL}/register/ \\
  -H "Content-Type: application/json" \\
  -d '{
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "merchant@example.com",
    "password": "S3curePass123!",
    "gender": "Female"
  }'`}
              response={`{
  "id": 1,
  "first_name": "Jane",
  "last_name": "Doe",
  "date_of_birth": "1995-06-15",
  "gender": "Female",
  "email": "merchant@example.com",
  "profile": null
}`}
              note="password is write-only and never returned."
            />
            <Endpoint
              method="POST"
              path="/api/verify-email/"
              auth="No"
              title="Verify your email"
              description="Confirm your account with the token sent to your inbox."
              requestBody={`{
  "token": "A1B2C3D4"
}`}
              response={`{
  "message": "Email verified successfully"
}`}
              note="Verification tokens expire after 15 minutes."
            />
            <Endpoint
              method="POST"
              path="/api/resend-code/"
              auth="No"
              title="Resend verification code"
              description="Generate a new verification token for an inactive account. Use this sparingly — it is rate limited."
              requestBody={`{
  "email": "merchant@example.com"
}`}
              response={`{
  "message": "Email verification token resent successfully"
}`}
            />

            <h3 className="text-lg font-semibold mt-8">Profile</h3>
            <Endpoint
              method="GET"
              path="/api/profile/"
              auth="Bearer token"
              title="Get your profile"
              description="Return the authenticated merchant's user and merchant profile."
              request={`curl ${BASE_URL}/profile/ \\
  -H "Authorization: Bearer <your access token>"`}
              response={`{
  "id": 1,
  "first_name": "Jane",
  "last_name": "Doe",
  "date_of_birth": "1995-06-15",
  "gender": "Female",
  "email": "merchant@example.com",
  "profile": {
    "id": 1,
    "user": 1,
    "user_type": "free",
    "merchant_address": "12 Payment Ave, Lagos",
    "merchant_phone": "+2348012345678",
    "merchant_email": "merchant@example.com",
    "merchant_description": "We sell digital goods."
  }
}`}
            />
            <Endpoint
              method="PUT"
              path="/api/update-merchant-profile/"
              auth="Bearer token"
              title="Update merchant profile"
              description="Update your merchant details. user, user_type and merchant_email are read-only."
              requestBody={`{
  "merchant_address": "12 Payment Ave, Lagos",
  "merchant_phone": "+2348012345678",
  "merchant_description": "We sell digital goods."
}`}
              request={`curl -X PUT ${BASE_URL}/update-merchant-profile/ \\
  -H "Authorization: Bearer <your access token>" \\
  -H "Content-Type: application/json" \\
  -d '{"merchant_address": "12 Payment Ave, Lagos"}'`}
            />

            <h3 className="text-lg font-semibold mt-8">Wallets</h3>
            <Endpoint
              method="GET"
              path="/api/wallet/"
              auth="Bearer token"
              title="List wallets"
              description="List all wallets on your merchant profile (max 3)."
              request={`curl ${BASE_URL}/wallet/ \\
  -H "Authorization: Bearer <your access token>"`}
              response={`[
  {
    "id": 1,
    "profile": 1,
    "balance": "500000.00",
    "currency": "NGN",
    "status": "ACTIVE",
    "request_origin": "https://mysite.com/pseudopay/webhook",
    "created_at": "2026-08-10T12:00:00Z"
  }
]`}
            />
            <Endpoint
              method="POST"
              path="/api/wallet/"
              auth="Bearer token"
              title="Create a wallet"
              description="Create a new currency wallet. Currency is NGN, USD or EUR. New wallets start with a 500,000.00 mock balance."
              requestBody={`{
  "currency": "NGN",
  "status": "ACTIVE",
  "request_origin": "https://mysite.com/pseudopay/webhook"
}`}
              request={`curl -X POST ${BASE_URL}/wallet/ \\
  -H "Authorization: Bearer <your access token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "currency": "NGN",
    "request_origin": "https://mysite.com/pseudopay/webhook"
  }'`}
              response={`{
  "id": 1,
  "profile": 1,
  "balance": "500000.00",
  "currency": "NGN",
  "status": "ACTIVE",
  "request_origin": "https://mysite.com/pseudopay/webhook",
  "created_at": "2026-08-10T12:00:00Z"
}`}
              note="You can only have 3 wallets. balance and profile are managed by PseudoPay."
            />
            <Endpoint
              method="PATCH"
              path="/api/wallet/&lt;id&gt;/"
              auth="Bearer token"
              title="Update a wallet"
              description="Change the request_origin (webhook URL) for a wallet. Only the owner (or a superuser) can do this."
              requestBody={`{
  "request_origin": "https://mysite.com/new-webhook-endpoint"
}`}
              request={`curl -X PATCH ${BASE_URL}/wallet/1/ \\
  -H "Authorization: Bearer <your access token>" \\
  -H "Content-Type: application/json" \\
  -d '{"request_origin": "https://mysite.com/new-webhook-endpoint"}'`}
            />

            <h3 className="text-lg font-semibold mt-8">API keys</h3>
            <Endpoint
              method="GET"
              path="/api/api-keys/"
              auth="Bearer token"
              title="List API keys"
              description="List your secret keys. Only the prefix and metadata are returned — the full key is never shown again."
              request={`curl ${BASE_URL}/api-keys/ \\
  -H "Authorization: Bearer <your access token>"`}
              response={`[
  {
    "id": 1,
    "user": 1,
    "name": "Production server",
    "prefix": "sk_pseudo_",
    "is_active": true,
    "created_at": "2026-08-10T12:00:00Z"
  }
]`}
            />
            <Endpoint
              method="POST"
              path="/api/api-keys/create/"
              auth="Bearer token"
              title="Create an API key"
              description="Generate a new secret key. The full raw key is returned once in raw_key — save it immediately."
              requestBody={`{
  "name": "Production server"
}`}
              request={`curl -X POST ${BASE_URL}/api-keys/create/ \\
  -H "Authorization: Bearer <your access token>" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Production server"}'`}
              response={`{
  "id": 1,
  "user": 1,
  "name": "Production server",
  "prefix": "sk_pseudo_",
  "is_active": true,
  "created_at": "2026-08-10T12:00:00Z",
  "raw_key": "sk_pseudo_9fT2...xKp7"
}`}
              note="Store raw keys like passwords. PseudoPay only keeps a SHA-256 hash of the key."
            />
            <Endpoint
              method="DELETE"
              path="/api/api-keys/&lt;id&gt;/"
              auth="Bearer token"
              title="Delete an API key"
              description="Revoke a secret key. Only the owner can delete their own key."
              request={`curl -X DELETE ${BASE_URL}/api-keys/1/ \\
  -H "Authorization: Bearer <your access token>"`}
              response={`204 No Content`}
            />

            <h3 className="text-lg font-semibold mt-8">Transactions</h3>
            <Endpoint
              method="GET"
              path="/api/transaction/"
              auth="Bearer token"
              title="List transactions"
              description="List transactions for the authenticated merchant's wallet."
              request={`curl ${BASE_URL}/transaction/ \\
  -H "Authorization: Bearer <your access token>"`}
              response={`[
  {
    "id": 1,
    "user": "merchant@example.com",
    "wallet": 1,
    "amount": "5000.00",
    "transaction_type": "DEBIT",
    "transaction_status": "SUCCESSFUL",
    "transaction_reference": "TRX-1a2b3c4d1700000000000",
    "customer_email": "customer@example.com",
    "customer_name": "Alice",
    "transaction_metadata": { "order_id": "ORD-123" },
    "created_at": "2026-08-10T12:00:00Z"
  }
]`}
            />
            <Endpoint
              method="POST"
              path="/api/transaction/initialize/"
              auth="X-Api-Key"
              title="Initialize a transaction"
              description="Create a transaction and get a checkout URL to redirect your customer to. Authenticate with your secret API key, not a bearer token."
              requestBody={`{
  "wallet": 1,
  "amount": 5000,
  "transaction_type": "DEBIT",
  "customer_email": "customer@example.com",
  "customer_name": "Alice",
  "currency": "NGN",
  "transaction_metadata": { "order_id": "ORD-123" }
}`}
              request={`curl -X POST ${BASE_URL}/transaction/initialize/ \\
  -H "X-Api-Key: sk_pseudo_9fT2...xKp7" \\
  -H "Content-Type: application/json" \\
  -d '{
    "wallet": 1,
    "amount": 5000,
    "transaction_type": "DEBIT",
    "customer_email": "customer@example.com",
    "customer_name": "Alice"
  }'`}
              response={`{
  "id": 1,
  "user": "merchant@example.com",
  "wallet": 1,
  "amount": "5000.00",
  "transaction_type": "DEBIT",
  "transaction_status": "INITIATED",
  "transaction_reference": "TRX-1a2b3c4d1700000000000",
  "customer_email": "customer@example.com",
  "customer_name": "Alice",
  "transaction_metadata": { "order_id": "ORD-123" },
  "created_at": "2026-08-10T12:00:00Z",
  "checkout_url": "http://127.0.0.1:8000/api/checkout/TRX-1a2b3c4d1700000000000/"
}`}
              note="transaction_type is DEBIT or CREDIT and amount cannot be less than 500. The wallet must be ACTIVE. You may also send the key as Authorization: Api-Key <key>."
            />

            <h3 className="text-lg font-semibold mt-8">Checkout</h3>
            <Endpoint
              method="GET"
              path="/api/checkout/&lt;reference&gt;/"
              auth="No"
              title="Hosted checkout page"
              description="PseudoPay's hosted payment page for a transaction. Redirect your customer here. Completing it marks the transaction SUCCESSFUL and updates the wallet."
              request={`curl ${BASE_URL}/checkout/TRX-1a2b3c4d1700000000000/`}
              response={`200 OK (HTML)`}
            />
            <Endpoint
              method="GET"
              path="/api/payment/success/&lt;reference&gt;/"
              auth="No"
              title="Payment success page"
              description="Confirmation page shown after a successful payment."
              response={`200 OK (HTML)`}
            />
          </section>

          {/* Webhooks */}
          <section id="webhooks" className="flex flex-col gap-4 scroll-mt-24">
            <h2 className="text-2xl font-bold">Webhooks</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When a transaction completes, PseudoPay sends a{" "}
              <code className="text-xs">POST</code> request to the{" "}
              <code className="text-xs">request_origin</code> URL configured on
              your wallet.
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
              Your endpoint should respond with a 2xx quickly and ideally
              verify the request. A minimal Express handler looks like this:
            </p>
            <CodeBlock
              title="javascript — express"
              code={`app.post("/pseudopay/webhook", express.json(), (req, res) => {
  const { transaction_id, amount, status } = req.body;

  if (status === "SUCCESSFUL") {
    // Fulfil the order, update your database, send a receipt...
    console.log("Payment confirmed:", transaction_id, amount);
  }

  res.sendStatus(200);
});`}
            />
          </section>

          {/* Rate limits */}
          <section id="rate-limits" className="flex flex-col gap-4 scroll-mt-24">
            <h2 className="text-2xl font-bold">Rate limits</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Requests are throttled per scope using sliding windows. When you
              exceed a limit you get{" "}
              <code className="text-xs">429 Too Many Requests</code> with a{" "}
              <code className="text-xs">Retry-After</code> header.
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
                    ["anon", "10 / minute", "Unauthenticated requests (e.g. login, register)"],
                    ["register", "5 / hour", "Creating new accounts"],
                    ["resend_email", "3 / hour", "Resending verification codes"],
                    ["auth/google", "10 / minute", "Google OAuth login"],
                    ["verify_email", "10 / minute", "Email verification"],
                    ["wallet", "100 / minute", "Wallet reads and updates"],
                    ["profile", "30 / minute", "Profile reads and updates"],
                    ["transactions", "60 / minute", "Listing transactions"],
                    ["payments", "30 / minute", "Initializing transactions"],
                    ["api_keys", "30 / minute", "Managing API keys"],
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
            <CodeBlock
              title="json — 429 response"
              code={`{
  "detail": "Request was throttled. Expected available in 42 seconds."
}`}
            />
          </section>

          {/* Errors */}
          <section id="errors" className="flex flex-col gap-4 scroll-mt-24">
            <h2 className="text-2xl font-bold">Errors</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              PseudoPay uses standard HTTP status codes. Validation failures
              return field-level error maps; framework errors return a{" "}
              <code className="text-xs">detail</code> key.
            </p>
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
                    ["400 Bad Request", "Invalid or missing fields in the request body."],
                    ["401 Unauthorized", "Missing or invalid token / API key."],
                    ["403 Forbidden", "Authenticated but not allowed to do this."],
                    ["404 Not Found", "The resource does not exist (e.g. bad wallet id)."],
                    ["429 Too Many Requests", "Rate limit exceeded. Retry after the Retry-After window."],
                    ["500 Internal Server Error", "Something went wrong on our side."],
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
            <CodeBlock
              title="json — validation error"
              code={`{
  "amount": ["Amount cannot be less than 500"],
  "customer_email": ["Enter a valid email address."]
}`}
            />
          </section>

          {/* SDK */}
          <section id="sdk" className="flex flex-col gap-4 scroll-mt-24">
            <h2 className="text-2xl font-bold">Code examples</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Complete end-to-end examples in JavaScript and Python.
            </p>

            <div className="flex items-center gap-2 mt-1">
              <Zap size={16} className="text-primary" />
              <h3 className="font-semibold">JavaScript — full lifecycle</h3>
            </div>
            <CodeBlock
              title="javascript"
              code={`import axios from "axios";

const api = axios.create({ baseURL: "http://127.0.0.1:8000/api" });
let accessToken = null;

// 1. Log in
async function login() {
  const { data } = await api.post("/auth/token/", {
    email: "merchant@example.com",
    password: "S3curePass123!",
  });
  accessToken = data.access;
  api.defaults.headers.Authorization = \`Bearer \${accessToken}\`;
}

// 2. Create a wallet
async function createWallet() {
  const { data } = await api.post("/wallet/", {
    currency: "NGN",
    request_origin: "https://mysite.com/pseudopay/webhook",
  });
  return data.id;
}

// 3. Initialize a payment (server-side, with your secret key)
async function initializePayment(walletId) {
  const { data } = await axios.post(
    "http://127.0.0.1:8000/api/transaction/initialize/",
    {
      wallet: walletId,
      amount: 5000,
      transaction_type: "DEBIT",
      customer_email: "customer@example.com",
      customer_name: "Alice",
    },
    { headers: { "X-Api-Key": process.env.PSEUDOPAY_SECRET_KEY } },
  );
  return data.checkout_url;
}

await login();
const walletId = await createWallet();
const checkoutUrl = await initializePayment(walletId);
// window.location.href = checkoutUrl;`}
            />

            <div className="flex items-center gap-2 mt-6">
              <BookOpen size={16} className="text-primary" />
              <h3 className="font-semibold">Python — initialize a payment</h3>
            </div>
            <CodeBlock
              title="python"
              code={`import requests

BASE_URL = "http://127.0.0.1:8000/api"
SECRET_KEY = "sk_pseudo_9fT2...xKp7"  # your secret API key

response = requests.post(
    f"{BASE_URL}/transaction/initialize/",
    headers={"X-Api-Key": SECRET_KEY},
    json={
        "wallet": 1,
        "amount": 5000,
        "transaction_type": "DEBIT",
        "customer_email": "customer@example.com",
        "customer_name": "Alice",
    },
)

data = response.json()
print(data["checkout_url"])  # redirect the customer here`}
            />

            <div className="flex items-center gap-2 mt-6">
              <RefreshCw size={16} className="text-primary" />
              <h3 className="font-semibold">Python — receive a webhook</h3>
            </div>
            <CodeBlock
              title="python"
              code={`from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json


@csrf_exempt
@require_POST
def pseudopay_webhook(request):
    payload = json.loads(request.body)
    if payload["status"] == "SUCCESSFUL":
        # Update your database / fulfil the order
        pass
    return JsonResponse({"received": True})`}
            />
          </section>

          <footer className="flex items-center justify-between border-t border-border pt-6 text-sm text-muted-foreground">
            <p>&copy; 2026 PseudoPay. Docs for developers.</p>
            <Link to="/dashboard" className="flex items-center gap-1 font-medium text-primary">
              Go to dashboard <ArrowUpRight size={15} />
            </Link>
          </footer>
        </main>
      </div>
    </section>
  );
};

export default Docs;