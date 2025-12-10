import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Homepage } from "../components/Homepage";
import { SearchBar } from "../components/SearchBar";

function Home() {
  // useEffect(() => {
  //   fetch("/api/hello")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);
  return (
    <>
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
      <Homepage></Homepage>
    </>
  );
}

export default Home;
