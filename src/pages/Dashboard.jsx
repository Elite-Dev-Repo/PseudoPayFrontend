import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  KeyRound,
  LayoutDashboard,
  LogOut,
  Settings,
  SwatchBook,
  Wallet as WalletIcon,
  ArrowLeftRight,
} from "lucide-react";

import { ACCESS, REFRESH } from "../api/constants";
import { getProfile } from "../api/authapi";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/wallets", label: "Wallets", icon: WalletIcon },
  { to: "/dashboard/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/dashboard/api-keys", label: "API Keys", icon: KeyRound },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem(ACCESS)) {
      navigate("/auth", { replace: true });
      return;
    }
    getProfile()
      .then((res) => setProfile(res.data))
      .catch(() => {});
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS);
    localStorage.removeItem(REFRESH);
    navigate("/");
  };

  const firstName = profile?.first_name || "";
  const email = profile?.email || "";

  return (
    <div className="min-h-screen w-screen flex bg-slate-50">
      <aside className="w-64 shrink-0 bg-primary text-white flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="bg-white p-2 rounded-sm flex items-center justify-center">
              <SwatchBook strokeWidth={2} className="text-primary" />
            </span>
            <span className="text-lg font-semibold tracking-wide">
              PseudoPay
            </span>
          </NavLink>
        </div>

        <nav className="flex-1 flex flex-col gap-1 px-4">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white text-primary"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 mb-3">
            <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center font-semibold text-sm">
              {firstName ? firstName[0].toUpperCase() : "U"}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">
                {firstName || "Account"}
              </p>
              <p className="text-xs text-white/60 truncate">{email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="cont py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
