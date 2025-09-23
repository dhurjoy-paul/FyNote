import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from 'framer-motion'
import { Eye, EyeOff, GalleryVerticalEnd } from "lucide-react"
import { useState } from 'react'
import api from '../../../utils/api'

const Login = () => {
  const [showPass, setShowPass] = useState('false');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formData = { email, password }

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login attempt with:', formData);
    try {
      const response = await api.post('/auth/login', formData);
      console.log('Success:', response.data);
      console.log('Login successful!');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error:', error);
      console.error('Login failed:', error.response.data.message);
    }
  };

  const handleForgotPass = (e) => {
    e.preventDefault();
    console.log('email sending to backend', { email })
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex w-full max-w-sm flex-col gap-6">

        {/* site name */}
        <span href="#" className="flex items-center gap-2 self-center font-semibold text-2xl font-bricolage-grotesque">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          FyN
        </span>

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
                <div className="grid gap-6">
                  <div className="grid gap-6">

                    {/* email */}
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    {/* password */}
                    <div className="grid gap-3 relative">
                      <div className="flex items-center ">
                        <Label htmlFor="password">Password</Label>
                        <motion.button
                          type="button"
                          onClick={handleForgotPass}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.95 }}
                          className="ml-auto text-sm text-primary underline-offset-4 hover:underline focus:outline-none cursor-pointer"
                        >
                          Forgot password?
                        </motion.button>
                      </div>

                      <Input id="password" required
                        type={showPass ? "password" : "text"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                      <button type="button" className="absolute bottom-1.5 right-3 cursor-pointer"
                        onClick={() => setShowPass((prev) => !prev)}>
                        {
                          showPass
                            ? <EyeOff size={21} />
                            : <Eye size={21} />
                        }
                      </button>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button type="submit" className="w-full cursor-pointer">
                        Log In
                      </Button>
                    </motion.div>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a href="#" className="underline underline-offset-4">
                      Contact Us
                    </a>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <div
            className="text-muted-foreground *:[a]:hover:text-primary text-center text-sm text-balance *:[a]:underline *:[a]:underline-offset-4">
            Developed and designed by <a className=""><strong>Team QodeOn</strong></a> Copyright © {new Date().getFullYear()} - All right reserved by QodeOn
          </div>
        </div>

      </motion.div>
    </div>
  )
}
export default Login