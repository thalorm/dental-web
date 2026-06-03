"use client";

import { useState } from "react";

const API_URL =
  "https://drpooja1-dnhfddauaed0d8b5.centralindia-01.azurewebsites.net/api/appointmentrequest";

export default function BookAppointmentPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    serviceRequested: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus("Appointment request submitted successfully.");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        preferredDate: "",
        preferredTime: "",
        serviceRequested: "",
        message: "",
      });
    } catch (error) {
      setStatus(error.message || "Failed to submit request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-slate-900">
          Book an Appointment
        </h1>
        <p className="mt-3 text-slate-600">
          Submit your preferred appointment details and our clinic will contact
          you to confirm availability.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Full Name *
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-300 p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Phone *
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-300 p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-300 p-3"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Preferred Date
              </label>
              <input
                name="preferredDate"
                type="date"
                value={form.preferredDate}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-slate-300 p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Preferred Time
              </label>
              <input
                name="preferredTime"
                value={form.preferredTime}
                onChange={handleChange}
                placeholder="10:00 AM"
                className="mt-1 w-full rounded-lg border border-slate-300 p-3"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Service Requested
            </label>
            <select
              name="serviceRequested"
              value={form.serviceRequested}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-300 p-3"
            >
              <option value="">Select a service</option>
              <option value="Dental Cleaning">Dental Cleaning</option>
              <option value="Teeth Whitening">Teeth Whitening</option>
              <option value="Dental Filling">Dental Filling</option>
              <option value="Root Canal">Root Canal</option>
              <option value="Emergency Dental Care">
                Emergency Dental Care
              </option>
              <option value="General Consultation">
                General Consultation
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              placeholder="Please do not include sensitive medical information."
              className="mt-1 w-full rounded-lg border border-slate-300 p-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Appointment Request"}
          </button>

          {status && (
            <p className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700">
              {status}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}