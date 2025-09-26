import LoadingSpinner from "@/assets/loadingSpinner"
import { Button } from "@/components/ui/button"

const LoginButton = ({ loading }) => {
  return (
    <Button type="submit" disabled={loading}
      className={`w-full ${loading ? "cursor-not-allowed" : "cursor-pointer"}`} >
      {loading
        ? <span className="flex items-center gap-2">
          <LoadingSpinner className="w-px h-px text-primary-foreground" />
          Logging in...
        </span>
        : 'Login'}
    </Button>
  )
}
export default LoginButton