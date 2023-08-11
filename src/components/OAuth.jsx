import {FcGoogle} from "react-icons/fc"
export default function OAuth() {
  return (
    <button className="flex items-center w-full justify-center bg-red-600
     text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800
     active:bg=red=900 shadow-md rounded">
        <FcGoogle className=" text-2x1 bg-white rounded-full mr-2"/>
        Continuar con Google
    </button>
  )
}
