import React from "react";
import ProjectCard from "./ProjectCard";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";

import axios from "axios";
import CreateProject from "./CreateProject";

const MainMenu = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const getData = async () => {
    const response = await axios.get("http://localhost:3000/allProjects");
    setData(response.data);
    // console.log(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" border-2 border-inherit h-screen ">
      <div className="flex m-7 gap-3 items-center">
        <svg
          width="21"
          height="21"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.00489621 12.6196H6.40343V15.6993H0.00489621V12.6196ZM9.60147 12.6196H15.9959V15.6993H9.60147V12.6196ZM0 6.46015H15.9976V9.53987H0V6.46015ZM0.00489621 0.30072H9.6031V3.38044H0.00489621V0.30072ZM12.8011 0.30072H16V3.38044H12.8011V0.30072Z"
            fill="#263FA0"
          />
        </svg>

        <span className="text-2xl font-bold  ">Task Boards</span>
      </div>
      <div>
        {data.map((ele) => (
          <div key={ele.id}>
            <ProjectCard title={ele.title} id={ele.id} />
          </div>
        ))}
      </div>
      <button
        className=" m-2 ml-8 w-56 text-blue-500 font-semibold p-4 pt-2 pb-2 rounded-lg outline-none"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        +Add New Project
      </button>
      <ReactModal isOpen={openModal} className="h-screen">
        {openModal && <CreateProject closeModal={setOpenModal} />}
      </ReactModal>
    </div>
  );
};

export default MainMenu;
