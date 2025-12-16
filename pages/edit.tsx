import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CreateReport from "@/pages/_components/CreateReport";
import { type IRecordArray, type IQuery } from "@/types/Record";

type ReportQuery = {
  title?: string;
  description?: string;
  visibility?: string;
};
export default function edit() {
  const [record, setRecord] = useState<IRecordArray[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const visibility = "public";
  const title = "d";
  const description = "fsf";
  const [data, setData] = useState<ReportQuery | null>(null);
  useEffect(() => {
    const { title, description, visibility } = router.query;

    if (
      typeof title === "string" &&
      typeof description === "string" &&
      typeof visibility === "string"
    ) {
      setData({ title, description, visibility });
    }
  }, [router.query]);

  //   useEffect(() => {
  //     fetch("/api/reports")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data.data);
  //         setRecord(data.data);
  //         setLoading(false);
  //       });
  //     const token = localStorage.getItem("token");
  //     if (token === null) {
  //       router.push("/Login");
  //     }
  //   }, [index]);

  // 0. Dashboard
  // 1. Feed
  // 2. Search
  // 3. Create Report
  // 4. View Report
  // 5. API
  if (index === 2) {
    router.push("/Dashboard");
  } else if (index === 3) {
    router.push("/Dashboard");
  } else if (index === 4 && loading) {
    router.push("/Dashboard");
  } else if (index === 4 && !loading) {
    router.push("/Dashboard");
  } else if (index === 5) {
    router.push("/Dashboard");
  }
  if (!data) return null;

  return (
    <CreateReport
      edit={true}
      header={"Edit Report"}
      setIndex={setIndex}
      title_to_edit={data?.title}
      description_to_edit={data?.description}
      visibility_to_edit={data?.visibility}
    ></CreateReport>
  );
}
