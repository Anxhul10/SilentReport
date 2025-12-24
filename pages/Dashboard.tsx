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
// import data from "./data.json";

export default function Dashboard() {
  const [record, setRecord] = useState<IRecordArray[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [userReports, setUserReport] = useState(0);
  const [count, setCount] = useState<ICount>();
  const router = useRouter();
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;
    if (index === 0) {
      fetch("http://localhost:4000/user/getReports/count", {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("from dashboard" + data);
          setCount(data);
        });
    }
    if (index !== 4) return;
    const token = localStorage.getItem("token");
    if (token === null) {
      router.push("/Login");
    }
    // fetch("/api/reports")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data.data);
    //     setRecord(data.data);
    //     setLoading(false);
    //   });

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
        console.log(record);
        console.log(userId);
        setUserReport(data.reports.length);
      });
  }, [index]);

  // 0. Dashboard
  // 1. Feed
  // 2. Search
  // 3. Create Report
  // 4. View Report
  // 5. API
  if (index === 2) {
    return (
      <PageLayout fullPage={true} setIndex={setIndex}>
        <Search></Search>
      </PageLayout>
    );
  } else if (index === 3) {
    return (
      <CreateReport edit={false} header={"Create Report"} setIndex={setIndex} />
    );
  } else if (index === 4 && loading) {
    return (
      <PageLayout fullPage={true} setIndex={setIndex}>
        <div className="m-5 flex ">
          <Spinner />
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
