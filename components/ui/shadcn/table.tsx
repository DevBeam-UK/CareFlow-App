"use client"

import * as React from "react"

import {
  type TableVariants,
  tableVariants,
} from "variants"
import { cn } from "lib"

type TableVariant = NonNullable<TableVariants["variant"]>

const TableVariantContext = React.createContext<TableVariant>("data")

function useTableVariant() {
  return React.useContext(TableVariantContext)
}

function Table({
  className,
  variant = "data",
  ...props
}: React.ComponentProps<"table"> & {
  variant?: TableVariant
}) {
  return (
    <TableVariantContext.Provider value={variant}>
      <div
        data-slot="table-container"
        data-table-variant={variant}
        className={cn(
          "relative w-full overflow-x-auto",
          variant === "data" && "rounded-[10px] ring-1 ring-border"
        )}
      >
        <table
          data-slot="table"
          className={cn(tableVariants({ variant }), className)}
          {...props}
        />
      </div>
    </TableVariantContext.Provider>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  const v = useTableVariant()
  return (
    <thead
      data-slot="table-header"
      className={cn(
        v === "minimal" && "[&_tr]:border-b",
        v === "data" &&
          "[&_tr]:border-0 [&_th:first-child]:rounded-tl-[10px] [&_th:last-child]:rounded-tr-[10px]",
        className
      )}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  const v = useTableVariant()
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        v === "minimal" && "[&_tr:last-child]:border-0",
        v === "data" && "[&_tr:last-child_td]:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  const v = useTableVariant()
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        v === "minimal" &&
          "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        v === "data" &&
          "border-t border-border bg-muted/40 font-semibold [&_td]:px-4 [&_td]:py-3",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  const v = useTableVariant()
  return (
    <tr
      data-slot="table-row"
      className={cn(
        v === "minimal" &&
          "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        v === "data" &&
          "border-0 transition-colors hover:[&>td]:bg-muted/40 has-aria-expanded:[&>td]:bg-muted/40 data-[state=selected]:[&>td]:bg-muted/50",
        className
      )}
      {...props}
    />
  )
}

function TableHead({
  className,
  scope = "col",
  ...props
}: React.ComponentProps<"th">) {
  const v = useTableVariant()
  return (
    <th
      data-slot="table-head"
      scope={scope}
      className={cn(
        v === "minimal" &&
          "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
        v === "data" &&
          "h-auto bg-muted px-4 py-3 text-left align-middle text-[11px] font-bold tracking-[0.06em] whitespace-nowrap text-muted-foreground uppercase border-b border-border [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  const v = useTableVariant()
  return (
    <td
      data-slot="table-cell"
      className={cn(
        v === "minimal" &&
          "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        v === "data" &&
          "border-b border-border/50 px-4 py-3.5 align-middle text-[13px] text-foreground/90 [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        "caption-top mb-2 text-left text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  tableVariants,
}
export type { TableVariants }
