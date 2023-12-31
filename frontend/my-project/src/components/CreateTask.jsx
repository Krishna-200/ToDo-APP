import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const CreateTask = ({ closeModal, taskStatus }) => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState(taskStatus);
  const [formErrors, setFormErrors] = useState({});
  const initialValues = { title: "", startDate: "", endDate: "" };

  const validateForm = () => {
    let errors = {};

    if (!title.trim()) {
      errors.title = "Task name is required";
    }

    if (!startDate) {
      errors.startDate = "Start date is required";
    }

    if (!endDate) {
      errors.endDate = "Deadline is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const task = {
        title: title,
        startDate: startDate,
        endDate: endDate,
        status: status,
      };

      try {
        const res = await axios.post(
          `http://localhost:3000/${id}/createtask`,
          task
        );
        const [result, _] = res.data;
        console.log(result);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-1/2 drop-shadow-2xl rounded-2xl outline-none p-4 bg-white m-auto mt-64">
      <div className="">
        <div className="flex justify-between">
          <span className="text-xl font-semibold ml-4 mb-4">Add New Task</span>
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
          <label className="m-5 text-xs">Name of the Task</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className={`border-4 w-11/12 mx-4 p-2 rounded-xl outline-none ${
              formErrors.title ? "border-red-500" : ""
            }`}
            value={title}
          />
          {formErrors.title && (
            <p className="text-red-500 text-xs">{formErrors.title}</p>
          )}

          <div className="w-full text-xs mt-2 mb-1">
            <label className="mr-64 ml-5">start date</label>
            <label className="ml-6"> deadline</label>
          </div>
          <div className="w-full">
            <input
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              className={`w-80 border-4 mx-4 p-2 rounded-xl outline-none ${
                formErrors.startDate ? "border-red-500" : ""
              }`}
              value={startDate}
            />
            {formErrors.startDate && (
              <p className="text-red-500 text-xs">{formErrors.startDate}</p>
            )}
            <input
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
              className={`w-80 border-4 p-2 rounded-xl outline-none ${
                formErrors.endDate ? "border-red-500" : ""
              }`}
              value={endDate}
            />
            {formErrors.endDate && (
              <p className="text-red-500 text-xs">{formErrors.endDate}</p>
            )}
          </div>
          <label className="m-4 text-xs"> status</label>
          <select
            onChange={(e) => setStatus(e.target.value)}
            className={`w-11/12 border-4 p-2 mr-6 ml-4 rounded-xl outline-none ${
              formErrors.endDate ? "border-red-500" : ""
            }`}
            value={status}
          >
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="toReview">To Review</option>
            <option value="completed">Completed</option>
          </select>

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

export default CreateTask;
