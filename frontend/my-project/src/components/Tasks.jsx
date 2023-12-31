import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TaskSection from "./TaskSection";
import TaskSectionWrapper from "./TaskSectionWrapper";
import { data } from "autoprefixer";

const Tasks = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");

  const getTitle = async () => {
    const res = await axios.get(`https://todo-6aqd.onrender.com/title/${id}`);
    const [data] = res.data;
    // console.log(data.title);
    setTitle(data.title);
  };

  useEffect(() => {
    getTitle();
  }, []);

  return (
    <div>
      <h1 className="border-2 border-b-gray-50 p-4 font-semibold text-xl ">
        {title}
      </h1>
      <div className="grid grid-cols-4">
        <TaskSectionWrapper status={"todo"} />
        <TaskSectionWrapper status={"inProgress"} />
        <TaskSectionWrapper status={"toReview"} />
        <TaskSectionWrapper status={"completed"} />
      </div>
    </div>
  );
};

export default Tasks;
