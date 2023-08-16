import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
	const [pageState, setPageState] = useState("Iniciar sesión");
	const location = useLocation();
	//console.log(location.pathname)
	const navigate = useNavigate();
	const auth = getAuth();
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setPageState("Perfil");
			} else {
				setPageState("Iniciar sesión");
			}
		});
	}, [auth]);
	function pathMatchRoute(route) {
		if (route === location.pathname) {
			return true;
		}
	}
	return (
		<div className="bg-white border-b shadow-sm sticky top-0 z-50">
			<header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
				<div>
					<img
						src=""
						alt="logo"
						className="h-5 cursor-pointer"
						onClick={() => navigate("/")}
					/>
				</div>
				<div>
					<ul className="flex space-x-5">
						<li
							className={`cursor-pointer py-3 text-sm font-semibold text-gray-500 ${
								pathMatchRoute("/") && "text-black border-b-4 border-b-red-500"
							}`}
							onClick={() => navigate("/")}
						>
							Inicio
						</li>
						<li
							className={`cursor-pointer py-3 text-sm font-semibold text-gray-500 ${
								pathMatchRoute("/offers") &&
								"text-black border-b-4 border-b-red-500"
							}`}
							onClick={() => navigate("/offers")}
						>
							Ofertas
						</li>
						<li
							className={`cursor-pointer py-3 text-sm font-semibold text-gray-500 ${
								(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
								"text-black border-b-4 border-b-red-500"
							}`}
							onClick={() => navigate("/profile")}
						>
							{pageState}
						</li>
					</ul>
				</div>
			</header>
		</div>
	);
}
