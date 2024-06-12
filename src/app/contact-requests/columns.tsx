"use client";

import { ColumnDef } from "@tanstack/react-table";
import DeleteBtn from "@/components/DeleteBtn";
import SeeMore from "@/components/SeeMore";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ContactType = {
  id: number;
  title: string;
  mail: string;
  contact: string;
  short_description: string;
  long_description: string;
  img_url?: string;
};

export const getColumns: (refetch: any) => ColumnDef<ContactType>[] = (
  refetch
) => [
  // {
  //   accessorKey: "id",
  //   header: "ID",
  // },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "mail",
    header: "Email",
  },
  {
    accessorKey: "short_description",
    header: "Short Description",
  },
  // {
  //   accessorKey: "long_description",
  //   header: "Long description",
  // },
  {
    accessorKey: "img_url",
    header: "Image",
    cell: ({ row }) => (
      <img
        src={
          row.getValue("img_url") ||
          `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2BNGImiFNXoEc3ONE3biDks4T4Y9JkCJCMA&s`
        }
        onError={(e) => {
          if (
            e.currentTarget.src ===
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2BNGImiFNXoEc3ONE3biDks4T4Y9JkCJCMA&s"
          ) {
            e.currentTarget.onerror = null;
          }
          e.currentTarget.src =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2BNGImiFNXoEc3ONE3biDks4T4Y9JkCJCMA&s";
        }}
        alt="item"
        className="w-16 h-16"
      />
    ),
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row, cell }) => {
      console.log(cell.row.original);

      return (
        <div style={{display:"flex",gap:10}} >
          <SeeMore data={cell.row.original}/>
          <DeleteBtn id={row.getValue("id")} refetch={refetch} />
        </div>
      );
    },
  },
];
