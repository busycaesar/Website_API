import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex bg-black text-white min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      <h1 className="text-4xl my-4">Welcome to Website API</h1>
    </main>
  );
}
