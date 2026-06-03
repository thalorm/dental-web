import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-3xl bg-white p-10 shadow">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Local Dental Care
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Modern dental care for healthy, confident smiles.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            Book an appointment, ask a question, or learn more about our dental
            services. Our team will contact you to confirm your request.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/book-appointment"
              className="rounded-lg bg-blue-700 px-6 py-3 text-center font-semibold text-white hover:bg-blue-800"
            >
              Book Appointment
            </Link>

            <Link
              href="/ask-question"
              className="rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold text-slate-800 hover:bg-slate-100"
            >
              Ask a Question
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-semibold text-slate-900">
              General Dentistry
            </h2>
            <p className="mt-3 text-slate-600">
              Cleanings, exams, fillings, and preventive care for the whole
              family.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-semibold text-slate-900">
              Cosmetic Dentistry
            </h2>
            <p className="mt-3 text-slate-600">
              Whitening and smile-focused treatments to help you feel confident.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-semibold text-slate-900">
              Emergency Care
            </h2>
            <p className="mt-3 text-slate-600">
              For urgent dental concerns, call the clinic directly for faster
              help.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}