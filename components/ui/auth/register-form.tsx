"use client"

import { ArrowRightIcon, LockKeyholeIcon, MailIcon, PhoneIcon, UserRoundIcon } from "lucide-react"
import React, { use, useState } from "react"

import { Button, toast } from "ui-components"
import { Input } from "ui-components"
import { Label } from "ui-components"
import { cn } from "lib"
import { useRouter } from "next/navigation"

type RegisterFormProps = {
  className?: string
}

const RegisterForm = ({ className }: RegisterFormProps) => {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [error , setError] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/auth/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        fullName, 
        email, 
        phone: phoneNumber, 
        password, 
        confirmPassword 
      }),
    });


    const data = await response.json();

    if (data.success === false) {

      toast.error(data.message)
    }

    // ✅ Success!
    router.push("/login");
  } catch (error) {
    setError("Network error. Please check your connection.");
  }
};
  return (
    <form onSubmit={handleSubmit} className={cn("w-full space-y-5", className)}>
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
          Full name
        </Label>
        <div className="relative">
          <UserRoundIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Enter your full name"
            className="h-11 pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-foreground">
            Phone number
          </Label>
          <div className="relative">
            <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="07123 456789"
              className="h-11 pl-10"
            />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </Label>
          <div className="relative">
            <LockKeyholeIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              className="h-11 pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
            Confirm password
          </Label>
          <div className="relative">
            <LockKeyholeIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Repeat your password"
              className="h-11 pl-10"
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="h-11 w-full gap-2">
        Create account
        <ArrowRightIcon className="size-4" />
      </Button>
    </form>
  )
}

export default RegisterForm
