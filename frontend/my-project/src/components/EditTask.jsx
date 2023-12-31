import React, { useState } from "react";
import moment from "moment";
import axios from "axios";

const EditTask = ({ task, closeEdit }) => {
  const task_id = task.task_id;
  const [title, setTitle] = useState(task.task);
  const [startDate, setStartDate] = useState(
    moment(task.start_date).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(task.deadlink).format("YYYY-MM-DD")
  );
  console.log(startDate, endDate);
  const [status, setStatus] = useState(task.status);

  const [titleError, setTitleError] = useState("");

  const validateTitle = () => {
    if (!title.trim()) {
      setTitleError("Task name is required");
    } else {
      setTitleError("");
    }
  };

  const handleSubmit = async () => {
    validateTitle();

    if (titleError) {
      return;
    }

    try {
      const res = await axios.put(
        `https://todo-6aqd.onrender.com/${task_id}/update`,
        {
          task: title,
          start_date: startDate,
          deadlink: endDate,
          status,
        }
      );
      closeEdit(false);
      console.log(res);
      setTitle(res.data.task);
      setStatus(res.data.status);
      setStartDate(res.data.start_date);
      setEndDate(res.data.end_date);
      // console.log(title, status, startDate, endDate);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-1/2 drop-shadow-2xl rounded-2xl outline-none p-4 bg-white m-auto mt-64">
      <div className="flex justify-between">
        <span className="text-xl font-semibold ml-4 mb-4">Edit Your Task</span>
        <button
          className=" mr-10 font-bold"
          onClick={() => {
            closeEdit(false);
          }}
        >
          X
        </button>
      </div>
      <form>
        <label className="m-5 text-xs">Name of the Task</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            validateTitle();
          }}
          className={`border-4 w-11/12 mx-4 p-2 rounded-xl outline-none ${
            titleError && "border-red-500"
          }`}
        />
        {titleError && <p className="text-red-500 text-xs">{titleError}</p>}

        <div className="w-full text-xs mt-2 mb-1">
          <label className="mr-64 ml-5">Start Date</label>
          <label className="ml-6">Deadline</label>
        </div>

        <div className="w-full">
          <input
            type="date"
            value={moment(startDate).format("YYYY-MM-DD")}
            onChange={(e) => setStartDate(e.target.value)}
            className={`w-80 border-4 mx-4 p-2 rounded-xl outline-none`}
          />
          <input
            type="date"
            value={moment(endDate).format("YYYY-MM-DD")}
            onChange={(e) => setEndDate(e.target.value)}
            className={`w-80 border-4 p-2 rounded-xl outline-none `}
          />
        </div>

        <label className="m-4 text-xs">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`w-11/12 border-4 p-2 mr-6 ml-4 rounded-xl outline-none `}
        >
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="toReview">To Review</option>
          <option value="completed">Completed</option>
        </select>

        <div className=" flex  justify-end mr-10 mt-4">
          <button
            type="button"
            onClick={() => closeEdit(false)}
            className="mr-3 p-4 pt-2 pb-2 rounded-lg bg-blue-100 text-blue-500 text-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="p-2 rounded-lg pt-1 pb-1 pr-4 pl-4 bg-blue-600 text-white text-xs"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
