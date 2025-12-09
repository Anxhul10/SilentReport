import { Button } from "@/components/ui/button";

export function Homepage() {
  return (
    <>
      <div>
        <h2 className="mt-15 scroll-m-20 text-center text-4xl  tracking-tight text-balance">
          Anonymous & Encrypted Whistleblower System for Healthcare
        </h2>
        <h1 className="scroll-m-20 m-15 text-center text-4xl font-extrabold tracking-tight text-balance">
          CyborgDb X SilentReport
        </h1>
        <div className="text-center">
          <Button>Create an Anonymous Report</Button>
        </div>
        <h3 className="scroll-m-20 text-center m-20 text-2xl tracking-tight">
          Report corruption, malpractice, or unethical behavior without
          revealing your identity. Every report is client-side encrypted and
          stored using CyborgDB’s encrypted vector search — ensuring nobody, not
          even admins, can trace you.
        </h3>
        <h4 className="scroll-m-20 text-xl tracking-tight text-center m-15">
          All publicly available whistleblower reports can be searched and
          explored on SilentReport.
        </h4>
      </div>
      <div className="foot">
        <div className="">
          <a href="https://github.com/Anxhul10/SilentReport/discussions">
            join community
          </a>
        </div>
        <div>
          <a href="https://github.com/Anxhul10/SilentReport/issues">
            Open Issues
          </a>
        </div>
        <div>Apache-2.0 license</div>
      </div>
    </>
  );
}
