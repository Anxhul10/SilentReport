"use client";

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
import { type ICount } from "@/types/Count";

export function ChartAreaInteractive({
  count,
}: {
  count: { count: ICount | undefined };
}) {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
  const [_timeRange, setTimeRange] = useState("90d");

  useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
    if (count.count === undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isMobile]);

  console.log(count);
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Your Reports Overview</CardTitle>
        <CardDescription>
          A summary of reports you have created on SilentReport.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <div className="text-3xl font-semibold">
              {count.count.report_count}
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            Total reports submitted
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-3">
            {loading ? (
              <Spinner />
            ) : (
              <div className="text-xl font-medium">
                {count.count.public_count}
              </div>
            )}
            <p className="text-sm text-muted-foreground">Public reports</p>
          </div>

          <div className="rounded-lg border p-3">
            {loading ? (
              <Spinner />
            ) : (
              <div className="text-xl font-medium">
                {count.count.private_count}
              </div>
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
