"use client"

import { ArrowRightIcon, LockKeyholeIcon, MailIcon } from "lucide-react"
import React, { useState } from "react"

import { Button, toast } from "ui-components"
import { Checkbox } from "ui-components"
import { Input } from "ui-components"
import { Label } from "ui-components"
import { cn } from "lib"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"



type LoginFormProps = {
  className?: string
}

const LoginForm = ({ className }: LoginFormProps) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(true)


     const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      

      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }
      toast.success('Logged In SuccessFully')
      router.push("/");
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full space-y-6", className)}
    >
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground">
          Email address
        </Label>
        <div className="relative">
          <MailIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@careflow.app"
            className="h-11 pl-10"
          />
        {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </Label>
        </div>
        <div className="relative">
          <LockKeyholeIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            className="h-11 pl-10"
          />
        {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl  bg-muted/40 px-3 py-2">
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <Checkbox
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
          />
          Keep me signed in
        </label>
        <span className="text-primary text-sm">
          <Link href={''}>
          Forget Password
          </Link>
        </span>
      </div>

      <Button type="submit" className="h-11 w-full gap-2">
        Sign in
        <ArrowRightIcon className="size-4" />
      </Button>
    </form>
  )
}

export default LoginForm