import { Outlet } from "react-router"

const AuthLayout = () => {
  return (
    <main className="bg-muted">
      <Outlet />
    </main>
  )
}
export default AuthLayout