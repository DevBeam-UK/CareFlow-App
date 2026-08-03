// components/ui/stories/medications/PatientRecordPanel.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import PatientRecordPanel from "@/components/sections/medications/PatientRecordPanel"

const meta: Meta<typeof PatientRecordPanel> = {
  title: "Medications / PatientRecordPanel",
  component: PatientRecordPanel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Full medication record shown when a patient card is selected. Animates open/closed via AnimatePresence.",
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof PatientRecordPanel>

/** Default — Robert Ahmed's record open */
export const Default: Story = {
  args: {
    record: {
      id: "ra",
      name: "Robert Ahmed",
      initials: "RA",
      age: 82,
      nhsNumber: "493 021 7735",
      gpName: "Dr. Fatima Rahman",
      avatarBg: "#F3EEFC",
      avatarText: "#6B3FB8",
      medications: [
        { id: "1", name: "Morphine sulfate", dosage: "10mg", route: "oral", timing: "12:00", tagLabel: "Controlled \u00b7 2nd sig required", tagColor: "#6B3FB8" },
        { id: "2", name: "Metformin", dosage: "500mg", route: "oral", timing: "08:00, 18:00", tagLabel: "Given today", tagColor: "#3B6D11" },
        { id: "3", name: "Ibuprofen (PRN)", dosage: "400mg", route: "oral", timing: "as needed", tagLabel: "Used twice this week", tagColor: "#378ADD" },
        { id: "4", name: "Ramipril", dosage: "5mg", route: "oral", timing: "08:00", tagLabel: "Review due in 5 days", tagColor: "#854F0B" },
      ],
    },
    onClose: () => {},
  },
}

/** Closed — nothing selected, renders nothing */
export const Closed: Story = {
  args: {
    record: null,
  },
}
