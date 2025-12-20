import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { InputGroupTextarea, InputGroup } from "@/components/ui/input-group";

import { Label } from "@/components/ui/label";
import Toogle from "@/components/_components//Toggle";
import { useState } from "react";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";

export default function Anonymous() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  function handleSubmit() {
    const user_id = "d85ba6c3-7122-43ca-9fce-4cc42a2f6735"; // random value

    fetch("http://localhost:4000/upsert", {
      method: "POST",
      body: JSON.stringify({
        user_id,
        title,
        description,
        visibility: "PUBLIC",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          console.log("loading stop");
        }
      });
  }
  return (
    <div>
      <div className="navBar">
        <Link href="/">
          <Button variant="ghost">SilentReport</Button>
        </Link>
        <SearchBar></SearchBar>

        <div>
          <Link
            href={{
              pathname: "Login",
              query: {
                search: "search",
              },
            }}
          >
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="SignUp">
            <Button variant="ghost">Signup</Button>
          </Link>
        </div>
      </div>

      <Card className="m-20 mx-50">
        <CardHeader>
          <CardTitle>Create a Anonymous Report</CardTitle>
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
      </Card>
    </div>
  );
}
