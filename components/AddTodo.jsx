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

  const handleTodoCreate = async (e) => {
    e.preventDefault()
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
    <div className="w-full flex justify-center mt-36 mb-10">
      <form className=" max-w-md w-full px-5 flex flex-col gap-3" onSubmit={handleTodoCreate}>
        <input
          className="p-2 rounded-2xl border border-gray-300 w-full focus:ring-teal-200 focus:ring-4 focus:border-teal-500 focus:outline-none"
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="p-2 rounded-2xl border border-gray-300 h-40 w-full resize-none focus:ring-teal-200 focus:ring-4 focus:border-teal-500 focus:outline-none"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="p-2 rounded-2xl border border-gray-300 w-full focus:ring-teal-200 focus:ring-4 focus:border-teal-500 focus:outline-none"
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
          className={`p-2 bg-teal-500 text-white w-full transition-colors cursor-pointer hover:bg-teal-600 rounded-2xl ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          type="submit"
          disabled={title.length < 1 || description.length < 1 || isLoading}
        >
          Añadir
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
