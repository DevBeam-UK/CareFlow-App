// components/ui/stories/medications/AdherenceChart.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import AdherenceChart from "@/components/ui/medications/_components/AdherenceChart"

const meta: Meta<typeof AdherenceChart> = {
  title: "Medications / AdherenceChart",
  component: AdherenceChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "7-day adherence bar chart. A flagged (coral) bar highlights a notably low day.",
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof AdherenceChart>

/** Default — one dip mid-week */
export const Default: Story = {
  args: {
    data: [
      { label: "Wed", pct: 88 },
      { label: "Thu", pct: 92 },
      { label: "Fri", pct: 70, flagged: true },
      { label: "Sat", pct: 94 },
      { label: "Sun", pct: 90 },
      { label: "Mon", pct: 96 },
      { label: "Tue", pct: 97, isToday: true },
    ],
  },
}

/** Consistently high adherence, no flagged days */
export const AllGood: Story = {
  args: {
    data: [
      { label: "Wed", pct: 95 },
      { label: "Thu", pct: 96 },
      { label: "Fri", pct: 97 },
      { label: "Sat", pct: 98 },
      { label: "Sun", pct: 96 },
      { label: "Mon", pct: 97 },
      { label: "Tue", pct: 99, isToday: true },
    ],
  },
}
