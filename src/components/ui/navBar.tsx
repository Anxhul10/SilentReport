import { Button } from "@/components/ui/button"

interface NavBarProps {
    accountName: string
}

export function NavBarInitial() {
  return <>
    <div className="navBar">
      <Button variant="ghost">SilentReport</Button>
      <div>
        <Button variant="ghost" onClick={()=>{console.log('clicked')}}>Login</Button>
        <Button variant="ghost">Signup</Button>
      </div>
    </div>
  </>
}

export function NavBar({accountName}: NavBarProps) {
    return <>
        <div className="navBar">
        <Button variant="ghost">SilentReport</Button>
        <div>
            <Button variant="ghost" onClick={()=>{console.log('clicked')}}>{accountName}</Button>
            <Button variant="ghost">Logout</Button>
        </div>
        </div>
    </>
}