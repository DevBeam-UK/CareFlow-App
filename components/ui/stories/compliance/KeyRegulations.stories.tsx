// components/ui/stories/compliance/KeyRegulations.stories.tsx
// Stories for the Key Regulations compliance panel

import type { Meta, StoryObj } from "@storybook/react";
import KeyRegulations from "@/features/compliance/KeyRegulations";

const meta: Meta<typeof KeyRegulations> = {
  title: "Compliance / KeyRegulations",
  component: KeyRegulations,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Key CQC Regulations panel. Each regulation shows a code badge, name, animated " +
          "progress bar, description, and status pill. Status colours: Compliant=green, " +
          "Attention=amber, Risk=red. Rows slide in from the right with staggered delay.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof KeyRegulations>;

/** All regulations */
export const Default: Story = {};
