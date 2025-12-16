import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PageLayout } from "../components/PageLayout";
import CreateReport from "@/pages/_components/CreateReport";
import ViewReportContainer from "@/pages/_components/ViewReportContainer";
import { type IRecordArray } from "@/types/Record";
import Search from "@/pages/_components/Search";
import API from "@/pages/_components/API";
import data from "./data.json";

export default function Dashboard() {
  const [record, setRecord] = useState<IRecordArray[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const router = useRouter();
  useEffect(() => {
    fetch("/api/reports")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setRecord(data.data);
        setLoading(false);
      });
    const token = localStorage.getItem("token");
    if (token === null) {
      router.push("/Login");
    }
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
        loading ....
      </PageLayout>
    );
  } else if (index === 4 && !loading) {
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
                  <ChartAreaInteractive />
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
  return (
    <>
      {record.map((val: IRecordArray) => {
        if (
          localStorage.getItem("user_id") !== undefined &&
          val.created_by === localStorage.getItem("user_id")
        ) {
          return (
            <ViewReportContainer
              key={val.id}
              id={val.id}
              title={val.title}
              created_at={val.inserted_at}
              description={val.description}
              visibility={val.visibility}
              filter={true}
            ></ViewReportContainer>
          );
        }
      })}
    </>
  );
}
