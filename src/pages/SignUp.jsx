import { useState } from "react"
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai"
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {db} from "../firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const {fullName, email, password} = formData;
  const navigate = useNavigate();
  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  async function onSubmit(e){
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      updateProfile(auth.currentUser, {
        displayName: fullName
      })
      const user = userCredential.user;
      //console.log(user);
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy)
      toast.success("Registro exitoso")
      navigate("/");
    } catch (error) {
      //console.log(error);
      toast.error("Error de registro")
    }
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Crear Cuenta</h1>
      <div className="lg:flex justify-center items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80" alt="log-img" className="w-full rounded-2xl"/>
        </div>
        <div className="w-full md:w-[67%] lg-w[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input className="w-full px-4 py-2 text-xl rounded transition ease-in-out mb-6" type="text" id="fullName" value={fullName} 
              onChange={onChange} placeholder="Nombre Completo" />
            <input className="w-full px-4 py-2 text-xl rounded transition ease-in-out mb-6" type="email" id="email" value={email} 
            onChange={onChange} placeholder="Email" />
            <div className="relative mb-6">
              <input className="w-full px-4 py-2 text-xl rounded transition ease-in-out" type= {showPassword ? "text" : "password"} id="password" value={password} 
              onChange={onChange} placeholder="Contraseña" />
              {showPassword ? (<AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer"
              onClick={()=>setShowPassword((prevState)=>!prevState)} />) 
              : <AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer"
              onClick={()=>setShowPassword((prevState)=>!prevState)}/> }
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">Ya tiene cuenta? 
                <Link to="/sign-in" className="text-blue-500 hover:text-blue-700 ml-1"> Iniciar Sesión</Link>
              </p>
              <p>
                <Link to="/forgot-password" className="text-red-500 hover:text-red-700 ml-1">Olvidó la contraseña?</Link>
              </p>
            </div>
            <button className="w-full bg-purple-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md
            hover:bg-purple-800 active:bg-purple-900"
            type="submit">
              Iniciar
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
