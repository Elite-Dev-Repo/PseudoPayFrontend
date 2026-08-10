import {
  ArrowUpRight,
  ChevronRight,
  Menu,
  PlaneTakeoff,
  SwatchBook,
  X,
} from "lucide-react";
import { useState } from "react";

import { ACCESS } from "../api/constants";

import { Link } from "react-router-dom";

import stack from "../assets/stack.png";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon } from "@hugeicons/core-free-icons";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const token = localStorage.getItem(ACCESS);

  return (
    <section className="min-h-screen w-screen">
      <div className="cont w-full">
        <nav className="w-full h-14">
          <div className="w-full h-full flex items-center justify-between gap-4">
            <Link to="/">
              <div className="flex items-center gap-2">
                <p className="text-[16px] font-semibold flex items-center gap-2 tracking-wide text-primary">
                  <span className="bg-primary p-2 rounded-sm flex items-center justify-center">
                    <SwatchBook strokeWidth={2} className="text-white" />
                  </span>{" "}
                  PseudoPay
                </p>
              </div>
            </Link>

            <ul className="hidden md:flex items-center gap-6">
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

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-4">
                <Link to="/docs">
                  <p className="text-sm font-medium tracking-wider">Docs</p>
                </Link>
                <HugeiconsIcon
                  icon={GithubIcon}
                  size={20}
                  className="cursor-pointer"
                />
              </div>
              {token ? (
                <Link to="/dashboard">
                  <button className="px-4 sm:px-5 font-semibold py-1.5 bg-primary text-primary-foreground rounded-full flex items-center gap-2 whitespace-nowrap">
                    Dashboard
                  </button>
                </Link>
              ) : (
                <Link to="/auth">
                  <button className="px-4 sm:px-5 font-semibold py-1.5 bg-primary text-primary-foreground rounded-full flex items-center gap-2 whitespace-nowrap">
                    Join us <ArrowUpRight strokeWidth={1.5} size={19} />
                  </button>
                </Link>
              )}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="md:hidden absolute left-0 right-0 top-14 bg-white border-b border-border shadow-lg rounded-b-2xl p-4 flex flex-col gap-1">
              {NavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/docs"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Docs
              </a>
            </div>
          )}
        </nav>

        <div className="w-full min-h-screen bg-slate-50 rounded-2xl flex flex-col-reverse lg:flex-row items-center lg:justify-around relative overflow-hidden">
          <div className="w-100 h-100 bg-primary/5 rounded-full absolute top-0 left-0 blur-2xl"></div>
          <div className="w-100 h-100 bg-primary/10 rounded-full absolute top-10 right-40 blur-2xl"></div>

          <div className="flex-1 w-full flex items-center justify-center order-1 lg:order-none pt-6 lg:pt-0">
            <img
              src={stack}
              alt=""
              className="max-w-[260px] sm:max-w-sm lg:max-w-none"
            />
          </div>

          <div className="w-full flex-1 flex flex-col items-center lg:items-start gap-5 px-5 pb-10 lg:pb-0 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight relative">
              Mock Payment <span className="text-black px-2 rounded-sm">Gateway</span> for
              <span className="hidden lg:flex items-center p-2 bg-primary rounded-sm w-fit absolute top-19 right-44">
                <PlaneTakeoff strokeWidth={1.75} className="text-white" />
              </span>
              <br className="hidden lg:block" /> Internet Businesses
            </h1>
            <p className="text-base sm:text-lg">
              Accept payments, automate billing, and monetize your software
              globally. We handle the money, so you can focus on building.
            </p>
            <Link to="/dashboard" className="self-center lg:self-start">
              <button className="pl-5 pr-3 py-2 rounded-full bg-primary text-primary-foreground text-base font-semibold flex items-center gap-3">
                Get Started{" "}
                <span className="flex items-center p-1.5 bg-white rounded-full">
                  <ChevronRight className="text-black" size={20} />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;