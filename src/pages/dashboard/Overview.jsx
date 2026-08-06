import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeftRight,
  ArrowUpRight,
  BanknoteArrowUp,
  Wallet as WalletIcon,
} from "lucide-react";

import { getProfile } from "../../api/authapi";
import { listWallets, listTransactions } from "../../api/walletapi";
import {
  Badge,
  Card,
  PageHeader,
  Spinner,
  EmptyState,
  Button,
} from "../../components/dashboard/ui";

const getEmojiBasedOnHour = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "☀️";
  if (hour < 18) return "🌤️";
  return "🌙";
};

const TRANSACTION_TONE = {
  CREDIT: "success",
  DEBIT: "danger",
};

const formatAmount = (value, currency = "NGN") =>
  `${currency} ${Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const Overview = () => {
  const [profile, setProfile] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProfile(), listWallets(), listTransactions()])
      .then(([profileRes, walletRes, txnRes]) => {
        setProfile(profileRes.data);
        setWallets(walletRes.data);
        setTransactions(txnRes.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalBalance = wallets.reduce(
    (sum, wallet) => sum + Number(wallet.balance),
    0,
  );
  const credits = transactions.filter((t) => t.transaction_type === "CREDIT");
  const debits = transactions.filter((t) => t.transaction_type === "DEBIT");
  const recentTransactions = [...transactions].slice(-5).reverse();

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={` ${getEmojiBasedOnHour()} Welcome back${profile?.first_name ? `, ${profile.first_name}` : ""}`}
        description="Here's what's happening with your payments today."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-primary text-black border-none">
          <div className="flex items-center justify-between">
            <span className="text-sm text-black/70">Total balance</span>
            <WalletIcon size={18} className="text-black/70" />
          </div>
          <p className="text-3xl font-bold mt-3">
            {formatAmount(totalBalance)}
          </p>
          <p className="text-xs text-black/60 mt-1">
            Across {wallets.length} wallet{wallets.length !== 1 ? "s" : ""}
          </p>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Money received
            </span>
            <ArrowUpRight size={18} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold mt-3">
            {formatAmount(
              credits.reduce((sum, t) => sum + Number(t.amount), 0),
            )}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {credits.length} credit transaction{credits.length !== 1 ? "s" : ""}
          </p>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Money paid out
            </span>
            <ArrowLeftRight size={18} className="text-red-500" />
          </div>
          <p className="text-2xl font-bold mt-3">
            {formatAmount(debits.reduce((sum, t) => sum + Number(t.amount), 0))}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {debits.length} debit transaction{debits.length !== 1 ? "s" : ""}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Wallets</h3>
            <Link to="/dashboard/wallets">
              <Button variant="ghost" className="text-primary">
                View all <ArrowUpRight size={16} />
              </Button>
            </Link>
          </div>
          {wallets.length === 0 ? (
            <EmptyState
              title="No wallets yet"
              description="Create a wallet to start accepting payments."
            />
          ) : (
            <div className="flex flex-col gap-3">
              {wallets.slice(0, 4).map((wallet) => (
                <div
                  key={wallet.id}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{wallet.currency} Wallet</p>
                    <p className="text-xs text-muted-foreground">
                      {wallet.request_origin || "No origin set"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-semibold">
                      {formatAmount(wallet.balance, wallet.currency)}
                    </span>
                    <Badge
                      tone={
                        wallet.status === "ACTIVE"
                          ? "success"
                          : wallet.status === "LOCKED"
                            ? "warning"
                            : "danger"
                      }
                    >
                      {wallet.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Recent transactions</h3>
            <Link to="/dashboard/transactions">
              <Button variant="ghost" className="text-primary">
                View all <ArrowUpRight size={16} />
              </Button>
            </Link>
          </div>
          {recentTransactions.length === 0 ? (
            <EmptyState
              title="No transactions yet"
              description="Create a transaction to get started."
            />
          ) : (
            <div className="flex flex-col gap-3">
              {recentTransactions.slice(0, 5).map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
                >
                  <div className="flex-1 flex items-center justify-start gap-6">
                    <span className="bg-primary/15 p-2 rounded-full">
                      <BanknoteArrowUp className="text-primary" size={18} />
                    </span>
                    <div className="">
                      <p className="font-semibold capitalize text-sm ">
                        {txn.customer_name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {txn.transaction_reference}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`font-semibold text-sm ${
                        txn.transaction_type === "CREDIT"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {txn.transaction_type === "CREDIT" ? "+" : "-"}
                      {formatAmount(txn.amount)}
                    </span>
                    <Badge tone={TRANSACTION_TONE[txn.transaction_type]}>
                      {txn.transaction_type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Overview;
