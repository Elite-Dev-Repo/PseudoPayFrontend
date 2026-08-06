import { useEffect, useState } from "react";
import { Plus, Wallet as WalletIcon } from "lucide-react";

import { listWallets, createWallet } from "../../api/walletapi";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  ErrorBanner,
  Field,
  Modal,
  PageHeader,
  Spinner,
  SuccessBanner,
  inputClasses,
} from "../../components/dashboard/ui";

const CURRENCIES = [
  { value: "NGN", label: "Naira (NGN)" },
  { value: "USD", label: "Dollar (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
];

const WALLET_TONE = {
  ACTIVE: "success",
  LOCKED: "warning",
  FROZEN: "danger",
};

const Wallets = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ currency: "NGN", request_origin: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const fetchWallets = () => {
    listWallets()
      .then((res) => setWallets(res.data))
      .catch((err) => setError(err?.response?.data?.detail || "Failed to load wallets."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setSubmitting(true);
    try {
      await createWallet(form);
      setNotice("Wallet created successfully.");
      setShowCreate(false);
      setForm({ currency: "NGN", request_origin: "" });
      fetchWallets();
    } catch (err) {
      const data = err?.response?.data;
      setError(
        data
          ? Object.values(data).flat().join(", ")
          : "Unable to create the wallet.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Wallets"
        description="Manage the wallets your customers pay into."
        action={
          <Button onClick={() => setShowCreate(true)}>
            <Plus size={16} /> New wallet
          </Button>
        }
      />

      <div className="flex flex-col gap-4 mb-6">
        <ErrorBanner message={error} />
        <SuccessBanner message={notice} />
      </div>

      {loading ? (
        <Spinner />
      ) : wallets.length === 0 ? (
        <Card>
          <EmptyState
            title="No wallets yet"
            description="Create your first wallet to start accepting payments."
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wallets.map((wallet) => (
            <Card key={wallet.id} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                  <WalletIcon size={20} className="text-primary" />
                </span>
                <Badge tone={WALLET_TONE[wallet.status]}>{wallet.status}</Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {wallet.currency} Wallet
                </p>
                <p className="text-2xl font-bold mt-1">
                  {wallet.currency} {Number(wallet.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {wallet.request_origin || "No request origin set"}
              </p>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        title="Create a new wallet"
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Field label="Currency">
            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className={inputClasses}
            >
              {CURRENCIES.map((currency) => (
                <option key={currency.value} value={currency.value}>
                  {currency.label}
                </option>
              ))}
            </select>
          </Field>
          <Field
            label="Request origin"
            hint="The URL your payment requests will come from."
          >
            <input
              type="url"
              name="request_origin"
              placeholder="https://yourstore.com"
              value={form.request_origin}
              onChange={handleChange}
              className={inputClasses}
            />
          </Field>
          <ErrorBanner message={error} />
          <Button type="submit" loading={submitting} className="mt-2">
            Create wallet
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Wallets;
