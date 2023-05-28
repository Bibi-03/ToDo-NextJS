import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { addTodo } from "../api/todo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pendiente");
  const [isLoading, setIsLoading] = useState(false);

  const { isLoggedIn, user } = useAuth();

  const handleTodoCreate = async () => {
    if (!isLoggedIn) {
      toast.error('Debe iniciar sesión', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }
    setIsLoading(true);
    const todo = {
      title,
      description,
      status,
      userId: user.uid,
    };
    await addTodo(todo);
    setIsLoading(false);

    setTitle("");
    setDescription("");
    setStatus("Pendiente");

    toast.success('Creado exitosamente', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  return (
    <div className="w-40 mx-auto mt-36">
      <div className="flex flex-col space-y-4">
        <input
          className="p-2 border border-gray-300"
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="p-2 border border-gray-300 h-40 w-40 resize-none"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="p-2 border border-gray-300"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pendiente" className="text-yellow-500 font-bold">
            Pendiente ⌛
          </option>
          <option value="Completado" className="text-green-500 font-bold">
            Completado ✅
          </option>
        </select>

        <button
          className={`p-2 bg-teal-500 text-white rounded ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => handleTodoCreate()}
          disabled={title.length < 1 || description.length < 1 || isLoading}
        >
          Añadir
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
