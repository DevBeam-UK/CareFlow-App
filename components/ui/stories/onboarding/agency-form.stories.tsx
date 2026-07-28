import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AgencyForm } from "@/components/onboarding/agency-form"

const meta = {
  title: "Onboarding/AgencyForm",
  component: AgencyForm,
  parameters: {
    controls: { expanded: true },
  },
} satisfies Meta<typeof AgencyForm>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    onSubmit: async () => {
      await new Promise((r) => setTimeout(r, 1000));
      return { error: null };
    },
  },
}

export const WithError: Story = {
  args: {
    onSubmit: async () => {
      await new Promise((r) => setTimeout(r, 1000));
      return { error: "An agency with this registration number already exists" };
    },
  },
}