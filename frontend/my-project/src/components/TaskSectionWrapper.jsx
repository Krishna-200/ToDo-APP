import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import CreateTask from "./CreateTask";
import ReactModal from "react-modal";
import EditTask from "./EditTask";
import TaskSection from "./TaskSection";

function TaskSectionWrapper(props) {
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleEdit = (task) => {
    setSelectedTask(task);
    setOpenEdit(true);
  };

  return (
    <div>
      <TaskSection status={props.status} onEdit={handleEdit} />

      <ReactModal isOpen={openEdit} className="h-screen">
        {openEdit && (
          <EditTask
            task={selectedTask}
            closeEdit={() => {
              setOpenEdit(false);
              setSelectedTask(null);
            }}
          />
        )}
      </ReactModal>
    </div>
  );
}

export default TaskSectionWrapper;
