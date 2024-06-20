import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main
      className={`flex py-4 bg-black text-white min-h-screen flex-col items-center ${inter.className}`}
    >
      <Component {...pageProps} />
    </main>
  );
}
