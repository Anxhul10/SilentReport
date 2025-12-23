"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [_timeRange, setTimeRange] = useState("90d");

  const [reports, setReports] = useState(0);
  const [publicReports, setPublicReports] = useState(0);
  const [privateReports, setPrivateReports] = useState(0);
  const [reportL, setReportL] = useState(true);
  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");

    fetch("http://localhost:4000/user/getReports/count", {
      method: "POST",
      body: JSON.stringify({ user_id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPublicReports(data.public_count);
        setPrivateReports(data.private_count);
        setReports(data.report_count);
        setReportL(false);
      });
  }, []);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Your Reports Overview</CardTitle>
        <CardDescription>
          A summary of reports you have created on SilentReport.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Total */}
        <div>
          {reportL ? (
            <Spinner />
          ) : (
            <div className="text-3xl font-semibold">{reports}</div>
          )}
          <p className="text-sm text-muted-foreground">
            Total reports submitted
          </p>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-3">
            {reportL ? (
              <Spinner />
            ) : (
              <div className="text-xl font-medium">{publicReports}</div>
            )}
            <p className="text-sm text-muted-foreground">Public reports</p>
          </div>

          <div className="rounded-lg border p-3">
            {reportL ? (
              <Spinner />
            ) : (
              <div className="text-xl font-medium">{privateReports}</div>
            )}
            <p className="text-sm text-muted-foreground">Private reports</p>
          </div>
        </div>

        {/* Trust message */}
        <p className="text-xs text-muted-foreground">
          All reports are encrypted and the user is not always anoynomous
          whether signed up or not
        </p>
      </CardContent>
    </Card>
  );
}
