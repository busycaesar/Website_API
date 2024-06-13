import React from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const registerUser = async (data) => {
    // Make sure all the required data is passed.
    if (
      !data["First Name"] ||
      !data["Username"] ||
      !data["Email"] ||
      !data["Password"] ||
      !data["Confirm Password"]
    )
      return alert("Please fill all the fields.");

    // Make sure all the required data passed is in a valid format.
    //    Make sure the username has only alphanumeric, period and underscore.
    if (!/^[a-zA-Z0-9._]+$/.test(data["Username"]))
      return alert(
        "The username can only contain alphanumeric, period(.) and underscore(_)."
      );
    //    Make sure the email is in the valid format.
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data["Email"]))
      return alert("Please verify the email entered.");
    //    Make sure that both the passwords match.
    if (data["Password"] != data["Confirm Password"])
      return alert("The passwords does not match.");

    try {
      // Call the API function to register the new user.
      // Upon successful response, redirect the user to the dashboard.
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(registerUser)}>
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
          <Link href="/auth/validate">Already have an account?</Link>
        </p>
        <Button variant="light" type="submit">
          Register
        </Button>
      </form>
    </>
  );
}

const formFields = [
  {
    label: "First Name",
    placeholder: "John",
    inputType: "Text",
  },
  {
    label: "Last Name",
    placeholder: "Doe",
    inputType: "Text",
  },
  {
    label: "Username",
    placeholder: "jdoe",
    inputType: "Text",
  },
  ,
  {
    label: "Email",
    placeholder: "jdoe@email.com",
    inputType: "Email",
  },
  ,
  {
    label: "Password",
    placeholder: "",
    inputType: "Password",
  },
  ,
  {
    label: "Confirm Password",
    placeholder: "",
    inputType: "Password",
  },
];
