import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { Loader2Icon } from "lucide-react"
import * as React from "react"
import type { VariantProps } from "tailwind-variants"

import { buttonVariants } from "variants"
import { cn } from "lib"

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
  }

function Button({
  className,
  variant = "default",
  size = "default",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <Loader2Icon
            className="size-4 shrink-0 animate-spin opacity-80"
            aria-hidden
          />
          {children}
        </span>
      ) : (
        children
      )}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
