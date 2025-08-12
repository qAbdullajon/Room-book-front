import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { setOpen, setRooms } from "@/store/roomSlice"
import { RootState } from "@/store/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "./ui/form"
import $api from "@/http/api"
import { useEffect } from "react"

const formSchema = z.object({
    name: z.string().min(4, {
        message: "Name must be at least 2 characters.",
    }),
    capacity: z.string().min(1, { message: "Capacity must be at least 1" }),
    price: z.string().min(1, { message: "Price must be positive" })
})

export function DialogDemo() {
    const dispatch = useDispatch()
    const { isOpen, valRoom, rooms } = useSelector((state: RootState) => state.rooms)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            capacity: "",
            price: "",
        },
    })

    // valRoom o‘zgarganda formani yangilash
    useEffect(() => {
        if (valRoom) {
            form.reset({
                name: valRoom.name || "",
                capacity: valRoom.capacity?.toString() || "",
                price: valRoom.price?.toString() || "",
            })
        } else {
            form.reset({
                name: "",
                capacity: "",
                price: "",
            })
        }
    }, [valRoom, form])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (valRoom) {
            try {
                const res = await $api.patch(`/room/update/${valRoom._id}`, values)
                if (res.status === 200) {
                    const newRooms = rooms.map((item) => item._id === valRoom._id ? res.data.data : item)
                    dispatch(setRooms(newRooms))
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const res = await $api.post('/room/create', values)
                if (res.status === 201) {
                    const newRooms = [...rooms, res.data.data]
                    dispatch(setRooms(newRooms))
                }
            } catch (error) {
                console.log(error);
            }
        }
        dispatch(setOpen(false))
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => dispatch(setOpen(false))}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {valRoom ? "Update Room" : "Create Room"}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Room name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Room A" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="capacity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Capacity</FormLabel>
                                    <FormControl>
                                        <Input placeholder="5" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input placeholder="25$" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button size={'sm'} variant="outline" type="button">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button size={'sm'} type="submit">
                                {valRoom ? "Update" : "Save"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
