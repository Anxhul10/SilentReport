import { PageLayout } from "../../components/PageLayout";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { InputGroupTextarea, InputGroup } from "@/components/ui/input-group";

import { Label } from "@/components/ui/label";
import Toogle from "@/components/_components/Toggle";
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
function processData(data: string | undefined): string {
  if (data === undefined) {
    return "";
  }
  return data;
}
export default function CreateReport({
  setIndex,
  header,
  edit,
  report_id,
  title_to_edit,
  description_to_edit,
  visibility_to_edit,
}: {
  setIndex: (index: number) => void;
  header: string;
  edit: boolean;
  report_id?: string;
  title_to_edit?: string;
  description_to_edit?: string;
  visibility_to_edit?: string;
}) {
  const [title, setTitle] = useState(processData(title_to_edit));
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [description, setDescription] = useState(
    processData(description_to_edit),
  );
  const [visibility, setVisibility] = useState(processData(visibility_to_edit));
  function handleSubmit() {
    const user_id = localStorage.getItem("user_id");
    fetch("/api/user/reports/upsert", {
      method: "POST",
      body: JSON.stringify({ user_id, title, description, visibility }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.status === "success") {
          toast.success("created report !!");
        } else {
          toast.error("cant create a report! something went wrong");
        }
      });
  }
  function update() {
    const user_id = localStorage.getItem("user_id");
    fetch("/api/user/reports/update", {
      method: "POST",
      body: JSON.stringify({
        user_id,
        id: report_id,
        title,
        description,
        visibility,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("edited successfully!");
        } else {
          toast.error("failed to edit");
        }
        setEditLoading(false);
      });
  }
  function descriptionHit() {
    fetch("/api/fix/description", {
      method: "POST",
      body: JSON.stringify({
        description,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDescription(data.message);
      });
  }
  function titleHit() {
    fetch("/api/fix/title", {
      method: "POST",
      body: JSON.stringify({
        title: title,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.message);
      });
  }
  return (
    <PageLayout setIndex={setIndex} fullPage={true}>
      <CardHeader>
        <CardTitle>{header}</CardTitle>
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
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              />
              {title.length === 0 ? null : (
                <Badge
                  onClick={() => {
                    titleHit();
                  }}
                >
                  Improve Title
                </Badge>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="description">Description</Label>
              </div>
              <InputGroup>
                <InputGroupTextarea
                  className="h-50"
                  value={description}
                  placeholder="A staff member asked for extra money to approve a patient’s admission despite available beds."
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </InputGroup>
              {description.length === 0 ? null : (
                <Badge
                  onClick={() => {
                    descriptionHit();
                  }}
                >
                  Improve Description
                </Badge>
              )}
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
              <RadioGroup defaultValue={visibility}>
                <FieldLabel htmlFor="kubernetes-r2h">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Public</FieldTitle>
                      <FieldDescription>
                        This report will be visible to everyone
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem
                      value="PUBLIC"
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
                      value="PRIVATE"
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
        {edit ? (
          <Button
            className="w-30"
            onClick={() => {
              update();
              setEditLoading(true);
            }}
          >
            {editLoading ? <Spinner /> : <div>edit</div>}
          </Button>
        ) : (
          <Button
            className="w-30"
            onClick={() => {
              handleSubmit();
              setLoading(true);
            }}
          >
            {loading ? <Spinner /> : <div> submit</div>}
          </Button>
        )}
      </div>
    </PageLayout>
  );
}
