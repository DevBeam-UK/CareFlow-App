// components/ui/stories/medications/MedicationsStats.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import MedicationsStats from "@/app/(dashboard)/medications/_components/MedicationsStats"

const meta: Meta<typeof MedicationsStats> = {
  title: "Medications / MedicationsStats",
  component: MedicationsStats,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "KPI row: Doses today, Missed/late, Reviews due, Adherence. Uses tinted background cards rather than the plain white StatCard used on Finance.",
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof MedicationsStats>

/** Default — typical day */
export const Default: Story = {
  args: {
    data: {
      dosesToday: 312,
      dosesGiven: 284,
      dosesRemaining: 28,
      missedCount: 2,
      lateCount: 4,
      reviewsDue: 9,
      reviewsDueSoon: 3,
      adherencePct: 96.8,
    },
  },
}

/** At-risk day — more missed doses, lower adherence */
export const AtRisk: Story = {
  args: {
    data: {
      dosesToday: 298,
      dosesGiven: 240,
      dosesRemaining: 58,
      missedCount: 14,
      lateCount: 11,
      reviewsDue: 15,
      reviewsDueSoon: 9,
      adherencePct: 71,
    },
  },
}
