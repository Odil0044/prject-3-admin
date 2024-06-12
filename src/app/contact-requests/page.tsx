"use client";

import axios from "axios";
import { ContactType, getColumns } from "./columns";
import { DataTable } from "./data-table";
import { ThemeToggle } from "@/components/theme-toggle";
import { useQuery } from "react-query";
import { headers } from "next/headers";

async function getData(): Promise<ContactType[]> {
  // Fetch data from your API here.
  if (!process.env.NEXT_PUBLIC_API_URL) {
    return [];
  }
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_URL);

    return res.data.results;
  } catch (error) {
    return [];
  }
}

export default function ContractRequests() {
  // const data = await getData();
  const { data, isLoading, refetch } = useQuery("contacts", getData);

  return (
    <div className="container mx-auto py-10">
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p>Loading...</p>
        </div>
      ) : (
        <DataTable columns={getColumns(refetch)} data={data || []} />
      )}
    </div>
  );
}
