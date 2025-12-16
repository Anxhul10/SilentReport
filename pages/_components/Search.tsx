import ViewReportContainer from "@/pages/_components/ViewReportContainer";
import { type IRecordArray } from "@/types/Record";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";

export default function Search() {
  const [inputStr, setInputStr] = useState("");
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    if (!inputStr) return;
    fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({ query: inputStr }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchData(data);
      });
  }, [inputStr]);

  return (
    <>
      <div className="flex ">
        <div className="w-full ml-11">
          <Input
            placeholder="type here..."
            onChange={(e) => {
              setInputStr(e.target.value);
            }}
          />
        </div>
        <div className="ml-10 mr-11">
          <Button>Search</Button>
        </div>
      </div>
      {searchData.map((val: IRecordArray) => {
        if (val.visibility === "PUBLIC") {
          return (
            <ViewReportContainer
              key={val.id}
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
