import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CreateReport from "@/pages/_components/CreateReport";

type ReportQuery = {
  id?: string;
  title?: string;
  description?: string;
  visibility?: string;
};
export default function Edit() {
  const [loading, _setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const [data, setData] = useState<ReportQuery | null>(null);
  useEffect(() => {
    const { id, title, description, visibility } = router.query;
    if (
      typeof title === "string" &&
      typeof description === "string" &&
      typeof visibility === "string" &&
      typeof id === "string"
    ) {
      setData({ id, title, description, visibility });
    }
  }, [router.query]);
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
      report_id={data.id}
      title_to_edit={data?.title}
      description_to_edit={data?.description}
      visibility_to_edit={data?.visibility}
    ></CreateReport>
  );
}
