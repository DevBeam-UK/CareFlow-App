// components/ui/stories/compliance/CQCFiveKey.stories.tsx
// Stories for the CQC Five Key Questions horizontal bar chart

import type { Meta, StoryObj } from "@storybook/react";
import CQCFiveKey from "@/features/compliance/CQCFiveKey";

const meta: Meta<typeof CQCFiveKey> = {
  title: "Compliance / CQCFiveKey",
  component: CQCFiveKey,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "CQC Five Key Questions panel: Safe, Effective, Caring, Responsive, Well-led. " +
          "Each domain shows a horizontal animated progress bar with a colour-coded score badge " +
          "(Good / Needs Work / Outstanding). Responsive domain highlights an 'Areas to Improve' " +
          "yellow callout with bullet points.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 700 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CQCFiveKey>;

/** All five CQC domains */
export const Default: Story = {};
