import ViewReportContainer from "@/components/_components/ViewReportContainer";
import { type IRecordArray } from "@/types/Record";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useEffect, useState, useId } from "react";

export default function Search() {
  const id = useId();
  const [inputStr, setInputStr] = useState("");
  const [searchData, setSearchData] = useState<IRecordArray[]>([]);
  const [isClicked, setClick] = useState(false);
  useEffect(() => {
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
        setClick(false);
      });
  }, [isClicked]);

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
        <div className="ml-10 mr-11">
          <Button
            onClick={() => {
              setClick(true);
            }}
          >
            Search
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
