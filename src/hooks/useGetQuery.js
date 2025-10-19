import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

// default configuration for all GET queries
const DEFAULT_QUERY_CONFIG = {
  staleTime: 1000 * 60 * 5,          // Fresh for 5 mins
  gcTime: 1000 * 60 * 10,            // Cache kept for 10 mins

  refetchOnMount: true,              // Only refetch if stale
  refetchOnWindowFocus: false,       // Don't spam refetch on tab switch
  refetchOnReconnect: true,          // Refetch after reconnect
  refetchInterval: false,            // No auto-polling

  retry: 2,                          // Retry twice if fails
  retryDelay: attempt => Math.min(1000 * 2 ** attempt, 10000),

  structuralSharing: true,           // Smart reference reuse
  enabled: true,                     // default
  // suspense: false                 // default [Leave false unless you use Suspense.]
};

// Generic reusable hook factory for GET requests
const useGetQuery = (key, endpoint, dataExtractor) => {
  return (options = {}) => {
    return useQuery({
      queryKey: Array.isArray(key) ? key : [key],
      queryFn: async () => {
        const { data } = await api.get(endpoint);
        return dataExtractor ? dataExtractor(data) : data;
      },
      ...DEFAULT_QUERY_CONFIG,
      ...options
    });
  };
};

export default useGetQuery;

/**
 * Example usage:
 * export const useUserProfile = useGetQuery('userProfile', '/ispProfile', data => data.user);
 *                                          (['userProfile', 'anyKey'], '/ispProfile', data => data.user);
 * 
 * const { data: user, isLoading, ... } = useUserProfile();
 */