import { useEffect, useState } from "react";

import { getProfile, updateMerchantProfile, updateUserProfile } from "../../api/authapi";
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
import { CalendarDays, ChevronDown, Crown, HatGlasses } from "lucide-react";

const GENDER_CHOICES = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [profile, setProfile] = useState(null);

  const [form, setForm] = useState({
    merchant_address: "",
    merchant_phone: "",
    merchant_description: "",
    date_of_birth: "",
    gender: "",
  });

  useEffect(() => {
    getProfile()
      .then((res) => {
        setProfile(res.data);
        setForm({
          merchant_address: res.data.profile?.merchant_address || "",
          merchant_phone: res.data.profile?.merchant_phone || "",
          merchant_description: res.data.profile?.merchant_description || "",
          date_of_birth: res.data.date_of_birth || "",
          gender: res.data.gender || "",
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
      await Promise.all([
        updateMerchantProfile({
          merchant_address: form.merchant_address,
          merchant_phone: form.merchant_phone,
          merchant_description: form.merchant_description,
        }),
        updateUserProfile({
          date_of_birth: form.date_of_birth || null,
          gender: form.gender,
        }),
      ]);
      setNotice("Profile updated successfully.");
    } catch (err) {
      const data = err?.response?.data;
      setError(
        data
          ? Object.values(data).flat().join(", ")
          : "Unable to update profile.",
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
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg mb-4">Merchant profile</h3>{" "}
            <p
              className={`inline-flex items-center gap-2 border w-fit rounded-full px-4 py-1.5 font-semibold text-sm ${profile?.profile?.user_type === "free" ? "text-green-500" : "text-blue-500"}`}
            >
              {profile?.profile?.user_type === "free" ? (
                <>
                  <HatGlasses className="w-4 h-4" /> Free
                </>
              ) : (
                <>
                  <Crown className="w-4 h-4" /> Premium
                </>
              )}
            </p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <h4 className="font-semibold">Account details</h4>
              <p className="text-xs text-muted-foreground">
                Update your personal information.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Date of birth">
                <div className="relative">
                  <CalendarDays
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="date"
                    name="date_of_birth"
                    value={form.date_of_birth}
                    onChange={handleChange}
                    className={`${inputClasses} pl-10`}
                  />
                </div>
              </Field>
              <Field label="Gender">
                <div className="relative">
                  <ChevronDown
                    size={16}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  />
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none pr-10`}
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    {GENDER_CHOICES.map((choice) => (
                      <option key={choice.value} value={choice.value}>
                        {choice.label}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>
            </div>

            <div className="h-px bg-border" />

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
