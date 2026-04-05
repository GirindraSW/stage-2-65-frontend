import * as React from "react";

import { cn } from "@/lib/utils";

// Label reusable untuk menjaga aksesibilitas form (terhubung ke htmlFor).
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    />
  );
}

export { Label };
