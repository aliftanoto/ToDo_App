import React, { useState, useEffect } from "react";
import { db, addDoc, getDocs, updateDoc, deleteDoc, doc, collection } from "../firebaseConfig";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");

  // Fetch tasks from Firestore on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const tasksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Add task to Firestore
  const addTask = async () => {
    if (!taskTitle || !taskDescription) return;

    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        title: taskTitle,
        description: taskDescription,
      });

      setTasks([...tasks, { id: docRef.id, title: taskTitle, description: taskDescription }]);
      setTaskTitle("");
      setTaskDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Edit task
  const editTask = (id, title, description) => {
    setEditId(id);
    setEditTaskTitle(title);
    setEditTaskDescription(description);
  };

  // Update task in Firestore
  const updateTask = async () => {
    if (!editTaskTitle || !editTaskDescription || !editId) return;

    try {
      const taskDoc = doc(db, "tasks", editId); // Correctly reference the Firestore document
      await updateDoc(taskDoc, {
        title: editTaskTitle,
        description: editTaskDescription,
      });

      setTasks(
        tasks.map((task) =>
          task.id === editId ? { id: editId, title: editTaskTitle, description: editTaskDescription } : task
        )
      );

      setEditId(null);
      setEditTaskTitle("");
      setEditTaskDescription("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task from Firestore
  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-yellow-50 min-h-screen p-4">
      {/* Add Task */}
      <div className="bg-yellow-100 p-6 rounded-xl shadow-lg w-full max-w-3xl mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Add Task</h2>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Task Title..."
          className="w-full p-3 mb-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Write your task here..."
          className="w-full p-3 mb-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 h-32"
        ></textarea>
        <button onClick={addTask} className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600">
          Save
        </button>
      </div>

      {/* Task List */}
      <div className="w-full max-w-md mt-4 bg-yellow-300 p-4 rounded-lg shadow-md">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="bg-orange-700 text-white p-4 mb-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p className="mb-2">{task.description}</p>
              <div className="flex justify-end space-x-2">
                <button onClick={() => editTask(task.id, task.title, task.description)} className="px-3 py-1 bg-yellow-500 rounded-lg hover:bg-yellow-600">
                  Edit
                </button>
                <button onClick={() => deleteTask(task.id)} className="px-3 py-1 bg-red-500 rounded-lg hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No tasks added yet.</p>
        )}
      </div>

      {/* Edit Modal */}
      {editId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Task</h3>
            <input
              type="text"
              value={editTaskTitle}
              onChange={(e) => setEditTaskTitle(e.target.value)}
              className="w-full p-3 mb-4 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-yellow-500"
            />
            <textarea
              value={editTaskDescription}
              onChange={(e) => setEditTaskDescription(e.target.value)}
              className="w-full p-3 mb-4 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-yellow-500 h-32"
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button onClick={updateTask} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Update
              </button>
              <button onClick={() => setEditId(null)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
