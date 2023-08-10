import { useLocation, useNavigate } from "react-router-dom"

export default function Header() {
    const location = useLocation()
    //console.log(location.pathname)
    const navigate = useNavigate()
    function pathMathRoute(route) {
        if (route === location.pathname) {
            return true
        }
    }
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
            <div>
                <img src="" alt="logo" className="h-5 cursor-pointer" onClick={()=>navigate("/")} />
            </div>
            <div>
                <ul className="flex space-x-5">
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-500 ${pathMathRoute("/") && "text-black border-b-4 border-b-red-500"}`} onClick={()=>navigate("/")}>Inicio</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-500 ${pathMathRoute("/offers") && "text-black border-b-4 border-b-red-500"}`} onClick={()=>navigate("/offers")}>Ofertas</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-500 ${pathMathRoute("/sign-in") && "text-black border-b-4 border-b-red-500"}`} onClick={()=>navigate("/sign-in")}>Iniciar Sesión</li>
                </ul>
            </div>
        </header>
    </div>
  )
}
