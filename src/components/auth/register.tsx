import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod/v3"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useDispatch } from "react-redux"
import { setStateAuth } from "@/store/authSlice"
import $api from "@/http/api"
import { useState } from "react"

const formSchema = z.object({
    fullName: z.string().min(4).max(40),
    email: z.string().email(),
    phoneNumber: z.string(),
    password: z.string().min(4).max(20)
})

const Register = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true)
            const res = await $api.post('/customers/create', values)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h2 className="text-xl font-bold">Register</h2>
            <p className="text-white/60 text-sm pb-6">Already have an account? <span onClick={() => dispatch(setStateAuth("login"))} className="text-blue-400 hover:underline cursor-pointer">Sign in</span></p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Robert Allen" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email address</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone number</FormLabel>
                                <FormControl>
                                    <Input placeholder="+998901234567" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="******" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        <div className="flex justify-between">
                            <p></p>
                            <p className="text-blue-400 cursor-pointer hover:underline text-sm">Forgot password?</p>
                        </div>
                        <Button disabled={loading} size={"sm"} variant={"secondary"}>Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default Register