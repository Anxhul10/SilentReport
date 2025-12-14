import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { DropDownNotification, DropDownAccount } from "../components/DropDowns";
import { SearchBar } from "../components/SearchBar";
import Dashboard from "./Dashboard";
import { useRouter } from "next/router";

export default function Login({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userState, setUserState] = useState(false);
  const router = useRouter();

  const clickSubmit = () => {
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("token", data.token);
          setUserState(true);
          router.push("/Dashboard");
        } else {
          setUserState(false);
        }
      });
  };

  if (userState) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="navBar">
          <Button variant="ghost">SilentReport</Button>
          <SearchBar></SearchBar>

          <div className="iconBlock">
            <div>
              <Link href="Login">
                <DropDownNotification></DropDownNotification>
              </Link>
            </div>

            <div>
              <Link href="SignUp">
                <DropDownAccount></DropDownAccount>
              </Link>
            </div>
          </div>
        </div>
        <Dashboard></Dashboard>
      </div>
    );
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="navBar">
        <Link href="/">
          <Button variant="ghost">SilentReport</Button>
        </Link>
        <div>
          <Link href="Login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="SignUp">
            <Button variant="ghost">Signup</Button>
          </Link>
        </div>
      </div>
      <Card className="mx-80 my-20">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="GuestUser@example.com"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Field>
              <Field>
                <Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      required
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    clickSubmit();
                  }}
                >
                  Login
                </Button>
                <FieldDescription className="text-center">
                  Don't have an account? <a href="#">Sign Up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
