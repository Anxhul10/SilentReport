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

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = useState("90d");

  const [reports, setReports] = useState(0);
  const [publicReports, setPublicReports] = useState(0);
  const [privateReports, setPrivateReports] = useState(0);

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");

    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => {
        let total = 0;
        let pub = 0;
        let priv = 0;

        for (const t of data.data) {
          if (t.created_by === user_id) {
            total++;
            if (t.visibility === "PUBLIC") pub++;
            if (t.visibility === "PRIVATE") priv++;
          }
        }

        setReports(total);
        setPublicReports(pub);
        setPrivateReports(priv);
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
          <div className="text-3xl font-semibold">{reports}</div>
          <p className="text-sm text-muted-foreground">
            Total reports submitted
          </p>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-3">
            <div className="text-xl font-medium">{publicReports}</div>
            <p className="text-sm text-muted-foreground">Public reports</p>
          </div>

          <div className="rounded-lg border p-3">
            <div className="text-xl font-medium">{privateReports}</div>
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
