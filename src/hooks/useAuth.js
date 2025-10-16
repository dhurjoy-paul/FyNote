import { api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

const fetchUserProfile = async () => {
  try {
    const response = await api.get('/ispProfile');

    if (!response.data?.user) {
      throw new Error('Invalid user data received');
    }

    return response.data.user;
  } catch (error) {
    console.error('⦿•=>', 'Failed to fetch user profile:', error);
    throw error;
  }
};

export const useAuth = (options = {}) => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    refetchInterval: 5 * 60 * 1000, // 5 mins
    refetchOnWindowFocus: true,
    refetchOnReconnect: true, // best for network issues
    staleTime: 2 * 60 * 1000, // 2 mins
    cacheTime: 10 * 60 * 1000, // 10 mins
    retry: 1,
    ...options,
  });
};