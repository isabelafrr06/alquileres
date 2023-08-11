import { useState } from "react"
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  function onChange(e){
    setEmail(e.target.value)
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Recuperar contraseña</h1>
      <div className="lg:flex justify-center items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80" alt="log-img" className="w-full rounded-2xl"/>
        </div>
        <div className="w-full md:w-[67%] lg-w[40%] lg:ml-20">
          <form >
            <input className="w-full px-4 py-2 text-xl rounded transition ease-in-out mb-6" type="email" id="email" value={email} 
            onChange={onChange} placeholder="Email" />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">Ya tiene cuenta? 
                <Link to="/sign-in" className="text-blue-500 hover:text-blue-700 ml-1"> Iniciar Sesión</Link>
              </p>
              <p>
                <Link to="/sign-up" className="text-red-500 hover:text-red-700 ml-1">Registrarse</Link>
              </p>
            </div>
            <button className="w-full bg-purple-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md
            hover:bg-purple-800 active:bg-purple-900"
            type="submit">
              Restaurar contraseña
            </button>
            <div className="flex items-center my-4 before:border-t before:border-gray-500 before:flex-1 
              after:border-t after:border-gray-500 after:flex-1">
              <p className="text-center font-bold mx-4 ">O</p>
            </div>
            <OAuth/>
          </form>
          
        </div>
      </div>
    </section>
  )
}
