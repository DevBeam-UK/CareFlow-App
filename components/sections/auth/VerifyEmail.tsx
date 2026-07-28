"use client";

import { Button, Card, CardContent } from "@/components/ui";
import OtpBoxes from "@/components/ui/auth/verify-email/otp-boxes";
import VerifyEmailHeader from "@/components/ui/auth/verify-email/verify-email-header";
import { useEmailVerification } from "@/hooks/use-email-verification";
import { useEffect, useState } from "react";

export function VerifyEmailUI() {
  const {
    handleEmailVerification,
    isError,
    loading,
    otp,
    setOtp,
    success,
    startCountdown,
    handleResend,
    canResend,
    countdown,
    formatTime,
    email
  } = useEmailVerification();

  useEffect(() => {
    startCountdown(60);
  }, []);

  return (
    <Card className="h-[50%] w-[20%] flex items-center justify-center">
      <CardContent className="h-full flex flex-col items-center justify-center gap-y-6">
        <VerifyEmailHeader 
        email={email!}
        />
        <OtpBoxes value={otp} setValue={setOtp} />
        {isError && <p className="text-xs text-red-500">{isError}</p>}
        <Button
          type="submit"
          className="w-full"
          onClick={handleEmailVerification}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Submit Code"}
        </Button>
        <div>
          <p className="text-xs text-muted-foreground">
            You can resend the code in:{" "}
            <span className="font-semibold text-primary/70">
              {canResend ? "00:00" : formatTime(countdown)}
            </span>
          </p>
          <button
            onClick={handleResend}
            disabled={!canResend}
            className="mt-1 text-xs text-blue-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {canResend ? "Resend Code" : "Please wait..."}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}