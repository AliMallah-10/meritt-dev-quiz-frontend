import React, { useState } from "react";
import {
  ProductSearchFields,
  Sorting,
  useGetAllProductQuery,
} from "@/graphql/generated/graphql";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Loading from "@/components/contents/loading";
import Link from "next/link";
import { GlobalPagination } from "@/components/contents/GlobalPagination";
import { columns } from "./table"; // Import your columns definition
import { DataTableViewOptions } from "./table-view-options";
import { useSearchParams } from "next/navigation";

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const params = useSearchParams();
  const page = params.get("page");
  const limit = params.get("limit");

  const { data, loading, error } = useGetAllProductQuery({
    variables: {
      limit: limit ? limit : 50,
      page: page ? page : 1,
      sort: {
        field: ProductSearchFields.Title,
        order: Sorting.Asc,
      },
      searchFields: {
        fields: [ProductSearchFields.Title], // Fields to search in
        q: searchQuery, // Pass the search query here
      },
    },
  });

  const table = useReactTable({
    data: data?.getAllProduct?.items || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Debounced search handler using setTimeout
  const handleSearch = (value: string) => {
    // Clear the previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    const newTimeoutId = setTimeout(() => {
      setSearchQuery(value);
    }, 500); // 3000ms delay

    // Save the timeout ID
    setTimeoutId(newTimeoutId);
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-7xl mx-auto py-4 px-2">
      <div className="text-2xl font-bold mb-4">
        <Button asChild>
          <Link href="/">Go Back</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">All Products</h2>
        </CardHeader>
        <CardContent>
          <div className="py-2 flex justify-between items-center">
            <Input
              placeholder="Filter Products..."
              defaultValue={searchQuery}
              onChange={(event) => handleSearch(event.target.value)}
              className="h-8 w-[150px] lg:w-[250px]"
            />
            <DataTableViewOptions table={table} />
          </div>

          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <GlobalPagination table={table} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductsPage;
