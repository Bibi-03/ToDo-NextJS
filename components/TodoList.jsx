import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "../api/todo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ItemList from "./ItemList";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [todoIdToDelete, setTodoIdToDelete] = useState(null);

  const { user } = useAuth();
  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(collection(db, "todo"), where("user", "==", user.uid));

    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
    });
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  // const handleTodoDelete = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this todo?")) {
  //     deleteTodo(id);
  //     toast.success("Todo deleted successfully");
  //   }
  // };
  const handleShowDeleteModal = (id) => {
    setTodoIdToDelete(id);
    setShowDeleteModal(true);
  };

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
    setTodoIdToDelete(null);
  };

  const handleConfirmDelete = async () => {
    deleteTodo(todoIdToDelete);
    toast.success("Tarea eliminada exitosamente");
    handleHideDeleteModal();
  };

  const handleToggle = async (id, status) => {
    const newStatus = status == "Completado" ? "Pendiente" : "Completado";
    await toggleTodoStatus({ docId: id, status: newStatus });
    newStatus == "Completado" ? "Marcar completado" : "Marcar pendiente";
    if (newStatus == "Completado") {
      toast.success("Marcar completado", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warn("Marcar pendiente", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-5 py-10 bg-slate-100">
        {todos &&
          todos.map((todo) => {
            return (
              <ItemList
                key={todo.id}
                todo={todo}
                handleToggle={handleToggle}
                handleShowDeleteModal={handleShowDeleteModal}
              />
            );
          })}
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded shadow-lg">
            <h3 className="text-xl mb-4">Confirmar eliminación</h3>
            <p className="mb-4">
              ¿Estás seguro de que deseas eliminar esta tarea?
            </p>
            <div className="flex justify-end">
              <button
                className="mr-2 bg-teal-500 text-white px-4 py-2 rounded"
                onClick={handleConfirmDelete}
              >
                Aceptar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleHideDeleteModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
