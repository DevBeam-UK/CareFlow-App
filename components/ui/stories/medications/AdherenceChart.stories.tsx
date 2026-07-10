// components/ui/stories/medications/DosesByTypeCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import DosesByTypeCard from "@/app/(dashboard)/medications/_components/DosesByTypeCard"

const meta: Meta<typeof DosesByTypeCard> = {
  title: "Medications / DosesByTypeCard",
  component: DosesByTypeCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Donut chart showing the split between scheduled, PRN, and controlled doses.",
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof DosesByTypeCard>

/** Default — mostly scheduled doses */
export const Default: Story = {
  args: {
    segments: [
      { label: "Scheduled", pct: 78, color: "#378ADD" },
      { label: "PRN", pct: 18, color: "#F0997B" },
      { label: "Controlled", pct: 4, color: "#6B3FB8" },
    ],
  },
}

/** Higher PRN usage — for visual QA on a different split */
export const HighPRN: Story = {
  args: {
    segments: [
      { label: "Scheduled", pct: 55, color: "#378ADD" },
      { label: "PRN", pct: 40, color: "#F0997B" },
      { label: "Controlled", pct: 5, color: "#6B3FB8" },
    ],
  },
}
