"use client";

import { useState } from "react";
import CustomerHeader from "./CustomerHeader";
import CustomerSearch from "./CustomerSearch";
    


export default function CustomerList() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    return (
    <div className="space-y-6">

        <CustomerHeader />

      <CustomerSearch
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <table className="w-full">

            {/* existing table */}

        </table>

        </div>

    </div>
    );
}