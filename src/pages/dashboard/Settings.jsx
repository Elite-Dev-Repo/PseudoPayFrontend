import { useEffect, useState } from "react";

import { getProfile, updateMerchantProfile } from "../../api/authapi";
import {
  Button,
  Card,
  ErrorBanner,
  Field,
  PageHeader,
  Spinner,
  SuccessBanner,
  inputClasses,
} from "../../components/dashboard/ui";

const USER_TYPES = [
  { value: "free", label: "Free" },
  { value: "premium", label: "Premium" },
];

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [profile, setProfile] = useState(null);

  const [form, setForm] = useState({
    user_type: "free",
    merchant_address: "",
    merchant_phone: "",
    merchant_description: "",
  });

  useEffect(() => {
    getProfile()
      .then((res) => {
        setProfile(res.data);
        setForm({
          user_type: res.data.profile?.user_type || "free",
          merchant_address: res.data.profile?.merchant_address || "",
          merchant_phone: res.data.profile?.merchant_phone || "",
          merchant_description: res.data.profile?.merchant_description || "",
        });
      })
      .catch((err) =>
        setError(err?.response?.data?.detail || "Failed to load profile."),
      )
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setSaving(true);
    try {
      await updateMerchantProfile(form);
      setNotice("Profile updated successfully.");
    } catch (err) {
      const data = err?.response?.data;
      setError(
        data ? Object.values(data).flat().join(", ") : "Unable to update profile.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your merchant profile and account details."
      />

      <div className="flex flex-col gap-4 mb-6">
        <ErrorBanner message={error} />
        <SuccessBanner message={notice} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
              {(profile?.first_name || "U")[0].toUpperCase()}
            </span>
            <div>
              <p className="font-semibold">
                {profile?.first_name} {profile?.last_name}
              </p>
              <p className="text-sm text-muted-foreground">{profile?.email}</p>
            </div>
          </div>
          <dl className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Gender</dt>
              <dd className="font-medium">{profile?.gender || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Date of birth</dt>
              <dd className="font-medium">{profile?.date_of_birth || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Merchant email</dt>
              <dd className="font-medium truncate">
                {profile?.profile?.merchant_email || "—"}
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="font-semibold text-lg mb-4">Merchant profile</h3>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Field label="Account type">
              <select
                name="user_type"
                value={form.user_type}
                onChange={handleChange}
                className={inputClasses}
              >
                {USER_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Business address">
                <input
                  type="text"
                  name="merchant_address"
                  placeholder="123 Payment Ave, Lagos"
                  value={form.merchant_address}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </Field>
              <Field label="Phone number">
                <input
                  type="tel"
                  name="merchant_phone"
                  placeholder="+234 900 000 0000"
                  value={form.merchant_phone}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </Field>
            </div>

            <Field label="Description">
              <textarea
                name="merchant_description"
                rows={3}
                placeholder="Tell your customers a bit about your business."
                value={form.merchant_description}
                onChange={handleChange}
                className={inputClasses}
              />
            </Field>

            <Button type="submit" loading={saving} className="self-start mt-2">
              Save changes
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
