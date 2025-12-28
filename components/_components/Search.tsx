import ViewReportContainer from "@/components/_components/ViewReportContainer";
import { type IRecordArray } from "@/types/Record";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useState, useId, useEffect } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

export default function Search({ publicReports }: any) {
  const id = useId();
  const [inputStr, setInputStr] = useState("");
  const [searchData, setSearchData] = useState<IRecordArray[]>([]);
  const [trainL, setTrainL] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportL, setReportL] = useState(true);
  const [searchEmpty, setSearch] = useState(false);
  useEffect(() => {
    if (publicReports.publicReports.length === 0) {
      setReportL(true);
    } else {
      setReportL(false);
    }
  }, [publicReports]);
  function runSearch() {
    if (!inputStr) return;
    fetch("/api/user/search", {
      method: "POST",
      body: JSON.stringify({ queryContents: inputStr }),
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
            created_at: t.metadata.created_at,
          });
        }
        setSearchData(result);
        if (searchData.length === 0) {
          setSearch(true);
        }
        setLoading(false);
      });
  }
  function handleTrain() {
    setTrainL(true);
    fetch("/api/public/reports/train")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
        } else {
          toast.error(data.message);
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
      {loading ? (
        <div className="flex space-x-1.5 m-5">
          <Spinner />
          <p className="text-muted-foreground text-sm">
            Searching via content-based similarity. If results vary, refining
            your query helps improve accuracy over time.
          </p>
        </div>
      ) : searchEmpty ? (
        <div className="flex space-x-1.5 m-5">
          <p className="text-muted-foreground text-sm">
            Sorry, no matched data
          </p>
        </div>
      ) : null}
      {searchData.length === 0 ? (
        reportL ? (
          <div className="flex space-x-1.5 m-5">
            <Spinner />
            <p className="text-muted-foreground text-sm">
              Loading community reports… Public reports are securely retrieved
              and decrypted via CyborgDB for viewing.
            </p>
          </div>
        ) : (
          publicReports.publicReports.map((val: IRecordArray) => {
            return (
              <ViewReportContainer
                key={id}
                title={val.title}
                created_at={val.created_at}
                description={val.description}
                visibility={val.visibility}
              ></ViewReportContainer>
            );
          })
        )
      ) : (
        <div>
          <Separator />
          <div className="text-muted-foreground bg-blue-300 text-sm text-center m-5">
            Content based search results
          </div>
          {searchData.map((val: IRecordArray) => {
            if (val.visibility === "PUBLIC") {
              return (
                <ViewReportContainer
                  key={id}
                  title={val.title}
                  created_at={val.created_at}
                  description={val.description}
                  visibility={val.visibility}
                ></ViewReportContainer>
              );
            }
          })}
          <Separator />
          <div className="text-muted-foreground bg-blue-300 text-sm text-center m-5">
            All Public reports
          </div>
          {reportL ? (
            <div className="flex m-10">
              <div className="mr-4">Loading public reports</div>
              <Spinner />
            </div>
          ) : (
            publicReports.publicReports.map((val: IRecordArray) => {
              return (
                <ViewReportContainer
                  key={id}
                  title={val.title}
                  created_at={val.created_at}
                  description={val.description}
                  visibility={val.visibility}
                ></ViewReportContainer>
              );
            })
          )}
        </div>
      )}
    </>
  );
}
