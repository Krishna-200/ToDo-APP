import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProject = ({ closeModal }) => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const getData = async () => {
    const response = await axios.get(
      "https://todo-6aqd.onrender.com/allProjects"
    );
    setData(response.data);
  };

  const validateForm = () => {
    let errors = {};

    if (!title.trim()) {
      errors.title = "Name of the Project is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const project = {
        title: title,
      };

      try {
        console.log(project);
        const res = await axios.post(
          "https://todo-6aqd.onrender.com/createProject",
          project
        );
        const [result, _] = res.data;
        //getData();
        closeModal(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [closeModal]);

  return (
    <div className="w-1/2 drop-shadow-2xl rounded-2xl outline-none p-4 bg-white m-auto mt-64">
      <div className="">
        <div className="flex justify-between">
          <span className="text-xl font-semibold ml-4 mb-4">
            Add New Project
          </span>
          <button
            className=" mr-10 font-bold"
            onClick={() => {
              closeModal(false);
            }}
          >
            X
          </button>
        </div>
        <form>
          <label className="m-5 text-xs">Name of the Project</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className={`border-4 w-11/12 mx-4 p-2 rounded-xl outline-none ${
              formErrors.title ? "border-red-500" : ""
            }`}
          />
          {formErrors.title && (
            <p className="text-red-500 text-xs">{formErrors.title}</p>
          )}

          <div className=" flex  justify-end mr-10 mt-4">
            <button
              type="button"
              onClick={() => {
                closeModal(false);
              }}
              className="mr-3 p-4 pt-2 pb-2 rounded-lg bg-blue-100 text-blue-500 text-xs"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="p-2 rounded-lg pt-1 pb-1 pr-4 pl-4 bg-blue-600 text-white text-xs"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
