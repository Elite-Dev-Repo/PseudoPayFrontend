import { useEffect, useState } from "react";
import { Copy, KeyRound, Plus, Trash2 } from "lucide-react";

import { listApiKeys, createApiKey, deleteApiKey } from "../../api/apikeyapi";
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

const ApiKeys = () => {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const fetchKeys = () => {
    listApiKeys()
      .then((res) => setKeys(res.data))
      .catch((err) =>
        setError(err?.response?.data?.detail || "Failed to load API keys."),
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setSubmitting(true);
    try {
      const res = await createApiKey({ name });
      setNotice(`Your secret key (shown once): ${res.data.raw_key}`);
      setName("");
      setShowCreate(false);
      fetchKeys();
    } catch (err) {
      const data = err?.response?.data;
      setError(
        data
          ? Object.values(data).flat().join(", ")
          : "Unable to create the key.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (key) => {
    setError("");
    setNotice("");
    if (!window.confirm(`Delete API key "${key.name}"?`)) return;
    try {
      await deleteApiKey(key.id);
      setNotice("API key deleted.");
      fetchKeys();
    } catch (err) {
      setError(err?.response?.data?.detail || "Unable to delete the key.");
    }
  };

  return (
    <div>
      <PageHeader
        title="API Keys"
        description="Secret keys for authenticating requests to the PseudoPay API."
        action={
          <Button onClick={() => setShowCreate(true)}>
            <Plus size={16} /> Create key
          </Button>
        }
      />

      <div className="flex flex-col gap-4 mb-6">
        <ErrorBanner message={error} />
        <SuccessBanner message={notice} />
      </div>

      {loading ? (
        <Spinner />
      ) : keys.length === 0 ? (
        <Card>
          <EmptyState
            title="No API keys yet"
            description="Create a secret key to authenticate API requests."
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keys.map((key) => (
            <Card key={key.id} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <KeyRound size={18} className="text-primary" />
                  </span>
                  <div>
                    <p className="font-medium">{key.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Created {new Date(key.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Badge tone={key.is_active ? "success" : "danger"}>
                  {key.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <code className="text-xs text-muted-foreground font-mono">
                  {key.prefix}••••••••••••••••••
                </code>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDelete(key)}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete key"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        title="Create an API key"
      >
        <form className="flex flex-col gap-4" onSubmit={handleCreate}>
          <Field label="Key name" hint="A short label to identify this key.">
            <input
              type="text"
              name="name"
              placeholder="e.g. Production server"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClasses}
              required
            />
          </Field>
          <ErrorBanner message={error} />
          <Button type="submit" loading={submitting} className="mt-2">
            Create key
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default ApiKeys;
