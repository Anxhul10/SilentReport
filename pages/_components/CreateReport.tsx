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

export default function CreateReport({
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
    <PageLayout setIndex={setIndex} fullPage={false}>
      <CardHeader>
        <CardTitle>Create a Report</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <div className="flex">
                <Label htmlFor="Title of Report">Title of Report</Label>
                <Toogle />
              </div>
              <Input
                id="report"
                type="report"
                placeholder="eg - Corruption: Bribe demanded for hospital admission"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="description">Description</Label>
              </div>
              <InputGroup>
                <InputGroupTextarea
                  className="h-50"
                  placeholder="A staff member asked for extra money to approve a patient’s admission despite available beds."
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </InputGroup>
            </div>
          </div>
        </form>
      </CardContent>
      <div className="flex justify-center">
        <Button
          className="w-30"
          onClick={() => {
            handleSubmit();
          }}
        >
          submit
        </Button>
      </div>
    </PageLayout>
  );
}
