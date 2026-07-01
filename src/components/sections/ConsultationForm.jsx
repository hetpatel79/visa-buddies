import { motion, AnimatePresence } from "framer-motion";
import C from "@/constants/colors";
import { SH, SUB } from "@/constants/typography";
import { POPULAR_COUNTRIES, EUROPE_COUNTRIES, VISA_TYPES } from "@/constants";
import { todayStr, isSundayStr, isPastDateStr, getAvailableSlots } from "@/utils";
import { Stars } from "@/components/common";
import { Reveal, Label, GoldBtn } from "@/components/ui";

export default function ConsultationForm({ form, setForm, sent, errors, setErrors, submitting, resetForm, handleSubmit }) {
  const inp = (extra = {}) => ({
    padding: "13px 16px", borderRadius: 10, fontSize: 15, outline: "none",
    fontFamily: "Poppins, sans-serif", width: "100%", ...extra,
  });

  const clearField = (key) => setErrors((prev) => ({ ...prev, [key]: undefined }));

  const ErrMsg = ({ field }) =>
    errors[field] ? <div style={{ color: "#DC2626", fontSize: 12, marginTop: 4 }}>{errors[field]}</div> : null;

  return (
    <section id="assessment" style={{ padding: "100px 24px", background: `linear-gradient(135deg,${C.gold}18,${C.goldL}08,${C.gold}18)`, position: "relative", overflow: "hidden" }}>
      <Stars count={20} />
      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
          <Label>Get Started</Label>
          <h2 style={{ ...SH, fontSize: 38, fontWeight: 900, color: C.navy, marginBottom: 12 }}>Book Free Consultation</h2>
          <p style={{ ...SUB, color: C.slate, fontSize: 15, fontStyle: "italic" }}>Fill in your details and our experts will contact you within 24 hours.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ background: C.white, borderRadius: 24, padding: 40, boxShadow: `0 20px 60px ${C.gold}22`, border: `1px solid ${C.gold}22` }}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ textAlign: "center", padding: "32px 0" }}>
                  <motion.div animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }} transition={{ duration: 0.8 }} style={{ fontSize: 60, marginBottom: 16 }}>🎉</motion.div>
                  <h3 style={{ ...SH, fontSize: 24, fontWeight: 900, color: C.navy, marginBottom: 10 }}>Consultation Booked!</h3>
                  <p style={{ color: C.slate, fontSize: 15, marginBottom: 24 }}>Our visa expert will contact you within 24 hours.</p>
                  <GoldBtn onClick={resetForm}>Book Another</GoldBtn>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Honeypot */}
                  <input type="text" name="company" value={form.company} tabIndex={-1} autoComplete="off"
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} aria-hidden="true" />

                  {/* Name + Phone */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 6 }} className="g2">
                    {[{ ph: "Full Name *", k: "name", t: "text" }, { ph: "Phone Number *", k: "phone", t: "tel" }].map((f) => (
                      <div key={f.k}>
                        <input placeholder={f.ph} type={f.t} value={form[f.k]}
                          onChange={(e) => { setForm({ ...form, [f.k]: e.target.value }); clearField(f.k); }}
                          style={{ ...inp({ border: `1.5px solid ${errors[f.k] ? "#DC2626" : C.border}` }) }}
                          onFocus={(e) => (e.target.style.borderColor = C.gold)}
                          onBlur={(e) => (e.target.style.borderColor = errors[f.k] ? "#DC2626" : C.border)} />
                        <ErrMsg field={f.k} />
                      </div>
                    ))}
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: 10 }}>
                    <input placeholder="Email Address *" type="email" value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); clearField("email"); }}
                      style={{ ...inp({ border: `1.5px solid ${errors.email ? "#DC2626" : C.border}` }) }}
                      onFocus={(e) => (e.target.style.borderColor = C.gold)}
                      onBlur={(e) => (e.target.style.borderColor = errors.email ? "#DC2626" : C.border)} />
                    <ErrMsg field="email" />
                  </div>

                  {/* Consultation Type */}
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 10 }}>Consultation Type</div>
                    <div style={{ display: "flex", gap: 20 }}>
                      {[{ v: "call", l: "📞 Schedule a Call" }, { v: "visit", l: "📍 Schedule a Visit" }].map((o) => (
                        <label key={o.v} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: C.text }}>
                          <input type="radio" name="consultType" checked={form.consultType === o.v}
                            onChange={() => { setForm({ ...form, consultType: o.v }); clearField("consultType"); }}
                            style={{ accentColor: C.gold, width: 16, height: 16 }} />
                          {o.l}
                        </label>
                      ))}
                    </div>
                    <ErrMsg field="consultType" />
                  </div>

                  {/* Date + Time */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 6 }} className="g2">
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 8 }}>Consultation Date</div>
                      <input type="date" min={todayStr()} value={form.date}
                        onChange={(e) => {
                          const val = e.target.value;
                          const newErrs = { ...errors, date: undefined, time: undefined };
                          if (isPastDateStr(val)) newErrs.date = "Please select today or a future date.";
                          else if (isSundayStr(val)) newErrs.date = "We're closed on Sundays. Please pick another date.";
                          setForm({ ...form, date: val, time: "" });
                          setErrors(newErrs);
                        }}
                        style={{ ...inp({ border: `1.5px solid ${errors.date ? "#DC2626" : C.border}`, fontSize: 14, color: C.text }) }}
                        onFocus={(e) => (e.target.style.borderColor = C.gold)}
                        onBlur={(e) => (e.target.style.borderColor = errors.date ? "#DC2626" : C.border)} />
                      <ErrMsg field="date" />
                      {!errors.date && <div style={{ color: "#94A3B8", fontSize: 11, marginTop: 4 }}>We're open Mon–Sat, 11 AM – 5 PM.</div>}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 8 }}>Consultation Time</div>
                      {(() => {
                        const dateReady = form.date && !isPastDateStr(form.date) && !isSundayStr(form.date);
                        const slots = dateReady ? getAvailableSlots(form.date) : [];
                        const disabled = !dateReady || slots.length === 0;
                        return (
                          <>
                            <select value={form.time} disabled={disabled}
                              onChange={(e) => { setForm({ ...form, time: e.target.value }); clearField("time"); }}
                              style={{ ...inp({ border: `1.5px solid ${errors.time ? "#DC2626" : C.border}`, fontSize: 14, color: form.time ? C.text : "#94A3B8", background: disabled ? "#F1F5F9" : "white", cursor: disabled ? "not-allowed" : "pointer" }) }}>
                              <option value="">{!dateReady ? "Select a date first" : slots.length === 0 ? "No slots left today" : "Select time slot"}</option>
                              {slots.map((t) => <option key={t.label} value={t.label}>{t.label}</option>)}
                            </select>
                            <ErrMsg field="time" />
                            {dateReady && slots.length === 0 && !errors.time && (
                              <div style={{ color: "#DC2626", fontSize: 12, marginTop: 4 }}>No slots available today. Please choose another date.</div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Visa Type */}
                  <div style={{ marginBottom: 18, marginTop: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 10 }}>Visa Type</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="g2">
                      {VISA_TYPES.map((o) => (
                        <label key={o.v} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: C.text }}>
                          <input type="radio" name="visaType" checked={form.visa === o.v}
                            onChange={() => { setForm({ ...form, visa: o.v }); clearField("visa"); }}
                            style={{ accentColor: C.gold, width: 16, height: 16 }} />
                          {o.l}
                        </label>
                      ))}
                    </div>
                    <ErrMsg field="visa" />
                  </div>

                  {/* Countries */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 10 }}>Interested Countries — Popular</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }} className="g2">
                      {POPULAR_COUNTRIES.map((c) => (
                        <label key={c} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: C.text }}>
                          <input type="checkbox" checked={form.countries.includes(c)}
                            onChange={() => { setForm({ ...form, countries: form.countries.includes(c) ? form.countries.filter((x) => x !== c) : [...form.countries, c] }); clearField("countries"); }}
                            style={{ accentColor: C.gold, width: 16, height: 16 }} />
                          {c}
                        </label>
                      ))}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 10 }}>Europe</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }} className="g2">
                      {EUROPE_COUNTRIES.map((c) => (
                        <label key={c} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: C.text }}>
                          <input type="checkbox" checked={form.countries.includes(c)}
                            onChange={() => { setForm({ ...form, countries: form.countries.includes(c) ? form.countries.filter((x) => x !== c) : [...form.countries, c] }); clearField("countries"); }}
                            style={{ accentColor: C.gold, width: 16, height: 16 }} />
                          {c}
                        </label>
                      ))}
                    </div>
                    <input placeholder="Other country (optional)" value={form.otherCountry}
                      onChange={(e) => { setForm({ ...form, otherCountry: e.target.value }); clearField("countries"); }}
                      style={{ ...inp({ border: `1.5px solid ${C.border}`, fontSize: 14 }) }}
                      onFocus={(e) => (e.target.style.borderColor = C.gold)}
                      onBlur={(e) => (e.target.style.borderColor = C.border)} />
                    <ErrMsg field="countries" />
                  </div>

                  <GoldBtn disabled={submitting} style={{ width: "100%", padding: 16, fontSize: 16, borderRadius: 12, marginTop: 4 }} onClick={handleSubmit}>
                    {submitting ? "Sending..." : "✦ Book Free Consultation"}
                  </GoldBtn>
                  <p style={{ fontSize: 12, color: "#94A3B8", textAlign: "center", marginTop: 14 }}>No spam. No hidden charges. 100% free assessment.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
