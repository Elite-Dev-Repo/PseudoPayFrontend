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

const Business = () => {
  const solutions = [
    {
      icon: <Link2 size={20} />,
      title: "Payment Links",
      description:
        "Create and share payment links in seconds. No code required.",
    },
    {
      icon: <CreditCard size={20} />,
      title: "Subscriptions & Billing",
      description:
        "Automate recurring billing with flexible plans, trials and dunning.",
    },
    {
      icon: <Globe size={20} />,
      title: "Global Payments",
      description:
        "Accept payments in multiple currencies from customers worldwide.",
    },
    {
      icon: <Zap size={20} />,
      title: "Instant Payouts",
      description:
        "Withdraw your balance instantly to any bank account or digital wallet.",
    },
    {
      icon: <Lock size={20} />,
      title: "Fraud Protection",
      description:
        "AI-powered risk scoring and chargeback management built into every payment.",
    },
    {
      icon: <LineChart size={20} />,
      title: "Analytics & Insights",
      description:
        "Track revenue, conversion and customer behaviour in real time.",
    },
  ];

  const stats = [
    { value: "250K+", label: "Businesses" },
    { value: "$10M+", label: "Processed" },
    { value: "99.9%", label: "Uptime" },
    { value: "150+", label: "Countries" },
  ];

  return (
    <section className="min-h-screen w-screen" id="business">
      <div className="cont min-h-screen flex flex-col justify-center gap-8 py-12">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-4xl font-bold">Built for your Business</h3>
            <p className="text-lg text-muted-foreground">
              The complete payments stack to start, scale and automate your
              internet business.
            </p>
          </div>
          <button className="px-5 py-2 bg-primary text-primary-foreground rounded-full flex items-center gap-2">
            Start Selling <ArrowUpRight strokeWidth={1.5} size={19} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 flex flex-col items-start justify-between gap-6 min-h-52 ${
                index === 0
                  ? "col-span-2 bg-primary text-white"
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
                  className={`font-light text-md ${index === 0 ? "w-[70%]" : ""}`}
                >
                  {solution.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl bg-slate-50 p-6 flex items-center gap-4"
            >
              <Wallet size={24} className="text-primary" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">
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
