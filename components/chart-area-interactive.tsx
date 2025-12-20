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
  const [timeRange, setTimeRange] = useState("90d");

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

    fetch("http://localhost:4000/query", {
      method: "POST",
      body: JSON.stringify({ queryContents: user_id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let private_count = 0;
        let public_count = 0;
        let count = 0;
        for (const t of data.results) {
          if (user_id === t.metadata.created_by) {
            if (t.metadata.visibility === "PUBLIC") {
              public_count = public_count + 1;
            }
            if (t.metadata.visibility === "PRIVATE") {
              private_count = private_count + 1;
            }
            count = count + 1;
          }
        }
        setPublicReports(public_count);
        setPrivateReports(private_count);
        setReports(count);
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
