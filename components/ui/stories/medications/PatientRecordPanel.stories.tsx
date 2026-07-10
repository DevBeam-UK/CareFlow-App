// components/ui/stories/medications/MissedDoseReasonsCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import MissedDoseReasonsCard from "@/app/(dashboard)/medications/_components/MissedDoseReasonsCard"

const meta: Meta<typeof MissedDoseReasonsCard> = {
  title: "Medications / MissedDoseReasonsCard",
  component: MissedDoseReasonsCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Breakdown of why doses were missed — useful for spotting recurring patterns.",
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof MissedDoseReasonsCard>

/** Default */
export const Default: Story = {
  args: {
    reasons: [
      { label: "Patient refused", pct: 50 },
      { label: "Not available", pct: 33 },
      { label: "Carer error", pct: 17 },
    ],
  },
}
