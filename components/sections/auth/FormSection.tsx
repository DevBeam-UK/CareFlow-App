import { LoginForm } from "ui-components"

const FormSection = () => {
  return (
    <section className="flex min-h-screen w-full flex-1 items-center justify-center  px-6 py-12 sm:px-8 lg:px-12">
      <div className="w-full max-w-xl rounded-[28px] border border-border/70 bg-background/90 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-10">
        <FormSectionHeader />
        <div className="mt-8">
          <LoginForm />
        </div>
        <FormSectionFooter />
      </div>
    </section>
  )
}

const FormSectionHeader = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Welcome back
        </h1>
        <p className="max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          Sign in to continue managing patients, schedules, and care workflows from one place.
        </p>
      </div>
    </div>
  )
}

const FormSectionFooter = () => {
  return (
    <div className="mt-8 border-t border-border/70 pt-6 text-center text-sm text-muted-foreground">
      New to CareFlow?{" "}
      <a href="/register" className="font-semibold text-primary transition-colors hover:text-primary/80">
        Create an account
      </a>
    </div>
  )
}

export default FormSection