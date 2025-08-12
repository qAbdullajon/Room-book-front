import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod/v3"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useDispatch } from "react-redux"
import { setStateAuth, setUser } from "@/store/authSlice"
import { $axios } from "@/http"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(20)
})

const Login = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const res = await $axios.post('/customers/login', values)
      if (res.status === 200) {
        localStorage.setItem("accessToken", res.data.data.accessToken)
        dispatch(setUser(res.data.data.user))
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div>
      <h2 className="text-xl font-bold">Login</h2>
      <p className="text-white/60 text-sm pb-6">Don't have an account? <span onClick={() => dispatch(setStateAuth("register"))} className="text-blue-400 hover:underline cursor-pointer">Sign up</span></p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

export default Login