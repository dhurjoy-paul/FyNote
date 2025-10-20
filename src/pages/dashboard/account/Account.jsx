import { useUserProfile } from "@/hooks/allGetQueries"

const Account = () => {
  const { data: ispProfile, isLoading } = useUserProfile()
  const { isp_id, isp_id_firebase, ispLogo, ispName, ownerName, phone, email, createdAt, updatedAt } = ispProfile || {}



  return (
    <div>Account</div>
  )
}
export default Account