import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { MdEdit, MdDelete } from "react-icons/md";
import { useForm } from "react-hook-form";
import { getAllAPIKeys, updateAllAPIKeys } from "@/lib";

export default function Dashboard() {
  // Switch between the edit and normal view.
  const [editView, setEditView] = useState({});
  // Store all the keys of the current user.
  const [keys, setKeys] = useState({});
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    // Get all the API keys for the current user.
    getAllAPIKeys()
      .then((apiKeys) => setKeys(apiKeys))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // Update the keys are user updates it.
    updateAllAPIKeys(keys);
  }, [keys]);

  const handleSave = async (data) => {
    setEditView(false);
    // 'data' returns the whole object with all the applications as key-value pair.
    // Update the key.
    setKeys(data);
  };

  return (
    <>
      <h1>Dashboard</h1>
      <h2 className="my-2">API Keys</h2>
      {Object.entries(keys).map(([key, value]) =>
        editView[key] ? (
          <>
            <h3 className="my-2">{key}</h3>
            <form onSubmit={handleSubmit(handleSave)}>
              <input
                className="rounded text-black px-2 my-2"
                placeholder={value}
                {...register(key)}
              />
              <div className="flex my-2">
                <TiCancel
                  onClick={() =>
                    setEditView((prevState) => ({ ...prevState, [key]: false }))
                  }
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
          <>
            <Row>
              <Col>{key}</Col>
              <Col>{value || "Empty"}</Col>
              <Col className="flex">
                <MdEdit
                  onClick={() =>
                    setEditView((prevState) => ({
                      ...prevState,
                      [key]: true,
                    }))
                  }
                  size={30}
                  className="mx-2 hover:cursor-pointer"
                />
                <MdDelete size={30} className="mx-2 hover:cursor-pointer" />
              </Col>
            </Row>
          </>
        )
      )}
    </>
  );
}
