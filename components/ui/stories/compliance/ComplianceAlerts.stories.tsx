// components/ui/stories/compliance/ComplianceAlerts.stories.tsx
// Stories for the right-side Compliance Alerts panel

import type { Meta, StoryObj } from "@storybook/react";
import ComplianceAlerts from "@/features/compliance/ComplianceAlerts";

const meta: Meta<typeof ComplianceAlerts> = {
  title: "Compliance / ComplianceAlerts",
  component: ComplianceAlerts,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Compliance Alerts panel showing urgent, today, and info-level alerts. " +
          "Each row has a severity icon, title, subtitle, and timestamp. " +
          "Urgent alerts use red backgrounds, Today amber, Finfo neutral grey. " +
          "Alert count badge animates in with a spring. Rows stagger in from the right.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 340 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ComplianceAlerts>;

/** All alerts */
export const Default: Story = {};
