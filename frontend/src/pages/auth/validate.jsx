import React from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Validate() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const validateUser = async (data) => {
    // Make sure all the required data is passed.
    if (!data["Username"] || !data["Password"])
      return alert("Please fill all the fields.");

    try {
      // Call the API function to validate the user.
      // Upon successful response, redirect the user to the dashboard.
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <>
      <h1>Validate</h1>
      <form onSubmit={handleSubmit(validateUser)}>
        <p>All the fields are important.</p>
        {formFields.map((field) => (
          <Row key={field.label} className="my-4">
            <Col>
              <label htmlFor={`${field.label}-input`}>{field.label}</label>
            </Col>
            <Col>
              <input
                id={`${field.label}-input`}
                className="rounded text-black px-2"
                type={field.inputType}
                placeholder={field.placeholder}
                {...register(field.label)}
              />
            </Col>
          </Row>
        ))}
        <p>
          <Link href="/auth/register">Dont have an account?</Link>
        </p>
        <Button variant="light" type="submit">
          Validate
        </Button>
      </form>
    </>
  );
}

const formFields = [
  {
    label: "Username",
    placeholder: "",
    inputType: "Text",
  },
  ,
  {
    label: "Password",
    placeholder: "",
    inputType: "Password",
  },
];
