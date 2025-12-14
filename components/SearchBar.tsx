import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import ViewReportContainer from "@/pages/_components/ViewReportContainer";
import { type IRecordArray } from "@/types/Record";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

import { useEffect, useState } from "react";

export function SearchBar() {
  const [input, setInput] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (!input) return;
    fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({ query: input }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length < 5) {
          setSearchData(data);
        } else {
          setSearchData(data.slice(0, 4));
        }
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
          }}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      {searchData.map((val: IRecordArray) => {
        return (
          <div className="flex justify-center">
            <Card className="w-full h-auto">
              <CardTitle className="ml-5">{val.title}</CardTitle>
              <CardDescription className="flex justify-end mr-4">
                created at - {val.inserted_at}
              </CardDescription>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

// export default function ISearch() {
//   const [inputStr, setInputStr] = useState("");
//   const [searchData, setSearchData] = useState([]);
//   useEffect(() => {
//     if (!inputStr) return;
//     fetch("/api/search", {
//       method: "POST",
//       body: JSON.stringify({ query: inputStr }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setSearchData(data);
//       });
//   }, [inputStr]);

//   return (
//     <>
//       <div className="flex ">
//         <div className="w-full ml-11">
//           <Input
//             placeholder="type here..."
//             onChange={(e) => {
//               setInputStr(e.target.value);
//             }}
//           />
//         </div>
//         <div className="ml-10 mr-11">
//           <Button>Search</Button>
//         </div>
//       </div>
//       {searchData.map((val: IRecordArray) => {
//         return (
//           <ViewReportContainer
//             key={val.id}
//             title={val.title}
//             created_at={val.inserted_at}
//           ></ViewReportContainer>
//         );
//       })}
//     </>
//   );
// }
