import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle} from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";

const Auth = () => {
  const { isLoggedIn, user } = useAuth();

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="fixed top-5 right-5 ">
      {isLoggedIn ? (
        <div className="">
          <p className="text-slate-600 font-semibold mb-2">{user.email}</p>
          <button className="flex ml-auto bg-red-500 rounded-2xl text-white px-4 py-2" onClick={() => auth.signOut()}>
            Cerrar sesión
          </button>
        </div>
      ) : (
        <button className="flex items-center bg-red-500 text-white rounded-2xl px-4 py-2" onClick={() => handleAuth()}>
          <FaGoogle className="mr-2" />
          Loguearse con Google
        </button>
      )}
    </div>
  );
};

export default Auth;
