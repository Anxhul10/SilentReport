import { useRouter } from "next/router";
import { useState } from "react";
import CreateReport from "@/components/_components/CreateReport";

export default function Edit() {
  const [loading, _setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const { id, title, description, visibility } = router.query;

  const data =
    typeof id === "string" &&
    typeof title === "string" &&
    typeof description === "string" &&
    typeof visibility === "string"
      ? { id, title, description, visibility }
      : null;

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
