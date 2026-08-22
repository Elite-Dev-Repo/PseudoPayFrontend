import {
  ArrowUpRight,
  CreditCard,
  Globe,
  LineChart,
  Link2,
  Lock,
  Wallet,
  Zap,
} from "lucide-react";

import { ACCESS } from "../api/constants";
import { Link } from "react-router-dom";

const Business = () => {
  const solutions = [
    {
      icon: <Link2 size={20} />,
      title: "Merchant Wallets",
      description:
        "Create up to 3 business wallets in NGN, USD or EUR, each preloaded with a 500,000 mock balance.",
    },
    {
      icon: <CreditCard size={20} />,
      title: "Transaction API",
      description:
        "Initialize DEBIT and CREDIT transactions with a single REST call and a secret API key.",
    },
    {
      icon: <Globe size={20} />,
      title: "Hosted Checkout",
      description:
        "Send customers to PseudoPay's hosted payment page — completing it updates your wallet balance instantly.",
    },
    {
      icon: <Zap size={20} />,
      title: "Webhooks",
      description:
        "Get real-time payment confirmations POSTed to the request_origin URL configured on your wallet.",
    },
    {
      icon: <Lock size={20} />,
      title: "Secret API Keys",
      description:
        "Generate sk_pseudo_ keys for your servers. Only a SHA-256 hash is stored — the raw key is shown once.",
    },
    {
      icon: <LineChart size={20} />,
      title: "Email Verification",
      description:
        "Accounts start inactive until verified with a 15-minute token, keeping bots and bad actors out.",
    },
  ];

  const stats = [
    { value: "500K", label: "Mock start balance" },
    { value: "3", label: "Currencies" },
    { value: "2", label: "Transaction types" },
    { value: "15 min", label: "Verification token" },
  ];

  return (
    <section className="min-h-screen w-screen" id="business">
      <div className="cont min-h-screen flex flex-col justify-center gap-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="text-3xl sm:text-4xl font-bold">Built for your Business</h3>
            <p className="text-base sm:text-lg text-muted-foreground">
              Everything you need to build and test a full payment
              integration.
            </p>
          </div>
          <Link to={localStorage.getItem(ACCESS) ? "/dashboard" : "/auth"} className="self-center md:self-auto">
            <button className="px-5 py-2 bg-primary text-primary-foreground rounded-full flex items-center gap-2">
              Get Started <ArrowUpRight strokeWidth={1.5} size={19} />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 flex flex-col items-start justify-between gap-6 min-h-52 ${
                index === 0
                  ? "sm:col-span-2 bg-primary text-white"
                  : "bg-slate-50"
              }`}
            >
              <span
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  index === 0
                    ? "bg-white text-primary"
                    : "bg-primary text-white"
                }`}
              >
                {solution.icon}
              </span>
              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-semibold">{solution.title}</h4>
                <p
                  className={`font-light text-md ${index === 0 ? "w-full md:w-[70%]" : ""}`}
                >
                  {solution.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl bg-slate-50 p-4 sm:p-6 flex items-center gap-3 sm:gap-4"
            >
              <Wallet size={24} className="text-primary shrink-0" />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Business;
