import React from "react";
import { Button } from "react-bootstrap";
import Link from "next/link";

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <Link href="/dashboard/addapi">
        <Button className="my-3" variant="light">
          Add API Key
        </Button>
      </Link>
      <h2 className="my-2">Stored API Keys</h2>
    </>
  );
}
