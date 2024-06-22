import React, { useCallback, useMemo, useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import { completeTask, deleteTask, editTask } from "../redux/taskSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const deletedTasks = useSelector((state) => state.task.deletedTasks);
  const completedTasks = useSelector((state) => state.task.completedTasks);

  const [filter, setFilter] = useState("all");
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({ id: null, title: "" });

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "deleted":
        return deletedTasks;
      case "completed":
        return completedTasks;
      case "weekly":
        return tasks.filter((task) => task.type === "weekly");
      case "monthly":
        return tasks.filter((task) => task.type === "monthly");
      default:
        return tasks;
    }
  }, [filter, tasks, deletedTasks, completedTasks]);

  const toggleTaskSelection = useCallback(
    (taskId) => {
      if (selectedTasks.includes(taskId)) {
        setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
      } else {
        setSelectedTasks([...selectedTasks, taskId]);
      }
    },
    [selectedTasks]
  );

  const handleDeleteSelected = useCallback(() => {
    selectedTasks.forEach((taskId) => {
      const taskToDelete = tasks.find((task) => task.id === taskId);
      if (taskToDelete) {
        dispatch(deleteTask(taskToDelete));
        if (taskToDelete.completed) {
          dispatch(deleteTask({ id: taskId }));
        }
      }
    });
    setSelectedTasks([]);
  }, [dispatch, selectedTasks, tasks]);

  const handleCompleteSelected = useCallback(() => {
    selectedTasks.forEach((taskId) => {
      const taskToComplete = tasks.find((task) => task.id === taskId);
      if (taskToComplete && !taskToComplete.completed) {
        dispatch(completeTask(taskToComplete));
      }
    });
    setSelectedTasks([]);
  }, [dispatch, selectedTasks, tasks]);

  const handleCompleteTask = useCallback(
    (task) => {
      if (!task.completed) {
        dispatch(completeTask(task));
      }
    },
    [dispatch]
  );

  const openEditModal = useCallback((task) => {
    setEditedTask({ id: task.id, title: task.title });
    setEditModalOpen(true);
  }, []);

  const closeEditModal = useCallback(() => {
    setEditModalOpen(false);
  }, []);

  const handleEditTask = useCallback(() => {
    dispatch(editTask({ id: editedTask.id, title: editedTask.title }));
    setEditModalOpen(false);
  }, [dispatch, editedTask]);

  const handleDeleteTask = useCallback((task) => {
    dispatch(deleteTask(task));
    if (task.completed) {
      dispatch(deleteTask({ id: task.id }));
    }
  }, [dispatch]);

  return (
    <div>
      <h3 style={{ display: "flex", justifyContent: "center" }}>Task List!</h3>

      {editModalOpen && (
        <Card>
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeEditModal}>
                &times;
              </span>
              <h2>Edit Task</h2>
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
              />
              <button onClick={handleEditTask}>Save</button>
            </div>
          </div>
        </Card>
      )}
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("deleted")}>Deleted</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("weekly")}>Weekly</button>
        <button onClick={() => setFilter("monthly")}>Monthly</button>
        <button onClick={handleDeleteSelected}>Delete Selected</button>
        <button onClick={handleCompleteSelected}>Complete Selected</button>
      </div>

      {filteredTasks.map((task) => (
        <Card key={task.id}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <input
                type="checkbox"
                checked={selectedTasks.includes(task.id)}
                onChange={() => toggleTaskSelection(task.id)}
                style={{ marginRight: "10px" }}
              />
              <div style={{ marginLeft: "10px", flex: 1 }}>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  {task.title}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    marginBottom: "3px",
                  }}
                >
                  Type: {task.type}
                </p>
                <p style={{ fontSize: "14px", color: "#666" }}>
                  Date: {task.date}
                </p>
              </div>
            </div>
            <div>
              {!task.completed && (
                <>
                  <button onClick={() => handleCompleteTask(task)}>
                    Complete
                  </button>
                  <FaEdit
                    style={{ marginRight: "5px", cursor: "pointer" }}
                    onClick={() => openEditModal(task)}
                  />
                  <FaTrash
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteTask(task)}
                  />
                </>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
