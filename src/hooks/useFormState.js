import { useState, useRef } from "react";
import { EMPTY_FORM, validateConsultationForm } from "@/utils";

export function useFormState() {
  const [form,       setForm]       = useState(EMPTY_FORM);
  const [sent,       setSent]       = useState(false);
  const [errors,     setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);
  const lastSubmitRef               = useRef(0);

  const clearField = (key) =>
    setErrors((prev) => ({ ...prev, [key]: undefined }));

  const resetForm = () => {
    setSent(false);
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const handleSubmit = () => {
    // Honeypot — silently fake success so bots don't retry
    if (form.company) { setSent(true); return; }

    const now = Date.now();
    if (submitting || now - lastSubmitRef.current < 3000) return;

    const errs = validateConsultationForm(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    lastSubmitRef.current = now;
    setSubmitting(true);

    // TODO: replace timeout with Resend call once connected
    setTimeout(() => { setSubmitting(false); setSent(true); }, 1200);
  };

  return {
    form, setForm,
    sent, setSent,
    errors, setErrors, clearField,
    submitting,
    resetForm, handleSubmit,
  };
}
