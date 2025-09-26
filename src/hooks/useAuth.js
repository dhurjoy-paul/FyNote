
import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useAuth() {
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const { data } = await api.get("/ispProfile");
      return data;
    },
    retry: false,
    onError: (err) => {
      const status = err.response?.status;
      if (status === 401) {
        console.error("⦿•=> Unauthorized: User not logged in or session expired");
        navigate("/auth/login");
      } else {
        console.error("⦿•=> Other error:", err.response?.data || err.message);
      }
    },
  });

  return query;
}
