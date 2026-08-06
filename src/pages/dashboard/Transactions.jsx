import { useEffect, useState } from "react";
import { Plus, Printer } from "lucide-react";

import { listWallets, listTransactions } from "../../api/walletapi";
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
  const [error, setError] = useState("");

  const fetchData = () => {
    Promise.all([listTransactions(), listWallets()])
      .then(([txnRes, walletRes]) => {
        setTransactions(txnRes.data);
        setWallets(walletRes.data);
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

  return (
    <div>
      <PageHeader
        title="Transactions"
        description="Charge customers and record payments against your wallets."
        action={
          <Button
            onClick={console.log("Print CSV")}
            disabled={wallets.length === 0}
          >
            <Printer size={16} /> Print CSV
          </Button>
        }
      />

      <div className="flex flex-col gap-4 mb-6">
        <ErrorBanner message={error} />
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
                      {txn.currency}{" "}
                      {Number(txn.amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        tone={TRANSACTION_STATUS_TONE[txn.transaction_status]}
                      >
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
    </div>
  );
};

export default Transactions;
