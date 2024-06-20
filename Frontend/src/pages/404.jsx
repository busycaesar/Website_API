import React from "react";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <h1>Ahhhh!</h1>
      <p>Wish this page exist!</p>
      <p>
        No worries! Lets <Link href="/dashboard">go back</Link>.
      </p>
    </>
  );
}
