import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PageLayout } from "../components/PageLayout";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "../components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

import data from "./data.json";

export default function Dashboard() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      router.push("/Login");
    }
  });
  // 0. Dashboard
  // 1. Feed
  // 2. Search
  // 3. Create Report
  // 4. View Report
  // 5. API
  if (index === 1) {
    return <PageLayout setIndex={setIndex}>Feed..</PageLayout>;
  } else if (index === 2) {
    return <PageLayout setIndex={setIndex}>search....</PageLayout>;
  } else if (index === 3) {
    return <CreateReport setIndex={setIndex} />;
  } else if (index === 4) {
    return <PageLayout setIndex={setIndex}>view report ....</PageLayout>;
  } else if (index === 5) {
    return <PageLayout setIndex={setIndex}>API....</PageLayout>;
  }
  return (
    <div>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar
          variant="inset"
          onDashboardParent={() => {
            setIndex(0);
          }}
          onFeedParent={() => {
            setIndex(1);
          }}
          onSearchParent={() => {
            setIndex(2);
          }}
          onCreateReportParent={() => {
            setIndex(3);
          }}
          onViewReportParent={() => {
            setIndex(4);
          }}
          onAPIHitParent={() => {
            setIndex(5);
          }}
        />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                <DataTable data={data} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

function CreateReport({ setIndex }: { setIndex: (index: number) => void }) {
  return (
    <PageLayout setIndex={setIndex}>
      <CardHeader>
        <CardTitle>Create a Report</CardTitle>
        <CardDescription>
          <Popover />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="Title of Report">Title of Report</Label>
              <Input
                id="report"
                type="report"
                placeholder="eg - Corruption: Bribe demanded for hospital admission"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="description">Description</Label>
              </div>
              <InputGroup>
                <InputGroupTextarea
                  className="h-50"
                  placeholder="A staff member asked for extra money to approve a patient’s admission despite available beds."
                />
              </InputGroup>
            </div>
          </div>
        </form>
      </CardContent>
    </PageLayout>
  );
}

function Popover() {
  return (
    <>
      <div>
        Corruption: Bribery, misuse of funds, abuse of power Fraud: Financial
        fraud, fake billing, scams Misconduct: Ethical or professional
        misconduct Abuse: Abuse of authority or position Negligence:
        Carelessness causing harm Cover-Up: Evidence suppression or hiding facts
        Data Tampering: Record manipulation Conflict of Interest: Personal gain
        over duty Policy Violation: Breaking internal rules
      </div>
    </>
  );
}
