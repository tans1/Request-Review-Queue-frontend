import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6">
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
              RR
            </div>
            <div>
              <h1 className="text-lg font-semibold">Request Review Queue</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={"/auth/login"}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
              Login
            </Link>

            <Link
              to={"/auth/register"}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
              Register
            </Link>
          </div>
        </header>

        <section className="flex flex-1 items-center">
          <div className="grid w-full gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                Review Tool
              </div>

              <h2 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Review incoming requts simply
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Track request status, assign owners, add notes, and keep history
                tracked
              </p>

              <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">Track</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">Review</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">Audit</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Review Dashboard
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Total</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      128
                    </p>
                  </div>
                  <div className="rounded-2xl bg-amber-50 p-4">
                    <p className="text-sm text-amber-700">Due Soon</p>
                    <p className="mt-2 text-2xl font-semibold text-amber-900">
                      14
                    </p>
                  </div>
                  <div className="rounded-2xl bg-red-50 p-4">
                    <p className="text-sm text-red-700">Overdue</p>
                    <p className="mt-2 text-2xl font-semibold text-red-900">
                      5
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    {
                      title: "Request-1",
                      status: "IN_REVIEW",
                      owner: "Meron",
                      tone: "blue",
                    },
                    {
                      title: "Request-2",
                      status: "NEW",
                      owner: "Unassigned",
                      tone: "slate",
                    },
                    {
                      title: "Request-3",
                      status: "NEEDS_INFO",
                      owner: "Samuel",
                      tone: "amber",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                      <div>
                        <p className="font-medium text-slate-900">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Owner: {item.owner}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.tone === "blue"
                            ? "bg-blue-50 text-blue-700"
                            : item.tone === "amber"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-slate-100 text-slate-700"
                        }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
