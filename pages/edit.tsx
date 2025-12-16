import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CreateReport from "@/pages/_components/CreateReport";
import { type IRecordArray } from "@/types/Record";

export default function edit() {
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
  return (
    <CreateReport
      edit={true}
      header={"Edit Report"}
      setIndex={setIndex}
    ></CreateReport>
  );
}
