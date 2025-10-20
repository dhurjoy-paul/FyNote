import { ToastFailed, ToastSuccess } from "@/components/shared/ToastMassage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ModeToggle } from "@/theme/ModeToggle"
import { api } from "@/utils/api"
import { motion } from 'framer-motion'
import { Eye, EyeOff, GalleryVerticalEnd } from "lucide-react"
import { useState } from 'react'
import { useNavigate } from "react-router"
import LoginButton from "./LoginButton"

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState('false');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formData = { email, password }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('⦿•=>', 'Login attempt');
    // console.log('⦿•=>', formData); // to be removed
    try {
      const response = await api.post('/auth/login', formData);
      if (response.status === 200) {
        // console.log('⦿•=>', 'Success:', response.data); // to be removed
        ToastSuccess("Successfully logged in!")
        console.log('⦿•=>', 'Login successful!');
        navigate('/dashboard')
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error('⦿•=>', 'Error:', error);
      if (error.response?.status === 401) {
        ToastFailed("Login failed!", "Invalid email or password. Please try again.")
        console.log("⦿•=>", 'Invalid email or password');
      } else {
        ToastFailed("Login failed!", error.response?.data?.message)
      }
    }
  };

  const handleForgotPass = (e) => {
    e.preventDefault();
    console.log('email sending to backend', { email })
  }

  return (
    <div className="flex flex-col justify-center items-center gap-6 p-6 md:p-10 min-h-svh">
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-6 w-full max-w-sm">

        {/* site name */}
        <div className="flex justify-center items-center self-center gap-2 w-full font-bricolage-grotesque font-semibold text-2xl">
          <div className="flex justify-center items-center bg-primary rounded-md size-6 text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          FyN
        </div>

        {/* main form */}
        <div
          className="flex flex-col gap-6">
          <Card className="bg-card">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome !!</CardTitle>
              <CardDescription>
                Login with the credentials provided to you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="gap-6 grid">
                  <div className="gap-6 grid">

                    {/* email */}
                    <div className="gap-3 grid">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    {/* password */}
                    <div className="relative gap-3 grid">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <motion.button
                          type="button"
                          onClick={handleForgotPass}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.95 }}
                          className="ml-auto focus:outline-none text-primary text-sm hover:underline underline-offset-4 cursor-pointer"
                        >
                          Forgot password?
                        </motion.button>
                      </div>

                      <Input id="password" required
                        type={showPass ? "password" : "text"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                      <button type="button" className="right-3 bottom-1.5 absolute text-muted-foreground cursor-pointer"
                        onClick={() => setShowPass((prev) => !prev)}>
                        {
                          showPass
                            ? <EyeOff size={21} />
                            : <Eye size={21} />
                        }
                      </button>
                    </div>
                    <LoginButton loading={loading} />
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <p>Don&apos;t have an account?{" "}
                      <a href="#" className="underline underline-offset-4">Contact Us</a></p>
                    <ModeToggle />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <div
            className="text-muted-foreground *:[a]:hover:text-primary text-sm text-center *:[a]:underline *:[a]:underline-offset-4 text-balance">
            Developed and designed by <a className=""><strong>Team QodeOn</strong></a> Copyright © {new Date().getFullYear()} - All right reserved by QodeOn
          </div>
        </div>

      </motion.div>
    </div>
  )
}
export default Login