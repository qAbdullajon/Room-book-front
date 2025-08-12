import { $axios } from "@/http"
import $api from "@/http/api"
import { setOpen, setRooms, setValRoom } from "@/store/roomSlice"
import type { RootState } from "@/store/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import RoomImage from "@/assets/room.jpg"
import { DialogDemo } from "@/components/RoomModal"
import BookingModal from "@/components/BookingModal"
import { setOpenBook } from "@/store/bookSlice"

interface RoomType {
    name: string;
    capacity: string;
    price: string;
    _id: string;
}

const Home = () => {
    const dispatch = useDispatch()
    const rooms = useSelector((state: RootState) => state.rooms.rooms)
    const user = useSelector((state: RootState) => state.auth.user)

    useEffect(() => {

        const getRooms = async () => {
            try {
                const res = await $axios.get(`/room/get`)
                if (res.status === 200) {
                    dispatch(setRooms(res.data.data))
                }
            } catch (error) {
                console.log(error);
            }
        }
        getRooms()
    }, [])

    const handleBook = (room: RoomType) => {
        dispatch(setOpenBook({ isOpen: true, roomId: room._id }))
    }
    const handleUpdate = (room: RoomType) => {
        dispatch(setValRoom(room))
        dispatch(setOpen(true))
    }

    const handleDelete = async (id: String) => {
        if (confirm("Bu roomni o‘chirmoqchimisiz?")) {
            try {
                const res = await $api.delete(`/room/delete/${id}`)
                if (res.status === 200) {
                    const newRooms = rooms.filter((item) => item._id !== id)
                    dispatch(setRooms(newRooms))
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {rooms.length === 0 && (
                    <p>Rooms not found</p>
                )}
                {rooms?.map((room, i) => (
                    <div
                        key={i}
                        className="bg-[#111827] rounded-2xl shadow-md border border-gray-200/20 hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                        <img
                            src={RoomImage}
                            alt={room.name}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-5">
                            <h2 className="text-xl font-bold text-white">{room.name}</h2>
                            <p className="text-gray-400 mt-2">Capacity: <span className="font-medium">{room.capacity}</span></p>
                            <p className="text-gray-400">Price: <span className="font-medium">${room.price}</span></p>

                            {
                                user && (
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => handleBook(room)}
                                            className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            Book
                                        </button>
                                        <button
                                            onClick={() => handleUpdate(room)}
                                            className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(room._id)}
                                            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ))}
            </div>

            <DialogDemo />
            <BookingModal />
        </>
    )
}

export default Home