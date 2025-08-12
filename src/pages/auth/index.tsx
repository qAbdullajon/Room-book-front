import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import Login from "@/components/auth/login"
import Register from "@/components/auth/register"

const AuthPage = () => {
  const auth = useSelector((state: RootState) => state.auth.authState)

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[80%] lg:w-1/3 px-8 py-3 bg-[#111827] rounded-md">
        {auth === "login" && <Login />}
        {auth === "register" && <Register />}
      </div>
    </div>
  )
}

export default AuthPage