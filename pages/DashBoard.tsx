import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DropDownNotification, DropDownAccount } from "../components/DropDowns";

export default function DashBoard() {
  return (
    <div>
      <div className="navBar">
        <Link href="/DashBoard">
          <Button variant="ghost">SilentReport</Button>
        </Link>
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
      <Button>change navbar</Button>
      <div>dashboard</div>
    </div>
  );
}
