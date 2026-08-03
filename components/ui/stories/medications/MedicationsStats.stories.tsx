// components/ui/stories/medications/MedicationsHeader.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import MedicationsHeader from "@/components/ui/medications/_components/MedicationsHeader"

const meta: Meta<typeof MedicationsHeader> = {
  title: "Medications / MedicationsHeader",
  component: MedicationsHeader,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Top header bar for the Medications page — mirrors FinanceHeader's structure.",
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof MedicationsHeader>

export const Default: Story = {
  args: { onAddMedication: () => {} },
}
