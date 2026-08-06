import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { listWallets, listTransactions, createTransaction } from "../../api/walletapi";
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

const TRANSACTION_TYPE_TONE = {
  CREDIT: "success",
  DEBIT: "danger",
};

const TRANSACTION_STATUS_TONE = {
  INITIATED: "primary",
  PENDING: "warning",
  SUCCESSFUL: "success",
  FAILED: "danger",
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [form, setForm] = useState({
    wallet: "",
    amount: "",
    transaction_type: "CREDIT",
    customer_email: "",
    customer_name: "",
    currency: "NGN",
    transaction_metadata: "",
  });

  const fetchData = () => {
    Promise.all([listTransactions(), listWallets()])
      .then(([txnRes, walletRes]) => {
        setTransactions(txnRes.data);
        setWallets(walletRes.data);
        if (walletRes.data.length > 0 && !form.wallet) {
          setForm((prev) => ({ ...prev, wallet: walletRes.data[0].id }));
        }
      })
      .catch((err) =>
        setError(err?.response?.data?.detail || "Failed to load transactions."),
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const payload = { ...form };
    if (payload.transaction_metadata) {
      try {
        payload.transaction_metadata = JSON.parse(payload.transaction_metadata);
      } catch {
        setError("Transaction metadata must be valid JSON.");
        setSubmitting(false);
        return;
      }
    } else {
      delete payload.transaction_metadata;
    }
    try {
      const res = await createTransaction(payload);
      setNotice(`Transaction created (${res.data.transaction_reference}).`);
      setShowCreate(false);
      setForm({
        wallet: wallets[0]?.id || "",
        amount: "",
        transaction_type: "CREDIT",
        customer_email: "",
        customer_name: "",
        currency: "NGN",
        transaction_metadata: "",
      });
      fetchData();
    } catch (err) {
      const data = err?.response?.data;
      setError(
        data?.error ||
          (data ? Object.values(data).flat().join(", ") : "") ||
          "Unable to create the transaction.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Transactions"
        description="Charge customers and record payments against your wallets."
        action={
          <Button onClick={() => setShowCreate(true)} disabled={wallets.length === 0}>
            <Plus size={16} /> New transaction
          </Button>
        }
      />

      <div className="flex flex-col gap-4 mb-6">
        <ErrorBanner message={error} />
        <SuccessBanner message={notice} />
      </div>

      {wallets.length === 0 ? (
        <Card>
          <EmptyState
            title="Create a wallet first"
            description="You need at least one wallet before you can create transactions."
          />
        </Card>
      ) : loading ? (
        <Spinner />
      ) : transactions.length === 0 ? (
        <Card>
          <EmptyState
            title="No transactions yet"
            description="Charge a customer or record a payment to see it here."
          />
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b border-border">
                  <th className="px-6 py-4 font-medium">Reference</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {[...transactions].reverse().map((txn) => (
                  <tr
                    key={txn.id}
                    className="border-b border-border last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-mono text-xs">
                      {txn.transaction_reference}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{txn.customer_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {txn.customer_email}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge tone={TRANSACTION_TYPE_TONE[txn.transaction_type]}>
                        {txn.transaction_type}
                      </Badge>
                    </td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        txn.transaction_type === "CREDIT"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {txn.transaction_type === "CREDIT" ? "+" : "-"}
                      {txn.currency} {Number(txn.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4">
                      <Badge tone={TRANSACTION_STATUS_TONE[txn.transaction_status]}>
                        {txn.transaction_status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(txn.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        title="New transaction"
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Field label="Wallet">
            <select
              name="wallet"
              value={form.wallet}
              onChange={handleChange}
              className={inputClasses}
              required
            >
              {wallets.map((wallet) => (
                <option key={wallet.id} value={wallet.id}>
                  {wallet.currency} Wallet — balance {wallet.currency}{" "}
                  {Number(wallet.balance).toLocaleString()}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Type">
              <select
                name="transaction_type"
                value={form.transaction_type}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="CREDIT">Credit (money in)</option>
                <option value="DEBIT">Debit (money out)</option>
              </select>
            </Field>
            <Field label="Currency">
              <select
                name="currency"
                value={form.currency}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="NGN">NGN</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </Field>
          </div>

          <Field label="Amount" hint="Minimum amount is 500.">
            <input
              type="number"
              name="amount"
              min="500"
              step="0.01"
              placeholder="1000.00"
              value={form.amount}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Customer name">
              <input
                type="text"
                name="customer_name"
                placeholder="Jane Doe"
                value={form.customer_name}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </Field>
            <Field label="Customer email">
              <input
                type="email"
                name="customer_email"
                placeholder="jane@email.com"
                value={form.customer_email}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </Field>
          </div>

          <Field label="Metadata (JSON)" hint={'Optional. e.g. {"product": "Plan Pro"}'}>
            <textarea
              name="transaction_metadata"
              rows={2}
              placeholder='{"product": "Plan Pro"}'
              value={form.transaction_metadata}
              onChange={handleChange}
              className={inputClasses}
            />
          </Field>

          <ErrorBanner message={error} />
          <Button type="submit" loading={submitting} className="mt-2">
            Create transaction
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Transactions;
