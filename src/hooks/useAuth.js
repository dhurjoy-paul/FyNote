import { api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

const fetchUserProfile = async () => {
  const response = await api.get('/ispProfile');
  console.log('⦿•=>', response.data.user);
  return response.data.user;
};

export const useAuth = (options = {}) => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 5000,
    retry: 1,
    ...options,
  });
};