import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { MdEdit, MdDelete } from "react-icons/md";
import { useForm } from "react-hook-form";

export default function Dashboard() {
  // Switch between the edit and normal view.
  const [editView, setEditView] = useState(false);
  // Store all the keys of the current user.
  const [keys, setKeys] = useState("");
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    // Get all the API keys for the current user.
  }, []);

  const handleSave = async (data) => {
    setEditView(false);
    setKeys(data.github);
  };

  return (
    <>
      <h1>Dashboard</h1>
      <h2 className="my-2">API Keys</h2>
      {editView ? (
        <>
          <h3 className="my-2">GitHub</h3>
          <form onSubmit={handleSubmit(handleSave)}>
            <input
              className="rounded text-black px-2 my-2"
              placeholder={keys}
              {...register("github")}
            />
            <div className="flex my-2">
              <TiCancel
                onClick={() => setEditView(false)}
                size={30}
                className="mx-2 hover:cursor-pointer"
              />
              <button type="submit">
                <FaSave size={25} className="mx-2 hover:cursor-pointer" />
              </button>
            </div>
          </form>
        </>
      ) : (
        <Row>
          <Col>GitHub</Col>
          <Col>{keys}</Col>
          <Col className="flex">
            <MdEdit
              onClick={() => setEditView(true)}
              size={30}
              className="mx-2 hover:cursor-pointer"
            />
            <MdDelete size={30} className="mx-2 hover:cursor-pointer" />
          </Col>
        </Row>
      )}
    </>
  );
}
