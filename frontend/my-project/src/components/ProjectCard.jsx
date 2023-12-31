import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const ProjectCard = ({ id, title }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`https://todo-6aqd.onrender.com/${id}`);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-blue-200 text-blue-500 font-semibold uppercase  py-3 px-5 mx-7 my-4  text-center rounded-lg outline-none">
      <Link to={`/${id}`} className="flex items-center justify-between">
        <span className="w-5/6 text-left ">{title}</span>

        <button onClick={handleDelete} className=" ml-2">
          <MdDelete className="text-red-500" />
        </button>
      </Link>
    </div>
  );
};

export default ProjectCard;
