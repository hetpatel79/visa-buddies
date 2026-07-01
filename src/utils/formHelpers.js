// ── Office hours: Mon–Sat, 11 AM – 5 PM ──────────────────────────
export const TIME_SLOTS = [
  { label: "11:00 AM - 12:00 PM", start: 11, end: 12 },
  { label: "12:00 PM - 1:00 PM",  start: 12, end: 13 },
  { label: "1:00 PM - 2:00 PM",   start: 13, end: 14 },
  { label: "2:00 PM - 3:00 PM",   start: 14, end: 15 },
  { label: "3:00 PM - 4:00 PM",   start: 15, end: 16 },
  { label: "4:00 PM - 5:00 PM",   start: 16, end: 17 },
];

export function todayStr() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split("T")[0];
}

export function isSundayStr(dateStr) {
  if (!dateStr) return false;
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).getDay() === 0;
}

export function isPastDateStr(dateStr) {
  if (!dateStr) return false;
  return dateStr < todayStr();
}

/** Returns slots still open for the given date.
 *  Future date → all slots. Today → only slots whose start hour is still ahead. */
export function getAvailableSlots(dateStr) {
  if (!dateStr) return [];
  if (dateStr !== todayStr()) return TIME_SLOTS;
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  return TIME_SLOTS.filter((s) => s.start > currentHour);
}

// ── Regex rules ───────────────────────────────────────────────────
const NAME_RE  = /^[A-Za-z\s.'-]{3,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[6-9]\d{9}$/; // 10-digit Indian mobile

export function validateConsultationForm(form) {
  const errs = {};

  if (!form.name.trim())                      errs.name        = "Name is required.";
  else if (!NAME_RE.test(form.name.trim()))   errs.name        = "Enter a valid name (min 3 letters, no numbers).";

  if (!form.phone.trim())                     errs.phone       = "Phone number is required.";
  else if (!PHONE_RE.test(form.phone.trim())) errs.phone       = "Enter a valid 10-digit Indian mobile number.";

  if (!form.email.trim())                     errs.email       = "Email is required.";
  else if (!EMAIL_RE.test(form.email.trim())) errs.email       = "Enter a valid email address.";

  if (!form.consultType)                      errs.consultType = "Please select a consultation type.";

  if (!form.visa)                             errs.visa        = "Please select a visa type.";

  const hasCountry = (form.countries && form.countries.length > 0) || (form.otherCountry && form.otherCountry.trim());
  if (!hasCountry)                            errs.countries   = "Select at least one country of interest.";

  if (!form.date)                             errs.date        = "Please select a consultation date.";
  else if (isPastDateStr(form.date))          errs.date        = "Please select today or a future date.";
  else if (isSundayStr(form.date))            errs.date        = "We're closed on Sundays. Please pick another date.";

  if (!form.time)                             errs.time        = "Please select a time slot.";
  else if (form.date && getAvailableSlots(form.date).every((s) => s.label !== form.time))
                                              errs.time        = "That slot is no longer available. Please pick another.";

  return errs;
}

export const EMPTY_FORM = {
  name: "", phone: "", email: "", visa: "", msg: "",
  consultType: "call", date: "", time: "",
  countries: [], otherCountry: "", company: "",
};
