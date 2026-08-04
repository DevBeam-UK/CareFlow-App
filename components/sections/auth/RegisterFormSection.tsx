import { RegisterForm } from "ui-components"

const RegisterFormSection = () => {
  return (
    <section className="flex min-h-screen w-full flex-1 items-center justify-center px-6 py-12 sm:px-8 lg:px-12">
      <div className="w-full max-w-xl rounded-[28px] border border-border/70 bg-background/90 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-10">
        <RegisterFormHeader />
        <div className="mt-8">
          <RegisterForm />
        </div>
        <RegisterFormFooter />
      </div>
    </section>
  )
}

const RegisterFormHeader = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Create your account
        </h1>
        <p className="max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          Set up your CareFlow workspace and start managing visits, compliance, and care teams.
        </p>
      </div>
    </div>
  )
}

const RegisterFormFooter = () => {
  return (
    <div className="mt-8 border-t border-border/70 pt-6 text-center text-sm text-muted-foreground">
      Already have an account?{" "}
      <a href="/login" className="font-semibold text-primary transition-colors hover:text-primary/80">
        Sign in
      </a>
    </div>
  )
}

export default RegisterFormSection
