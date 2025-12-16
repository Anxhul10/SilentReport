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
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CreateReport({
  setIndex,
}: {
  setIndex: (index: number) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");
  function handleSubmit() {
    const user_id = localStorage.getItem("user_id");
    fetch("/api/createReport", {
      method: "POST",
      body: JSON.stringify({ user_id, title, description, visibility }),
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
    <PageLayout setIndex={setIndex} fullPage={true}>
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
        <FieldSet className="m-2">
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Choose Visibility</FieldLegend>
              <FieldDescription>
                Choose the visibility for your report
              </FieldDescription>
              <RadioGroup defaultValue="kubernetes">
                <FieldLabel htmlFor="kubernetes-r2h">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Public</FieldTitle>
                      <FieldDescription>
                        This report will be visible to everyone
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem
                      value="kubernetes"
                      id="kubernetes-r2h"
                      aria-label="Kubernetes"
                      onClick={() => {
                        setVisibility("PUBLIC");
                      }}
                    />
                  </Field>
                </FieldLabel>
                <FieldLabel htmlFor="vm-z4k">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Private</FieldTitle>
                      <FieldDescription>
                        This report will be visible to you only
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem
                      value="vm"
                      id="vm-z4k"
                      aria-label="Virtual Machine"
                      onClick={() => {
                        setVisibility("PRIVATE");
                      }}
                    />
                  </Field>
                </FieldLabel>
              </RadioGroup>
            </FieldSet>
          </FieldGroup>
        </FieldSet>
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
