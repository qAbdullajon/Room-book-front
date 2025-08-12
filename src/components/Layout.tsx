import $api from "@/http/api"
import { setUser } from "@/store/authSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"

const Layout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const getProfileMe = async () => {
            try {
                const res = await $api.get("/customers/me")
                if (res.status === 200) {
                    dispatch(setUser(res.data.data))
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (localStorage.getItem("accessToken")) getProfileMe()
    }, [])
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default Layout