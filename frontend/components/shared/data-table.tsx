/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchKey?: keyof T;
  pageSize?: number;
  loading?: boolean;
  emptyLabel?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  searchKey,
  pageSize = 8,
  loading,
  emptyLabel = "No records found",
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!searchKey || !search) return data;
    const term = search.toLowerCase();
    return data.filter((row) => {
      const value = String(row[searchKey] ?? "").toLowerCase();
      return value.includes(term);
    });
  }, [data, search, searchKey]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  React.useEffect(() => {
    setPage(1);
  }, [search, data.length]);

  return (
    <div className="space-y-3">
      {searchKey && (
        <div className="flex items-center justify-between gap-3">
          <Input
            placeholder="Search..."
            className="h-8 max-w-xs text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            {filtered.length} records
          </p>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={String(col.key)}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="py-8 text-center text-xs text-zinc-500"
              >
                Loading...
              </TableCell>
            </TableRow>
          ) : pageRows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="py-8 text-center text-xs text-zinc-500"
              >
                {emptyLabel}
              </TableCell>
            </TableRow>
          ) : (
            pageRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => (
                  <TableCell key={String(col.key)}>
                    {col.render
                      ? col.render(row)
                      : String(row[col.key as keyof T] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
        <span>
          Page {currentPage} of {pageCount}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            disabled={currentPage === pageCount}
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

