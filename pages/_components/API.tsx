import { PageLayout } from "../../components/PageLayout";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { InputGroupTextarea, InputGroup } from "@/components/ui/input-group";

import { Label } from "@/components/ui/label";
import Toogle from "@/pages/_components/Toggle";
import { useState } from "react";

export default function API({
  setIndex,
}: {
  setIndex: (index: number) => void;
}) {
  const [isAPIUpdated, setisAPIUpdated] = useState(false);
  const [APIExist, setAPIExist] = useState(false);
  const [updateAPI, setUpdateAPI] = useState("");
  const [input, setInput] = useState("");

  function handleSubmit() {
    const user_id = localStorage.getItem("user_id");
    fetch("/api/saveCyborgAPI", {
      method: "POST",
      body: JSON.stringify({ user_id, API: input }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("api saved success");
        } else if (data.status === 500) {
          setAPIExist(true);
        } else {
          console.log("api save unsuccessfull");
        }
      });
  }
  function updateAPIFn() {
    const user_id = localStorage.getItem("user_id");
    fetch("/api/updateAPI", {
      method: "POST",
      body: JSON.stringify({ user_id, API: updateAPI }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          handleSubmit();

          setisAPIUpdated(true);
          console.log("api saved success");
        } else {
          console.log("api save unsuccessfull");
        }
      });
  }
  if (APIExist) {
    return (
      <div>
        <CardHeader>
          <CardTitle className="ml-4">Add CyborgDB API </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex m-4">
            <div className="flex-auto">
              <Input
                id="api"
                type="password"
                placeholder="API key here ..."
                onChange={(e) => {
                  setUpdateAPI(e.target.value);
                }}
                required
              />
            </div>
            <div className="ml-2">
              <Button
                className="w-30"
                onClick={() => {
                  updateAPIFn();
                }}
              >
                Update API
              </Button>
            </div>
          </div>
        </CardContent>
        {isAPIUpdated ? (
          <div className="text-green-500 m-5">API updated !!</div>
        ) : (
          <div className="text-red-500 m-5">API already Exist !!</div>
        )}
      </div>
    );
  }
  return (
    <div>
      <CardHeader>
        <CardTitle className="ml-4">Add CyborgDB API </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex m-4">
          <div className="flex-auto">
            <Input
              id="api"
              type="password"
              placeholder="API key here ..."
              onChange={(e) => {
                setInput(e.target.value);
              }}
              required
            />
          </div>
          <div className="ml-2">
            <Button
              className="w-30"
              onClick={() => {
                handleSubmit();
              }}
            >
              submit
            </Button>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
