import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const Faqs = () => {
  const [open, setOpen] = useState(0);

  const faqs = [
    {
      question: "How do I get started with PseudoPay?",
      answer:
        "Sign up for free, verify your business details, and start accepting payments in minutes. No monthly fees, no lengthy onboarding.",
    },
    {
      question: "When will I receive my payouts?",
      answer:
        "Payouts are processed instantly. You can withdraw your balance to any bank account or digital wallet at any time.",
    },
    {
      question: "What are the transaction fees?",
      answer:
        "We charge a flat 2.9% + $0.30 per successful transaction. There are no hidden fees, setup costs or monthly charges.",
    },
    {
      question: "Which payment methods do you support?",
      answer:
        "We support credit and debit cards, bank transfers and popular digital wallets across 150+ countries and 30+ currencies.",
    },
    {
      question: "Is my money and customer data safe?",
      answer:
        "Yes. PseudoPay is fully PCI-DSS compliant and uses bank-grade 256-bit encryption and AI-powered fraud detection on every transaction.",
    },
  ];

  return (
    <section className="min-h-screen w-screen" id="faqs">
      <div className="cont min-h-screen flex items-center justify-between gap-12 py-12">
        <div className="flex-1 flex flex-col items-start gap-5">
          <span className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
            <HelpCircle size={22} />
          </span>
          <h3 className="text-4xl font-bold">
            Frequently Asked <br /> Questions
          </h3>
          <p className="text-lg text-muted-foreground">
            Read what people are asking about PseudoPay. <br />
            Can't find your answer? Reach out to our team.
          </p>
          <button className="px-5 py-2 bg-primary text-primary-foreground rounded-full">
            Contact Support
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-3">
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
