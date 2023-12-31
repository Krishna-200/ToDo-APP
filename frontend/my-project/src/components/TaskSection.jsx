import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import CreateTask from "./CreateTask";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import EditTask from "./EditTask";

function TaskSection({ stat, handleEdit }) {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("todo");
  const [openModal, setOpenModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [re, setRe] = useReducer((x) => x + 1, 0);
  function refun(val) {
    setRe(val);
  }
  const getTasks = async () => {
    const res = await axios.get(`https://todo-6aqd.onrender.com/${id}`);
    setTasks(res.data);
  };

  const data = tasks.filter((task) => {
    return task.status === stat;
  });

  useEffect(() => {
    getTasks();
  }, [openModal, openEdit, handleEdit]);

  const handle = (task) => {
    setSelectedTask(task);
    setOpenEdit(true);
  };
  // console.log(props.status);

  return (
    <div>
      <div className="bg-white border-r-neutral-50 border-2 h-screen ">
        <h1
          className={`ml-4 mt-2 font-semibold w-fit p-2 pt-1 pb-1 rounded-lg bg-${stat}-primary text-${stat}-textPrimary`}
        >
          {stat}
        </h1>
        <div>
          {data.map((ele) => (
            <div onClick={() => handle(ele)}>
              <div className="p-2 shadow-lg  m-5 rounded-lg ">
                <div className="text-medium font-semibold m-3 mb-1">
                  {ele.task}
                </div>
                <div className="mb-1">
                  <span className="m-3 mr-14 text-zinc-500 text-sm">
                    Start Date
                  </span>
                  <span className=" text-zinc-500 text-sm">Deadline</span>
                </div>
                <div className="ml-3 mt-2 mb-3">
                  <span
                    className={`p-3 pt-1 pb-1 mr-6 bg-${stat}-primary text-${stat}-textPrimary rounded-lg text-sm`}
                  >
                    {moment(ele.start_date).format("DD/MM/YYYY")}
                  </span>
                  <span
                    className={`p-3 pt-1 pb-1 bg-${stat}-primary text-${stat}-textPrimary rounded-lg text-sm`}
                  >
                    {moment(ele.deadlink).format("DD/MM/YYYY")}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              setOpenModal(true);
            }}
            className={`ml-4 mt-4 w-11/12 bg-${stat}-primary font-semibold rounded-lg text-${stat}-textPrimary py-1 outline-none`}
          >
            + Add New Task
          </button>
        </div>
        <ReactModal isOpen={openModal} className="h-screen">
          {openModal && (
            <CreateTask closeModal={setOpenModal} taskStatus={stat} />
          )}
        </ReactModal>
      </div>
      <ReactModal isOpen={openEdit} className="h-screen">
        {openEdit && <EditTask closeEdit={setOpenEdit} task={selectedTask} />}
      </ReactModal>
    </div>
  );
}

export default TaskSection;
