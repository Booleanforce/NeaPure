"use client";

export default function InstallationHeader() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Installation Requests
        </h1>

        <p className="mt-1 max-w-2xl text-sm text-slate-500">
          Manage, approve, schedule and assign installation requests.
        </p>
      </div>
    </div>
  );
}