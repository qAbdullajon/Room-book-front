import { useState } from "react"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { setOpenBook } from "@/store/bookSlice"
import $api from "@/http/api"
import { setRooms } from "@/store/roomSlice"

const BookingModal = () => {
    const dispatch = useDispatch()
    const [date, setDate] = useState("")
    const user = useSelector((state: RootState) => state.auth.user)
    const rooms = useSelector((state: RootState) => state.rooms.rooms)
    const { books, isOpen, roomId } = useSelector((state: RootState) => state.books)

    const handleSubmit = async () => {
        if (!date) {
            alert("Please select a date")
            return
        }
        try {
            const res = await $api.post('booking/create', {
                customerId: user?._id,
                date,
                roomId,
            })
            if (res.status === 201) {
                const newRooms = rooms.filter((item) => item._id !== roomId)
                dispatch(setOpenBook(false))
                dispatch(setRooms(newRooms))
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => dispatch(setOpenBook(false))}>
            <DialogContent>
                <DialogTitle>What date would you like to book for?</DialogTitle>
                <div className="space-y-4">
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <DialogFooter>
                    <Button size={'sm'} onClick={handleSubmit}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default BookingModal
