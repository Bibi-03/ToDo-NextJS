import Link from "next/link";
import React from "react";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";

function ItemList({ todo, handleShowDeleteModal, handleToggle }) {
  return (
    <div className="p-3 shadow-sm bg-white transition hover:shadow-md flex rounded-md flex-nowrap justify-between">
      <div>
        <h3 className="text-xl font-bold">{todo.title}</h3>
        <Link href={`/Todo/${todo.id}`} className="cursor-pointer mt-2 ml-4 text-teal-500 hover:text-teal-600 underline">Ver más</Link>
      </div>
      <div className="flex gap-2 items-center h-6">
        <span
          className={`px-2 rounded-md bg-gray-200 text-sm border-[1px] h-6 ${
            todo.status == "Pendiente"
              ? "bg-yellow-100 border-yellow-600 text-yellow-700"
              : "bg-teal-100 border-teal-600 text-teal-700"
          }`}
        >
          {todo.status}
        </span>

        <button
          className={`${
            todo.status == "Pendiente" ? "text-yellow-500" : "text-teal-500"
          } bg-transparent transition duration-200 hover:bg-transparent hover:scale-120 flex items-center`}
          onClick={() => handleToggle(todo.id, todo.status)}
        >
          {todo.status == "Pendiente" ? (
            <FaToggleOff className="text-2xl" />
          ) : (
            <FaToggleOn className="text-2xl" />
          )}
        </button>
        <button
          className=" text-red-500 bg-transparent transition duration-200 hover:bg-transparent hover:scale-120 flex items-center"
          onClick={() => handleShowDeleteModal(todo.id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default ItemList;

