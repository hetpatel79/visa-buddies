import { useState, useRef } from "react";
import { EMPTY_FORM, validateConsultationForm } from "@/utils";

export function useFormState() {
  const [form,       setForm]       = useState(EMPTY_FORM);
  const [sent,       setSent]       = useState(false);
  const [errors,     setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const lastSubmitRef = useRef(0);

  const clearField = (key) =>
    setErrors((prev) => ({ ...prev, [key]: undefined }));

  const resetForm = () => {
    setSent(false);
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitError(null);
  };

  const handleSubmit = async () => {
    // Honeypot — silently fake success
    if (form.company) { setSent(true); return; }

    // Frontend rate limit / duplicate-click guard
    const now = Date.now();
    if (submitting || now - lastSubmitRef.current < 3000) return;

    const errs = validateConsultationForm(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    lastSubmitRef.current = now;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/.netlify/functions/send-email", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        setSubmitError(json.error || "Something went wrong. Please try again.");
        return;
      }

      setSent(true);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form, setForm,
    sent, setSent,
    errors, setErrors, clearField,
    submitting,
    submitError,
    resetForm, handleSubmit,
  };
}
