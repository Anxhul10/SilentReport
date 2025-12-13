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
import { Toogle } from "@/pages/_lib/Toggle";

export function CreateReport({
  setIndex,
}: {
  setIndex: (index: number) => void;
}) {
  return (
    <PageLayout setIndex={setIndex}>
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
                />
              </InputGroup>
            </div>
          </div>
        </form>
      </CardContent>
      <div className="flex justify-center">
        <Button className="w-30">submit</Button>
      </div>
    </PageLayout>
  );
}
