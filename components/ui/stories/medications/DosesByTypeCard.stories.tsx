// components/ui/stories/medications/PatientMedicationCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import PatientMedicationCard from "@/app/(dashboard)/medications/_components/PatientMedicationCard"

const meta: Meta<typeof PatientMedicationCard> = {
  title: "Medications / PatientMedicationCard",
  component: PatientMedicationCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Single patient summary card. Left border color and status text reflect medication status (on track/controlled/missed/PRN/review due).",
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof PatientMedicationCard>

/** Default — on track, unselected */
export const Default: Story = {
  args: {
    patient: {
      id: "mj",
      name: "Margaret Johnson",
      initials: "MJ",
      age: 84,
      activeMedsCount: 3,
      nextDoseLabel: "Next: Paracetamol 14:00",
      status: "OnTrack",
    },
    selected: false,
    onSelect: () => {},
  },
}

/** Selected — shows the accent border + badge */
export const Selected: Story = {
  args: {
    patient: {
      id: "ra",
      name: "Robert Ahmed",
      initials: "RA",
      age: 82,
      activeMedsCount: 4,
      nextDoseLabel: "Next: Morphine sulfate 12:00",
      status: "Controlled",
    },
    selected: true,
    onSelect: () => {},
  },
}

/** Missed dose status */
export const Missed: Story = {
  args: {
    patient: {
      id: "dc",
      name: "Dorothy Chen",
      initials: "DC",
      age: 91,
      activeMedsCount: 2,
      nextDoseLabel: "09:00 Warfarin",
      status: "Missed",
    },
    selected: false,
    onSelect: () => {},
  },
}
