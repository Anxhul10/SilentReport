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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  function handleSubmit() {
    const user_id = localStorage.getItem("user_id");
    fetch("/api/createReport", {
      method: "POST",
      body: JSON.stringify({ user_id, title, description }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("create report success");
        } else {
          console.log("create report unsuccessfull");
        }
      });
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
                setTitle(e.target.value);
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
