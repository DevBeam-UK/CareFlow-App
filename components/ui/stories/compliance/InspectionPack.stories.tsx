// components/ui/stories/compliance/InspectionPack.stories.tsx
// Stories for the CQC Inspection Pack generator card

import type { Meta, StoryObj } from "@storybook/react";
import InspectionPack from "@/features/compliance/InspectionPack";

const meta: Meta<typeof InspectionPack> = {
  title: "Compliance / InspectionPack",
  component: InspectionPack,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "CQC Inspection Pack generator card. Click 'Generate Pack' to trigger a 1.8s loading " +
          "animation followed by a 'Generated!' success state that resets after 3s. " +
          "Also has a 'Preview' button. Uses a gradient background (indigo→white→green).",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InspectionPack>;

/** Default idle state */
export const Default: Story = {};
