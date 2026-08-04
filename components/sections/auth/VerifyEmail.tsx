"use client";

import { Button, Card, CardContent } from "@/components/ui";
import { OtpBoxes } from "ui-components";
import { VerifyEmailHeader } from "ui-components";
import { useEmailVerification } from "hooks";
import { useEffect, useState } from "react";

export function VerifyEmailUI(): React.JSX.Element {
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