import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Homepage() {
  return (
    <>
      <div>
        <div className="container">
          <img
            className="h-full w-full object-scale-down ..."
            src="/background.png"
          />
          <div className="centered">
            <h1 className="m-1 scroll-m-20 text-center font-extrabold tracking-tight text-balance text-[clamp(1.5rem,4vw,3rem)]">
              CyborgDb X SilentReport
            </h1>
            <h2 className="relative mt-10 mr-2 ml-2 scroll-m-20 text-center tracking-tight text-balance text-[clamp(1.2rem,3.5vw,2.4rem)]">
              Anonymous & Encrypted Whistleblower System for Healthcare
            </h2>
          </div>
          <div>
            <h3 className="scroll-m-20 text-center m-20 text-2xl tracking-tight">
              Report corruption, malpractice, or unethical behavior without
              revealing your identity. Every report is client-side encrypted and
              stored using CyborgDB’s encrypted vector search — ensuring nobody,
              not even admins, can trace you.
            </h3>
          </div>
        </div>

        <h4 className="scroll-m-20 text-xl tracking-tight text-center mr-20 ml-20">
          Search and explore all public whistleblower reports on SilentReport.
          Anonymous reporting is allowed — but without an account, you won’t
          have the ability to update or remove your report later.
        </h4>
        <CardFooter className="flex-col gap-2">
          <div className="text-center m-15">
            <Button>Create an Anonymous Report</Button>
          </div>
        </CardFooter>

        <Card className="w-full max-w-150 lg:max-w-230 mx-auto mt-4 mb-4 px-4">
          <CardHeader>
            <CardTitle>
              <h2 className="relative mt-10 mr-2  ml-2 scroll-m-20 text-center text-4xl  tracking-tight text-balance">
                How SlientReport works...
              </h2>
            </CardTitle>
            <CardDescription className="text-2xl m-8">
              <div className="working">
                1. Write your report — no login required.
              </div>
              <div className="working">
                2. Your report is securely encrypted and stored using CyborgDB
                through our API.
              </div>
              <div className="working">
                3. No personal identity or metadata is ever collected or saved.
              </div>
              <div className="working">
                4. If you choose to make the report public, it becomes
                searchable on SilentReport.
              </div>
              <div className="working">
                5. SilentReport is fully open source under the Apache-2.0
                license.
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="foot">
          <div className="">
            <a href="https://github.com/Anxhul10/SilentReport/discussions">
              Join community
            </a>
          </div>
          <div>
            <a href="https://github.com/Anxhul10/SilentReport/issues">
              Open Issues
            </a>
          </div>
          <div>Apache-2.0 license</div>
        </div>
      </div>
    </>
  );
}
