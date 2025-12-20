import "../styles/style.css";
import { Toaster } from "@/components/ui/sonner";

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
}
