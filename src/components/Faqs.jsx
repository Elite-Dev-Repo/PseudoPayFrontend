import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const Faqs = () => {
  const [open, setOpen] = useState(0);

  const faqs = [
    {
      question: "How do I get started with PseudoPay?",
      answer:
        "Create an account, verify your email with the token we send, then create a wallet and generate an API key from the dashboard — all in a few minutes.",
    },
    {
      question: "How do payments work here?",
      answer:
        "Initialize a DEBIT or CREDIT transaction against an ACTIVE wallet (minimum 500). PseudoPay returns a checkout URL; completing it marks the transaction SUCCESSFUL and updates the balance instantly.",
    },
    {
      question: "What are the transaction fees?",
      answer:
        "There are no fees — PseudoPay is a mock gateway. Wallets start with a 500,000.00 mock balance and no real money ever moves.",
    },
    {
      question: "Which currencies and payment methods do you support?",
      answer:
        "Wallets come in NGN, USD or EUR, and customers pay through PseudoPay's hosted mock checkout page. Webhook notifications and email receipts are sent when a payment completes.",
    },
    {
      question: "Is my data safe?",
      answer:
        "Yes. Accounts stay inactive until the email is verified, login uses JWT tokens, and API keys are stored only as SHA-256 hashes — an ideal, safe sandbox for testing.",
    },
  ];

  return (
    <section className="min-h-screen w-screen" id="faqs">
      <div className="cont min-h-screen flex flex-col lg:flex-row items-center lg:justify-between gap-10 py-12">
        <div className="w-full lg:w-auto lg:flex-1 flex flex-col items-center lg:items-start gap-5 text-center lg:text-left">
          <span className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
            <HelpCircle size={22} />
          </span>
          <h3 className="text-3xl sm:text-4xl font-bold">
            Frequently Asked <br /> Questions
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground">
            Read what people are asking about PseudoPay. <br className="hidden lg:block" />
            Can't find your answer? Reach out to our team.
          </p>
          <a href="#contact">
            <button className="px-5 py-2 bg-primary text-primary-foreground rounded-full">
              Contact Support
            </button>
          </a>
        </div>

        <div className="w-full lg:flex-1 flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden ${
                open === index ? "bg-primary text-white" : "bg-slate-50"
              }`}
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-5"
              >
                <span className="font-medium text-start">{faq.question}</span>
                <span
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                    open === index ? "rotate-180 bg-white text-primary" : "bg-primary text-white"
                  }`}
                >
                  <ChevronDown size={16} />
                </span>
              </button>
              {open === index && (
                <p className="px-5 pb-5 text-sm font-light">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
