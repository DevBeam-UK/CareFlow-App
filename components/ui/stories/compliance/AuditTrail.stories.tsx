// components/ui/stories/compliance/AuditTrail.stories.tsx
// Stories for the Recent Audit Trail table

import type { Meta, StoryObj } from "@storybook/react";
import AuditTrail from "@/features/compliance/AuditTrail";

const meta: Meta<typeof AuditTrail> = {
  title: "Compliance / AuditTrail",
  component: AuditTrail,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Recent Audit Trail table with time, action+detail, user, and entity-type badge columns. " +
          "Entity badges are colour-coded: Plan=indigo, Visit=green, MAR=orange, Incident=red, Risk=yellow. " +
          "Rows animate in sequentially from below. Hover state reveals subtle bg highlight.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuditTrail>;

/** Full audit trail */
export const Default: Story = {};
