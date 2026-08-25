// components/ui/stories/compliance/ScoreTrend.stories.tsx
// Stories for the CQC Score Trend area chart

import type { Meta, StoryObj } from "@storybook/react";
import ScoreTrend from "@/features/compliance/ScoreTrend";

const meta: Meta<typeof ScoreTrend> = {
  title: "Compliance / ScoreTrend",
  component: ScoreTrend,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "CQC Score Trend area chart using Recharts. Shows two series: Actual (solid green) and " +
          "Comparison (dashed grey). Custom tooltip, animated draw-on, and a stats footer " +
          "showing 6-Month Change, Best Area, and Focus Area.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScoreTrend>;

/** Trend over 7 months */
export const Default: Story = {};
