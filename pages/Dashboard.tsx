import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useRouter } from "next/router";
import { useEffect, useState, useId } from "react";
import { PageLayout } from "../components/PageLayout";
import CreateReport from "@/components/_components/CreateReport";
import ViewReportContainer from "@/components/_components//ViewReportContainer";
import { type IRecordArray } from "@/types/Record";
import Search from "@/components/_components//Search";
import API from "@/components/_components//API";
import { Spinner } from "@/components/ui/spinner";
import { type ICount } from "@/types/Count";
import { CardTitle, CardDescription } from "@/components/ui/card";

interface ISummary {
  summary: string;
  keyTheme: string;
  notes: string;
}
// import data from "./data.json";
export default function Dashboard() {
  const [record, setRecord] = useState<IRecordArray[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [userReports, setUserReport] = useState(0);
  const [count, setCount] = useState<ICount>();
  const [publicReports, setPublicReports] = useState([]);
  const [summary, setSummary] = useState<Array<ISummary>>([]);
  const [summaryL, setSummaryL] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    if (token === null) {
      router.push("/Login");
    }
    if (!userId) return;
    if (index === 0) {
      fetch("/api/user/reports/count", {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCount(data);
        });
    }
    if (index === 2) {
      fetch("/api/public/reports/get")
        .then((res) => res.json())
        .then((data) => {
          setPublicReports(data.public_reports);
        });
    }
    if (index !== 4) return;

    if (index === 4 || index === 6) {
      fetch("http://localhost:4000/user/getReports", {
        method: "POST",
        body: JSON.stringify({ user_id: userId }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setRecord(data.reports);
          setLoading(false);
          setUserReport(data.reports.length);
        });
      if (summary.length > 0) return;
      fetch("/api/summary", {
        method: "POST",
        body: JSON.stringify({ reports: record }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setSummary([data]);
          setSummaryL(false);
        });
    }
  }, [index]);

  // 0. Dashboard
  // 1. FeedkeyTheme
  // 2. Search
  // 3. Create Report
  // 4. View Report
  // 5. API
  if (index === 2) {
    return (
      <PageLayout fullPage={true} setIndex={setIndex}>
        <Search publicReports={{ publicReports }}></Search>
      </PageLayout>
    );
  } else if (index === 3) {
    return (
      <CreateReport edit={false} header={"Create Report"} setIndex={setIndex} />
    );
  } else if (index === 4 && loading) {
    return (
      <PageLayout fullPage={true} setIndex={setIndex}>
        <div className="flex space-x-1.5 m-5">
          <Spinner />
          <p className="text-muted-foreground text-sm">
            Loading your reports… CyborgDB securely decrypts your submitted
            reports for viewing.
          </p>
        </div>
      </PageLayout>
    );
  } else if (index === 4 && !loading) {
    if (userReports === 0) {
      return (
        <PageLayout fullPage={true} setIndex={setIndex}>
          <div className="m-4">No reports created yet...</div>
        </PageLayout>
      );
    }
    return (
      <PageLayout fullPage={true} setIndex={setIndex}>
        <ViewReport record={record}></ViewReport>
      </PageLayout>
    );
  } else if (index === 5) {
    return (
      <PageLayout fullPage={true} setIndex={setIndex}>
        <API></API>
      </PageLayout>
    );
  } else if (index === 6) {
    return (
      <PageLayout fullPage={true} setIndex={setIndex}>
        {summaryL ? (
          <div className="flex space-x-1.5 m-5">
            <Spinner />
            <p className="text-muted-foreground text-sm">
              Generating summary… CyborgDB securely decrypts the report, then AI
              analyzes and summarizes the content. This may take a moment.
            </p>
          </div>
        ) : (
          <div className="m-10">
            <CardTitle>Summary</CardTitle>
            <div className="mt-4 mb-4">
              <CardDescription>{summary[0].summary}</CardDescription>
            </div>
            <CardTitle>Key Theme</CardTitle>
            <div className="mb-4 mt-4">
              <CardDescription>{summary[0].keyTheme}</CardDescription>
            </div>
            <CardTitle>Notes</CardTitle>
            <div className="mb-4 mt-4">
              <CardDescription>{summary[0].notes}</CardDescription>
            </div>
          </div>
        )}
      </PageLayout>
    );
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
          onSummaryHitParent={() => {
            setIndex(6);
          }}
        />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive count={{ count }} />
                </div>
                {/* to be used later */}
                {/* <DataTable data={data} /> */}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

function ViewReport({ record }: { record: Array<IRecordArray> }) {
  const id = useId();
  return (
    <>
      {record.map((val: IRecordArray) => {
        return (
          <ViewReportContainer
            key={id}
            id={val.id}
            title={val.title}
            description={val.description}
            visibility={val.visibility}
            filter={true}
            created_at={val.inserted_at}
          ></ViewReportContainer>
        );
      })}
    </>
  );
}
