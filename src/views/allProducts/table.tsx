import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/graphql/generated/graphql";
import { DataTableColumnHeader } from "./table-sort";
import Link from "next/link";
import Image from "next/image";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "images",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Images" />
    ),
    cell: ({ row }) => {
      const id = row.original._id;
      const images = row.original.images;
      const firstImage = images[0]; // Use the first image in the array

      return (
        <div className="flex space-x-2 max-w-[450px]">
          <div className="max-w-32 max-h-32 h-auto rounded-lg overflow-hidden">
            <Link href={`/products/${id}`}>
              <Image
                src={firstImage}
                alt="table-image"
                width="900"
                height="600"
                quality="100"
                className="bg-slate-500"
              />
            </Link>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: (info) => {
      const row = info.row.original;
      const id = row._id;
      return (
        <div className="flex space-x-2 max-w-[450px]">
          <div>
            <Link href={`/products/${id}`}>
              <span className="max-w-[250px]  font-medium">
                {info.getValue() as string}
              </span>
            </Link>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
  },
];
