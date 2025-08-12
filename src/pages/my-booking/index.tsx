import $api from "@/http/api"
import { setBooks } from "@/store/bookSlice"
import { RootState } from "@/store/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import RoomImage from "@/assets/room.jpg"

interface BookType {
    date: Date;
    name: string;
    roomId: {
        name: string;
        price: string;
        capacity: string;
        _id: string;
    };
    _id: string;
}

const MyBookings = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)
    const { books } = useSelector((state: RootState) => state.books)

    useEffect(() => {
        const getMyBookings = async () => {
            try {
                const res = await $api.get(`/booking/find`)
                if (res.status === 200) {
                    dispatch(setBooks(res.data.data))
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (user?._id) getMyBookings()
    }, [user])

    const handleBook = async (book: BookType) => {
        if (confirm("Do you want to cancel your reservation?")) {
            try {
                const res = await $api.get(`/booking/un-book/${book._id}`)
                if (res.status === 200) {
                    const newBooks = books.filter((item) => item._id !== book._id)
                    dispatch(setBooks(newBooks))
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.length === 0 && (
                <p>Bookings not found</p>
            )}
            {books?.map((room, i) => (
                <div
                    key={i}
                    className="bg-[#111827] rounded-2xl shadow-md border border-gray-200/20 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                    <img
                        src={RoomImage}
                        alt={room.roomId.name}
                        className="w-full h-40 object-cover"
                    />
                    <div className="p-5">
                        <h2 className="text-xl font-bold text-white">{room.roomId.name}</h2>
                        <p className="text-gray-400 mt-2">Capacity: <span className="font-medium">{room.roomId.capacity}</span></p>
                        <p className="text-gray-400">Price: <span className="font-medium">${room.roomId.price}</span></p>

                        {
                            user && (
                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => handleBook(room)}
                                        className="flex-1 bg-gray-300 cursor-pointer text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        Un book
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyBookings