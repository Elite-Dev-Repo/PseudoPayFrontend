import {
  ArrowUpRight,
  ChevronRight,
  MoveUpRight,
  PlaneTakeoff,
  SwatchBook,
} from "lucide-react";
import stack from "../assets/stack.png";
const Header = () => {
  const NavLinks = [
    {
      name: "Home",
      href: "#home",
    },
    {
      name: "About",
      href: "#about",
    },
    {
      name: "Business",
      href: "#business",
    },
    {
      name: "Faqs",
      href: "#faqs",
    },
    {
      name: "Contact",
      href: "#contact",
    },
  ];

  return (
    <section className="min-h-screen w-screen">
      <div className="cont w-full">
        <nav className="w-full h-14">
          <div className="w-full h-full flex items-center justify-around">
            <div className="flex items-center gap-2">
              <p className="text-[16px] font-semibold flex items-center gap-2 tracking-wide text-primary">
                <span className="bg-primary p-2 rounded-sm flex items-center justify-center">
                  <SwatchBook strokeWidth={2} className="text-white" />
                </span>{" "}
                PseudoPay
              </p>
            </div>

            <ul className="flex items-center gap-6">
              {NavLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm font-medium tracking-wider"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <button className="px-5 py-1.5 bg-primary text-primary-foreground rounded-full flex items-center gap-2">
                Join us <ArrowUpRight strokeWidth={1.5} size={19} />
              </button>
            </div>
          </div>
        </nav>

        <div className="w-full min-h-screen bg-slate-50 rounded-2xl flex items-center justify-around relative">
          <div className="w-100 h-100 bg-primary/5 rounded-full absolute top-0 left-1 blur-2xl"></div>
          <div className="w-100 h-100 bg-primary/10 rounded-full absolute top-10 right-40 blur-2xl"></div>
          <div className="flex-1 flex items-center justify-center flex-col px-5 gap-5">
            <h1 className="text-6xl font-semibold text-start relative leading-tight">
              Mock Payment{" "}
              <span className="bg-primary text-white px-2 rounded-sm">
                Gateway
              </span>{" "}
              for
              <span className="flex items-center p-2 bg-primary rounded-sm w-fit absolute top-19 right-44">
                <PlaneTakeoff strokeWidth={1.75} className="text-white" />
              </span>
              <br /> Internet Businesses
            </h1>
            <p className="text-lg wrap-break-word">
              Accept payments, automate billing, and monetize your software
              globally. We handle the money, so you can focus on building.
            </p>
            <button className="self-start px-5 py-2 rounded-full bg-primary text-primary-foreground text-base flex items-center gap-3">
              Get Started{" "}
              <span className="flex items-center p-1.5 bg-white rounded-full">
                <ChevronRight className="text-primary" size={20} />
              </span>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img src={stack} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
