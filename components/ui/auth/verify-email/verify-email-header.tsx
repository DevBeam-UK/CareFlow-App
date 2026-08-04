import { Mail } from 'lucide-react'

export interface VerifyEmailHeaderProps {
  email : string
}

const VerifyEmailHeader = ({email}: VerifyEmailHeaderProps) => {
  return (
    <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Verify Your Email</h1>
          <p className="mt-2 text-sm text-gray-600">
            We sent a 6-digit verification code to
          </p>
          <p className="text-sm font-medium text-gray-900">{email}</p>
        </div>
  )
}

export default VerifyEmailHeader