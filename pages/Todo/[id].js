import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import Link from "next/link";

function TodoDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({});

  useEffect(() => {
    const getDocumentById = async () => {
      try {
        const docRef = doc(db, "todo", id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const documentData = docSnapshot.data();
          setData(documentData);
        } else {
          console.log(
            "No se encontró ningún documento con el ID proporcionado."
          );
        }
      } catch (error) {
        console.error("Error al recuperar el documento:", error);
      }
    };
    getDocumentById();
  }, []);
  return (
    <div className="py-6">
        <Link href="/" className="cursor-pointer p-2 mt-8 ml-4 bg-teal-500 text-white transition-colors hover:bg-teal-600 rounded-2xl ">Volver</Link>
      <h1 className="text-xl font-bold py-8">Detalles del ToDo</h1>
      {Object.keys(data).length === 0 ? (
        <p>No se encontró ningún dato para mostrar.</p>
      ) : (
        <div className="bg-gray-200 rounded-lg p-6 mx-auto max-w-3xl">
          {/* <p>ID: {id}</p> */}
          <p className="font-bold">Título: </p> <p>{data.title}</p>
          <p className=" font-bold py-1">Descripción: </p> <p>{data.description}</p>
          <p className="font-bold py-1">Estado: </p><p>{data.status}</p>
        </div>
      )}
    </div>
  );
}

export default TodoDetails;
