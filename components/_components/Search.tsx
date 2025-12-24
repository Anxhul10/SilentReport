import ViewReportContainer from "@/components/_components/ViewReportContainer";
import { type IRecordArray } from "@/types/Record";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useState, useId } from "react";
import { toast } from "sonner";

export default function Search() {
  const id = useId();
  const [inputStr, setInputStr] = useState("");
  const [searchData, setSearchData] = useState<IRecordArray[]>([]);
  const [trainL, setTrainL] = useState(false);
  const [loading, setLoading] = useState(false);
  function runSearch() {
    if (!inputStr) return;
    // fetch("/api/search", {
    //   method: "POST",
    //   body: JSON.stringify({ query: inputStr }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setSearchData(data);
    //   });
    fetch("http://localhost:4000/search", {
      method: "POST",
      body: JSON.stringify({ queryContents: inputStr }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const result = [];
        for (const t of data.results) {
          result.push({
            id: t.id,
            title: t.metadata.title,
            description: t.metadata.description,
            visibility: t.metadata.visibility,
            created_by: t.metadata.created_by,
            inserted_at: t.metadata.inserted_at,
          });
        }
        console.log(result);
        setSearchData(result);
        setLoading(false);
      });
  }
  function handleTrain() {
    setTrainL(true);
    fetch("http://localhost:4000/public/reports/train")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.result.status === "success") {
          console.log("data trained successfully");
          toast.success("trained !!");
        } else {
          console.log("data training failed !!");
          toast.error("train failed!!");
        }
        setTrainL(false);
      });
  }

  return (
    <>
      <div className="flex ">
        <div className="w-full ml-11">
          <Input
            placeholder="Enter the report title"
            onChange={(e) => {
              setInputStr(e.target.value);
            }}
          />
        </div>
        <div className="ml-10 mr-5">
          <Button
            onClick={() => {
              runSearch();
              setLoading(true);
            }}
          >
            {loading ? <Spinner /> : <div>Search</div>}
          </Button>
        </div>
        <div>
          <Button
            className="mr-5"
            onClick={() => {
              handleTrain();
            }}
          >
            {trainL ? <Spinner /> : <div>Train</div>}
          </Button>
        </div>
      </div>

      {searchData.map((val: IRecordArray) => {
        if (val.visibility === "PUBLIC") {
          return (
            <ViewReportContainer
              key={id}
              title={val.title}
              created_at={val.inserted_at}
              description={val.description}
              visibility={val.visibility}
            ></ViewReportContainer>
          );
        }
      })}
    </>
  );
}
