import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
export default function OAuth() {
	const navigate = useNavigate();
	async function onGoogleClick() {
		try {
			const auth = getAuth();
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			// User Exist?
			const docRef = doc(db, "users", user.uid);
			const docSnap = await getDoc(docRef);
			if (!docSnap.exists()) {
				await setDoc(docRef, {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				});
				navigate("/");
			}
		} catch (error) {
			toast.error("No autorizado");
		}
	}
	return (
		<button
			onClick={onGoogleClick}
			type="button"
			className="flex items-center w-full justify-center bg-red-600
     text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800
     active:bg=red=900 shadow-md rounded"
		>
			<FcGoogle className=" text-2x1 bg-white rounded-full mr-2" />
			Continuar con Google
		</button>
	);
}
