import { CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState, useEffect } from "react";

export default function API() {
  const [state, updateState] = useState(false);
  const [updateAPI, setUpdateAPI] = useState("");
  const [input, setInput] = useState("");
  const [isAPIPresent, setAPIPresent] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      const user_id = localStorage.getItem("user_id");
      fetch("/api/checkAPI", {
        method: "POST",
        body: JSON.stringify({ user_id }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            console.log({ message: "supabase API valid" });
            setAPIPresent(true);
          } else {
            console.log({ message: "supabase API invalid" });
          }
        });
    }, 200);
  }, []);
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
          setAPIPresent(true);
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
          updateState(true);
          setAPIPresent(true);
          console.log("api saved success");
        } else {
          console.log("api save unsuccessfull");
        }
      });
  }
  if (isAPIPresent) {
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
        {state ? (
          <div className="text-green-500 m-5">API updated successfully !!</div>
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
