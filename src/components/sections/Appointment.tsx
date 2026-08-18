"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { treatments, dentists, anyDentist } from "@/data/appointment";
import {
  getAppointmentAvailability,
  submitAppointment,
} from "@/lib/appointment";
import type {
  AppointmentAvailability,
  AppointmentDentist,
  TreatmentId,
} from "@/types/appointment";
import PageContainer from "@/components/ui/PageContainer";

const STEP_LABELS = ["CARE", "DATE & TIME", "DENTIST", "DETAILS", "CONFIRM"];
const ease = [0.22, 1, 0.36, 1] as const;

export default function Appointment() {
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const [treatment, setTreatment] = useState<TreatmentId | null>(null);
  const [availability, setAvailability] = useState<AppointmentAvailability[]>(
    [],
  );
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [dentistId, setDentistId] = useState<string | null>(null);

  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isNewPatient, setIsNewPatient] = useState(true);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);

  useEffect(() => {
    getAppointmentAvailability().then(setAvailability);
  }, []);

  const selectedDay = useMemo(
    () => availability.find((a) => a.date === date) ?? null,
    [availability, date],
  );

  const recommendedDentists = useMemo(() => {
    if (!treatment) return [anyDentist, ...dentists];
    const matched = dentists.filter((d) => d.specialty.includes(treatment));
    const rest = dentists.filter((d) => !matched.includes(d));
    return [...matched, anyDentist, ...rest];
  }, [treatment]);

  const selectedDentist: AppointmentDentist | null =
    dentistId === "any"
      ? anyDentist
      : (dentists.find((d) => d.id === dentistId) ?? null);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const detailsValid =
    patientName.trim().length > 0 && phone.trim().length > 0 && emailValid;

  const canContinue = [
    !!treatment,
    !!date && !!time,
    !!dentistId,
    detailsValid,
  ];

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const handleContinue = () => {
    if (step === 3) {
      setTouched({ patientName: true, phone: true, email: true });
      if (!detailsValid) return;
    }
    if (step < 4) goTo(step + 1);
  };

  const handleSubmit = async () => {
    if (!treatment || !date || !time || !dentistId) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await submitAppointment({
        treatment,
        date,
        time,
        dentistId,
        patientName,
        phone,
        email,
        message: message || undefined,
        isNewPatient,
      });
      if (res.success && res.appointmentId) {
        setAppointmentId(res.appointmentId);
      } else {
        setSubmitError(res.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const continueLabel = [
    "CHOOSE A TIME",
    "SELECT DENTIST",
    "CONTINUE TO DETAILS",
    "REVIEW APPOINTMENT",
  ][step];

  const variants = {
    enter: (dir: number) =>
      shouldReduceMotion ? {} : { opacity: 0, x: dir > 0 ? 24 : -24 },
    center: { opacity: 1, x: 0 },
    exit: (dir: number) =>
      shouldReduceMotion ? {} : { opacity: 0, x: dir > 0 ? -24 : 24 },
  };

  if (appointmentId) {
    return (
      <section id="appointment" className="bg-ivory border-t border-text/10">
        <PageContainer className="py-20 md:py-28">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease }}
            className="max-w-lg"
            role="status"
            aria-live="polite"
          >
            <span className="eyebrow text-muted block mb-6">
              YOUR VISIT IS BOOKED
            </span>
            <h2 className="display-major text-forest mb-8">
              {selectedDay?.label ?? "Your appointment"}
              <br />
              at {time}
            </h2>
            <p className="text-sm text-forest">
              {selectedDentist?.name}
              {selectedDentist?.role && (
                <span className="block text-muted">{selectedDentist.role}</span>
              )}
            </p>
            <p className="text-sm text-muted mt-6 max-w-xs leading-relaxed">
              A confirmation has been prepared for your email and phone number.
            </p>
            <p className="eyebrow text-muted mt-8">
              BOOKING ID <span className="text-forest">{appointmentId}</span>
            </p>
            <div className="flex flex-wrap gap-6 mt-10">
              <button
                type="button"
                className="eyebrow border-b border-forest text-forest pb-1 hover:opacity-60 transition-opacity"
              >
                ADD TO CALENDAR
              </button>
              <button
                type="button"
                onClick={() => {
                  setAppointmentId(null);
                  setStep(0);
                  setTreatment(null);
                  setDate(null);
                  setTime(null);
                  setDentistId(null);
                  setPatientName("");
                  setPhone("");
                  setEmail("");
                  setMessage("");
                }}
                className="eyebrow border-b border-forest text-forest pb-1 hover:opacity-60 transition-opacity"
              >
                BOOK ANOTHER VISIT
              </button>
            </div>
          </motion.div>
        </PageContainer>
      </section>
    );
  }

  return (
    <section id="appointment" className="bg-ivory border-t border-text/10">
      <PageContainer className="py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
        {/* Left intro */}
        <div className="md:col-span-4">
          <span className="eyebrow text-muted block mb-6">BOOK YOUR VISIT</span>
          <h2 className="display-major text-forest mb-6">
            Ready when
            <br />
            you are.
          </h2>
          <p className="text-sm text-muted max-w-xs leading-relaxed">
            Tell us what you need and we&apos;ll help find the right time for
            you.
          </p>
          <p className="text-xs text-muted mt-4">
            Appointments typically take 30–60 minutes.
          </p>
        </div>

        {/* Right: booking interface */}
        <div className="md:col-span-8 border border-text/10 p-6 md:p-10">
          {/* Step indicator */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-2 md:hidden">
            <span className="eyebrow text-muted">
              {String(step + 1).padStart(2, "0")} / 05
            </span>
            <span className="eyebrow text-forest">{STEP_LABELS[step]}</span>
          </div>

          <div
            role="tablist"
            aria-label="Booking steps"
            className="hidden md:flex flex-wrap gap-x-8 gap-y-2 mb-10 pb-6 border-b border-text/10"
          >
            {STEP_LABELS.map((label, i) => (
              <span
                key={label}
                role="tab"
                aria-selected={step === i}
                className={`eyebrow relative pb-1 transition-opacity ${
                  i === step ? "text-forest opacity-100" : "opacity-40"
                }`}
              >
                {String(i + 1).padStart(2, "0")} {label}
                {i === step && (
                  <motion.span
                    layoutId="appointment-step-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-px bg-forest"
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.35,
                      ease,
                    }}
                  />
                )}
              </span>
            ))}
          </div>

          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease }}
              >
                {/* STEP 0 — TREATMENT */}
                {step === 0 && (
                  <ul>
                    {treatments.map((t) => (
                      <li
                        key={t.id}
                        className="border-t border-text/10 last:border-b"
                      >
                        <button
                          type="button"
                          aria-pressed={treatment === t.id}
                          onClick={() => setTreatment(t.id)}
                          className={`w-full flex items-center justify-between gap-4 py-4 text-left group transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage ${
                            treatment === t.id
                              ? "text-forest"
                              : "text-forest/70 hover:text-forest"
                          }`}
                        >
                          <span className="flex items-baseline gap-4">
                            <span className="eyebrow text-muted">
                              {t.number}
                            </span>
                            <span>
                              <span className="block text-base">{t.name}</span>
                              <span className="block text-xs text-muted mt-1">
                                {t.description}
                              </span>
                            </span>
                          </span>
                          <span
                            aria-hidden="true"
                            className={`flex items-center justify-center w-6 h-6 border transition-all ${
                              treatment === t.id
                                ? "bg-forest border-forest text-ivory"
                                : "border-text/20 text-transparent group-hover:translate-x-1"
                            }`}
                          >
                            {treatment === t.id ? "✓" : "→"}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* STEP 1 — DATE & TIME */}
                {step === 1 && (
                  <div>
                    <div className="flex gap-3 overflow-x-auto pb-3 -mx-1 px-1">
                      {availability.map((day) => (
                        <button
                          key={day.date}
                          type="button"
                          aria-pressed={date === day.date}
                          onClick={() => {
                            setDate(day.date);
                            setTime(null);
                          }}
                          className={`shrink-0 flex flex-col items-center gap-1 px-4 py-3 border text-xs tracking-widest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage ${
                            date === day.date
                              ? "bg-forest text-ivory border-forest"
                              : "border-text/15 text-forest/70 hover:border-forest"
                          }`}
                        >
                          {day.label}
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {selectedDay && (
                        <motion.div
                          key={selectedDay.date}
                          initial={
                            shouldReduceMotion ? false : { opacity: 0, y: 8 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          exit={shouldReduceMotion ? {} : { opacity: 0 }}
                          transition={{
                            duration: shouldReduceMotion ? 0 : 0.3,
                          }}
                          className="flex flex-wrap gap-2 mt-6"
                        >
                          {[
                            "09:00",
                            "09:30",
                            "10:30",
                            "11:00",
                            "13:00",
                            "13:30",
                            "14:30",
                            "15:00",
                            "16:00",
                            "17:00",
                          ].map((slot) => {
                            const isAvailable =
                              selectedDay.slots.includes(slot);
                            return (
                              <button
                                key={slot}
                                type="button"
                                disabled={!isAvailable}
                                aria-pressed={time === slot}
                                onClick={() => setTime(slot)}
                                className={`px-4 py-2 text-xs tracking-widest border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage ${
                                  !isAvailable
                                    ? "border-text/5 text-muted/40 cursor-not-allowed line-through"
                                    : time === slot
                                      ? "bg-forest text-ivory border-forest"
                                      : "border-text/15 text-forest/70 hover:border-forest"
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* STEP 2 — DENTIST */}
                {step === 2 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {recommendedDentists.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        aria-pressed={dentistId === d.id}
                        onClick={() => setDentistId(d.id)}
                        className={`flex items-center gap-4 p-3 border text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage ${
                          dentistId === d.id
                            ? "border-forest bg-forest/5"
                            : "border-text/15 hover:border-forest/50"
                        }`}
                      >
                        {d.image ? (
                          <div className="relative w-14 h-14 shrink-0 overflow-hidden">
                            <Image
                              src={d.image}
                              alt={d.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14 shrink-0 border border-text/15 flex items-center justify-center text-xs text-muted">
                            ANY
                          </div>
                        )}
                        <div>
                          <p className="font-serif text-base text-forest">
                            {d.name}
                          </p>
                          <p className="text-xs text-muted">{d.role}</p>
                          {d.availability !== "available" && (
                            <span className="eyebrow text-sage mt-1 block">
                              {d.availability.toUpperCase()}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* STEP 3 — DETAILS */}
                {step === 3 && (
                  <div className="grid grid-cols-1 gap-6 max-w-md">
                    <div>
                      <label
                        htmlFor="patientName"
                        className="eyebrow text-muted block mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        id="patientName"
                        type="text"
                        autoComplete="name"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, patientName: true }))
                        }
                        aria-invalid={
                          touched.patientName && !patientName.trim()
                        }
                        className="w-full border-b border-text/20 focus:border-forest bg-transparent py-2 text-sm outline-none transition-colors"
                      />
                      {touched.patientName && !patientName.trim() && (
                        <p role="alert" className="text-xs text-red-700 mt-1">
                          Full name is required.
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="eyebrow text-muted block mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, phone: true }))
                        }
                        aria-invalid={touched.phone && !phone.trim()}
                        className="w-full border-b border-text/20 focus:border-forest bg-transparent py-2 text-sm outline-none transition-colors"
                      />
                      {touched.phone && !phone.trim() && (
                        <p role="alert" className="text-xs text-red-700 mt-1">
                          Phone number is required.
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="eyebrow text-muted block mb-2"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, email: true }))
                        }
                        aria-invalid={touched.email && !emailValid}
                        className="w-full border-b border-text/20 focus:border-forest bg-transparent py-2 text-sm outline-none transition-colors"
                      />
                      {touched.email && !emailValid && (
                        <p role="alert" className="text-xs text-red-700 mt-1">
                          Enter a valid email address.
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="eyebrow text-muted block mb-2"
                      >
                        Message (optional)
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full border-b border-text/20 focus:border-forest bg-transparent py-2 text-sm outline-none transition-colors resize-none"
                      />
                    </div>

                    <div className="flex gap-6">
                      {(["new", "returning"] as const).map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-2 text-sm text-forest cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="patientType"
                            checked={isNewPatient === (type === "new")}
                            onChange={() => setIsNewPatient(type === "new")}
                            className="accent-forest"
                          />
                          {type === "new" ? "New patient" : "Returning patient"}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4 — CONFIRM */}
                {step === 4 && (
                  <div className="max-w-md">
                    <span className="eyebrow text-muted block mb-6">
                      YOUR VISIT
                    </span>
                    <p className="font-serif text-2xl text-forest mb-6">
                      {treatments.find((t) => t.id === treatment)?.name}
                    </p>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
                      <dt className="eyebrow text-muted">When</dt>
                      <dd className="text-forest">
                        {selectedDay?.label} at {time}
                      </dd>
                      <dt className="eyebrow text-muted">Dentist</dt>
                      <dd className="text-forest">{selectedDentist?.name}</dd>
                      <dt className="eyebrow text-muted">Patient</dt>
                      <dd className="text-forest">{patientName}</dd>
                      <dt className="eyebrow text-muted">Phone</dt>
                      <dd className="text-forest">{phone}</dd>
                      <dt className="eyebrow text-muted">Email</dt>
                      <dd className="text-forest">{email}</dd>
                    </dl>
                    {submitError && (
                      <p role="alert" className="text-xs text-red-700 mt-4">
                        {submitError}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t border-text/10">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => goTo(step - 1)}
              className="eyebrow text-muted disabled:opacity-0 hover:text-forest transition-colors min-h-[44px]"
            >
              ← BACK
            </button>

            {step < 4 ? (
              <button
                type="button"
                disabled={!canContinue[step]}
                onClick={handleContinue}
                className="eyebrow border-b border-forest text-forest pb-1 disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-60 transition-opacity min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
              >
                {continueLabel} →
              </button>
            ) : (
              <button
                type="button"
                disabled={submitting}
                onClick={handleSubmit}
                className="eyebrow border-b border-forest text-forest pb-1 disabled:opacity-50 hover:opacity-60 transition-opacity min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
              >
                {submitting ? "BOOKING…" : "CONFIRM APPOINTMENT →"}
              </button>
            )}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
