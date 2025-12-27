import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { type IRecordArray } from "@/types/Record";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState, useId } from "react";

export function SearchBar() {
  const [input, setInput] = useState("");
  const [searchData, setSearchData] = useState<IRecordArray[]>([]);
  const [loading, setLoading] = useState(false);
  const id = useId();
  useEffect(() => {
    if (!input) return;
    fetch("http://localhost:4000/query", {
      method: "POST",
      body: JSON.stringify({ queryContents: input }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
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
        setSearchData(result);
        setLoading(false);
      });
  }, [input]);
  if (input === "") {
    return (
      <div className="w-70 m-1">
        <InputGroup>
          <InputGroupInput
            placeholder="Search..."
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
  return (
    <div className="w-70 m-1">
      <InputGroup>
        <InputGroupInput
          placeholder="Search..."
          onChange={(e) => {
            setInput(e.target.value);
            setLoading(true);
          }}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      {loading && (
        <div className="flex justify-center">
          <Card className="w-full h-auto " key={id}>
            <CardTitle className="ml-5">
              <Spinner />
            </CardTitle>
            <CardDescription className="flex justify-end mr-4 ml-4">
              Loading...
            </CardDescription>
          </Card>
        </div>
      )}
      {searchData.map((val: IRecordArray) => {
        return (
          <div className="flex justify-center">
            <Card className="w-full h-auto" key={id}>
              <CardTitle className="ml-5">{val.title}</CardTitle>
              <CardDescription className="flex justify-end mr-4 ml-4">
                created at - {val.inserted_at}
              </CardDescription>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
