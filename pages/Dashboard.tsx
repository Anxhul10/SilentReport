import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PageLayout } from "../components/PageLayout";
import { AlertCircleIcon } from "lucide-react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "../components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  InputGroupTextarea,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <div className="flex">
                <Label htmlFor="Title of Report">Title of Report</Label>
                <Toogle />
              </div>
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

function Toogle() {
  return (
    <>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <InputGroupAddon>
              <InputGroupButton variant="secondary" size="icon-xs">
                <AlertCircleIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="flex flex-col gap-1 rounded-xl text-sm"
          >
            <div>
              <div>
                <strong>Corruption:</strong>{" "}
                <span className="text-muted">
                  Bribery, misuse of funds, abuse of power
                </span>
              </div>

              <div>
                <strong>Fraud:</strong>{" "}
                <span className="text-muted">
                  Financial fraud, fake billing, scams
                </span>
              </div>

              <div>
                <strong>Misconduct:</strong>{" "}
                <span className="text-muted">
                  Ethical or professional misconduct
                </span>
              </div>

              <div>
                <strong>Abuse:</strong>{" "}
                <span className="text-muted">
                  Abuse of authority or position
                </span>
              </div>

              <div>
                <strong>Negligence:</strong>{" "}
                <span className="text-muted">Carelessness causing harm</span>
              </div>

              <div>
                <strong>Cover-Up:</strong>{" "}
                <span className="text-muted">
                  Evidence suppression or hiding facts
                </span>
              </div>

              <div>
                <strong>Data Tampering:</strong>{" "}
                <span className="text-muted">Record manipulation</span>
              </div>

              <div>
                <strong>Conflict of Interest:</strong>{" "}
                <span className="text-muted">Personal gain over duty</span>
              </div>

              <div>
                <strong>Policy Violation:</strong>{" "}
                <span className="text-muted">Breaking internal rules</span>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
