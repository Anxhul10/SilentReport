import { UserIcon } from "./ui/icons/lucide-user";
import { BellIcon } from "./ui/icons/akar-icons-bell";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropDownAccount() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserIcon></UserIcon>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              console.log("hit profile");
            }}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              console.log("hit setting");
            }}
          >
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem
          onClick={(e) => {
            // e.preventDefault();
            localStorage.removeItem("token");
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DropDownNotification() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <BellIcon></BellIcon>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="center">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem></DropdownMenuItem>
          <DropdownMenuItem></DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
