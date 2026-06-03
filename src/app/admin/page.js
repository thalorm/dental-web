"use client";

import { useState } from "react";

const API_BASE =
    "https://drpooja1-dnhfddauaed0d8b5.centralindia-01.azurewebsites.net/api";

export default function AdminPage() {
    const [adminKey, setAdminKey] = useState("");
    const [savedKey, setSavedKey] = useState("");
    const [appointments, setAppointments] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [activeTab, setActiveTab] = useState("appointments");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function loadData(keyToUse) {
        const key = keyToUse || savedKey || adminKey;

        if (!key) {
            setMessage("Please enter admin key.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const [appointmentsRes, questionsRes] = await Promise.all([
                fetch(`${API_BASE}/dashboard/appointments`, {
                    headers: {
                        "x-admin-key": key,
                    },
                }),
                fetch(`${API_BASE}/dashboard/questions`, {
                    headers: {
                        "x-admin-key": key,
                    },
                }),
            ]);

            const appointmentsData = await appointmentsRes.json();
            const questionsData = await questionsRes.json();

            if (!appointmentsRes.ok) {
                throw new Error(appointmentsData.message || "Failed to load appointments.");
            }

            if (!questionsRes.ok) {
                throw new Error(questionsData.message || "Failed to load questions.");
            }

            setAppointments(appointmentsData.data || []);
            setQuestions(questionsData.data || []);
            setSavedKey(key);
            setMessage("Data loaded successfully.");
        } catch (error) {
            setMessage(error.message || "Failed to load admin data.");
        } finally {
            setLoading(false);
        }
    }

    function handleLogin(e) {
        e.preventDefault();
        loadData(adminKey);
    }

    function formatDate(value) {
        if (!value) return "-";

        try {
            return new Date(value).toLocaleString();
        } catch {
            return value;
        }
    }

    return (
        <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 rounded-2xl bg-white p-6 shadow">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                            <p className="mt-2 text-slate-600">
                                View appointment requests and customer questions from the website.
                            </p>
                        </div>

                        {savedKey && (
                            <button
                                onClick={() => loadData(savedKey)}
                                disabled={loading}
                                className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
                            >
                                {loading ? "Refreshing..." : "Refresh Data"}
                            </button>
                        )}
                    </div>
                </div>

                {!savedKey && (
                    <form
                        onSubmit={handleLogin}
                        className="mb-8 rounded-2xl bg-white p-6 shadow"
                    >
                        <label className="block text-sm font-medium text-slate-700">
                            Admin Key
                        </label>

                        <div className="mt-2 flex flex-col gap-3 md:flex-row">
                            <input
                                type="password"
                                value={adminKey}
                                onChange={(e) => setAdminKey(e.target.value)}
                                placeholder="Enter your admin key"
                                className="w-full rounded-lg border border-slate-300 p-3"
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
                            >
                                {loading ? "Loading..." : "Open Dashboard"}
                            </button>
                        </div>
                    </form>
                )}

                {message && (
                    <div className="mb-6 rounded-lg bg-white p-4 text-sm shadow">
                        {message}
                    </div>
                )}

                {savedKey && (
                    <>
                        <div className="mb-6 grid gap-4 md:grid-cols-3">
                            <div className="rounded-2xl bg-white p-6 shadow">
                                <p className="text-sm text-slate-500">Appointment Requests</p>
                                <p className="mt-2 text-3xl font-bold">{appointments.length}</p>
                            </div>

                            <div className="rounded-2xl bg-white p-6 shadow">
                                <p className="text-sm text-slate-500">Questions</p>
                                <p className="mt-2 text-3xl font-bold">{questions.length}</p>
                            </div>

                            <div className="rounded-2xl bg-white p-6 shadow">
                                <p className="text-sm text-slate-500">Total Leads</p>
                                <p className="mt-2 text-3xl font-bold">
                                    {appointments.length + questions.length}
                                </p>
                            </div>
                        </div>

                        <div className="mb-6 flex gap-3">
                            <button
                                onClick={() => setActiveTab("appointments")}
                                className={`rounded-lg px-5 py-3 font-semibold ${activeTab === "appointments"
                                    ? "bg-blue-700 text-white"
                                    : "bg-white text-slate-700"
                                    }`}
                            >
                                Appointments
                            </button>

                            <button
                                onClick={() => setActiveTab("questions")}
                                className={`rounded-lg px-5 py-3 font-semibold ${activeTab === "questions"
                                    ? "bg-blue-700 text-white"
                                    : "bg-white text-slate-700"
                                    }`}
                            >
                                Questions
                            </button>
                        </div>

                        {activeTab === "appointments" && (
                            <section className="rounded-2xl bg-white p-6 shadow">
                                <h2 className="mb-4 text-xl font-bold">Appointment Requests</h2>

                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
                                        <thead>
                                            <tr className="border-b bg-slate-50">
                                                <th className="p-3">ID</th>
                                                <th className="p-3">Name</th>
                                                <th className="p-3">Phone</th>
                                                <th className="p-3">Email</th>
                                                <th className="p-3">Service</th>
                                                <th className="p-3">Preferred Date</th>
                                                <th className="p-3">Preferred Time</th>
                                                <th className="p-3">Status</th>
                                                <th className="p-3">Created</th>
                                                <th className="p-3">Message</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {appointments.map((item) => (
                                                <tr key={item.Id} className="border-b align-top">
                                                    <td className="p-3">{item.Id}</td>
                                                    <td className="p-3 font-medium">{item.FullName}</td>
                                                    <td className="p-3">{item.Phone || "-"}</td>
                                                    <td className="p-3">{item.Email || "-"}</td>
                                                    <td className="p-3">{item.ServiceRequested || "-"}</td>
                                                    <td className="p-3">{item.PreferredDate || "-"}</td>
                                                    <td className="p-3">{item.PreferredTime || "-"}</td>
                                                    <td className="p-3">
                                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                                            {item.Status || "New"}
                                                        </span>
                                                    </td>
                                                    <td className="p-3">{formatDate(item.CreatedAt)}</td>
                                                    <td className="max-w-xs p-3">{item.Message || "-"}</td>
                                                </tr>
                                            ))}

                                            {appointments.length === 0 && (
                                                <tr>
                                                    <td colSpan="10" className="p-6 text-center text-slate-500">
                                                        No appointment requests found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        )}

                        {activeTab === "questions" && (
                            <section className="rounded-2xl bg-white p-6 shadow">
                                <h2 className="mb-4 text-xl font-bold">Questions</h2>

                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                                        <thead>
                                            <tr className="border-b bg-slate-50">
                                                <th className="p-3">ID</th>
                                                <th className="p-3">Name</th>
                                                <th className="p-3">Phone</th>
                                                <th className="p-3">Email</th>
                                                <th className="p-3">Preferred Contact</th>
                                                <th className="p-3">Status</th>
                                                <th className="p-3">Created</th>
                                                <th className="p-3">Question</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {questions.map((item) => (
                                                <tr key={item.Id} className="border-b align-top">
                                                    <td className="p-3">{item.Id}</td>
                                                    <td className="p-3 font-medium">{item.FullName}</td>
                                                    <td className="p-3">{item.Phone || "-"}</td>
                                                    <td className="p-3">{item.Email || "-"}</td>
                                                    <td className="p-3">
                                                        {item.PreferredContactMethod || "-"}
                                                    </td>
                                                    <td className="p-3">
                                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                                            {item.Status || "New"}
                                                        </span>
                                                    </td>
                                                    <td className="p-3">{formatDate(item.CreatedAt)}</td>
                                                    <td className="max-w-md p-3">{item.Question || "-"}</td>
                                                </tr>
                                            ))}

                                            {questions.length === 0 && (
                                                <tr>
                                                    <td colSpan="8" className="p-6 text-center text-slate-500">
                                                        No questions found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}