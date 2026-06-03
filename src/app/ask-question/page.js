"use client";

import { useState } from "react";

const API_URL =
    "https://drpooja1-dnhfddauaed0d8b5.centralindia-01.azurewebsites.net/api/question";

export default function AskQuestionPage() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        question: "",
        preferredContactMethod: "",
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

            setStatus("Your question was submitted successfully.");
            setForm({
                fullName: "",
                email: "",
                phone: "",
                question: "",
                preferredContactMethod: "",
            });
        } catch (error) {
            setStatus(error.message || "Failed to submit question.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-12">
            <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
                <h1 className="text-3xl font-bold text-slate-900">Ask a Question</h1>
                <p className="mt-3 text-slate-600">
                    Have a question about appointments, services, insurance, or clinic
                    hours? Send it here and our team will get back to you.
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
                            Phone
                        </label>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
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

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Preferred Contact Method
                        </label>
                        <select
                            name="preferredContactMethod"
                            value={form.preferredContactMethod}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-slate-300 p-3"
                        >
                            <option value="">Select contact method</option>
                            <option value="Phone">Phone</option>
                            <option value="Email">Email</option>
                            <option value="Text Message">Text Message</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Question *
                        </label>
                        <textarea
                            name="question"
                            value={form.question}
                            onChange={handleChange}
                            required
                            rows="5"
                            placeholder="Please do not include sensitive medical information."
                            className="mt-1 w-full rounded-lg border border-slate-300 p-3"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
                    >
                        {loading ? "Submitting..." : "Submit Question"}
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