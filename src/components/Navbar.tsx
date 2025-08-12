import { Aperture } from "lucide-react"
import { Link, NavLink } from "react-router-dom"
import { Button } from "./ui/button"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { setUser } from "@/store/authSlice"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import $api from "@/http/api"
import { setOpen } from "@/store/roomSlice"

const Navbar = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)
    const logout = async () => {
        try {
            const res = await $api.get(`/customers/logout/${user?._id}`)
            if (res.status === 200) {
                localStorage.removeItem("accessToken")
                dispatch(setUser(null))
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleCreate = () => {
        dispatch(setOpen(true))
    }

    return (
        <div className="w-full fixed top-0 bg-[#111827] py-6">
            <div className="w-[85%] mx-auto flex justify-between items-center">
                <NavLink to={'/'} className="flex items-center gap-2 cursor-pointer text-blue-500">
                    <Aperture size={36} />
                    <p className="text-xl font-medium leading-5">MINI ROOM <br /> BOOKING SYSTEM</p>
                </NavLink>

                {
                    user && (
                        <NavLink className='' to={'/my-bookings'}>
                            My Bookings
                        </NavLink>
                    )
                }

                <div className="flex gap-4 items-center">
                    {user && (
                        <Button onClick={handleCreate} className="rounded-full font-bold" size={"lg"} variant={"outline"}>
                            Create room
                        </Button>
                    )}

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback className="text-black uppercase">{user.fullName[0]}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel className="line-clamp-1">{user.email}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link to={"/auth"}>
                            <Button size={"lg"} className="rounded-full font-bold">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar