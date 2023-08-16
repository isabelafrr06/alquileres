import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Profile() {
	const auth = getAuth();
	const navigate = useNavigate();
	const [changeDetail, setChangeDetail] = useState(false);
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});
	const { name, email } = formData;
	function onLogout() {
		auth.signOut();
		navigate("/");
	}
	function onChange(e) {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	}
	async function onSubmit() {
		try {
			if (auth.currentUser.displayName !== name) {
				//update name in firebase
				await updateProfile(auth.currentUser, { displayName: name });
				//update firestore
				const docRef = doc(db, "users", auth.currentUser.uid);
				await updateDoc(docRef, { name: name });
			}
			toast.success("Perfil actualizado");
		} catch (error) {
			toast.error("No se pudo actualizar");
		}
	}
	return (
		<>
			<section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
				<h1 className="text-3xl text-center mt-6 font-bold">Perfil</h1>
				<div className="w-full md:w-[50%] mt-6 px-3 ">
					<form>
						{/*Name input*/}
						<input
							type="text"
							id="name"
							value={name}
							disabled={!changeDetail}
							onChange={onChange}
							className={`w-full px-4 py-2 mt-2 text-xl text-gray-600 
              bg-white border border-gray-300 rounded ${
								changeDetail && "bg-red-200 focus:bg-red-200"
							}`}
						/>

						{/*Email input*/}
						<input
							type="email"
							id="email"
							value={email}
							disabled
							className="w-full px-4 py-2 mt-2 text-xl text-gray-600 
              bg-white border border-gray-300 rounded"
						/>
						<div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mt-2 mb-6">
							<p className="flex items-center">
								Cambiar nombre?
								<span
									onClick={() => {
										changeDetail && onSubmit();
										setChangeDetail((prevState) => !prevState);
									}}
									className="text-red-500 hover:text-red-600 ml-1 cursor-pointer"
								>
									{changeDetail ? "Aplicar cambios" : "Editar"}
								</span>
							</p>
							<p
								onClick={onLogout}
								className="text-blue-500 hover:text-blue-600"
							>
								Cerrar sesión
							</p>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}
