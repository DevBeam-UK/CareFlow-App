// components/ui/stories/compliance/MetricCards.stories.tsx
// Stories for the four top-level KPI summary tiles

import type { Meta, StoryObj } from "@storybook/react";
import MetricCards from "@/features/compliance/MetricCards";

const meta: Meta<typeof MetricCards> = {
  title: "Compliance / MetricCards",
  component: MetricCards,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Four KPI summary tiles: CQC Readiness score (green), Documentation Gaps (red), " +
          "Training Compliance % (blue), and Incident Response avg hours (orange). " +
          "Each tile animates in with staggered delay on mount.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MetricCards>;

/** Default — all four tiles visible */
export const Default: Story = {};
