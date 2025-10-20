import { api } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
export const useGetQuery = (key, endpoint, dataExtractor) => {
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

// default configuration for all mutations
const DEFAULT_MUTATION_CONFIG = {
  retry: 1,                // retry once if fails
  retryDelay: 1000,        // wait 1 second before retry
  onError: (error) => { console.error('⦿•=>', 'Mutation failed:', error) },
};

// Generic factory for POST requests
export const usePostMutation = (endpoint, invalidateKeys = [], dataExtractor = null) => {
  return (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (payload) => {
        const { data } = await api.post(endpoint, payload);
        return dataExtractor ? dataExtractor(data) : data;
      },
      ...DEFAULT_MUTATION_CONFIG,
      ...options,
      onSuccess: (data, variables, context) => {
        // Invalidate related queries
        invalidateKeys.forEach(key => {
          const queryKey = typeof key === 'function'
            ? key(variables)
            : key;

          const finalKey = Array.isArray(queryKey) ? queryKey : [queryKey];

          console.log('Invalidating query:', finalKey);
          queryClient.invalidateQueries({ queryKey: finalKey });
        });
        // Call custom onSuccess if provided
        options.onSuccess?.(data, variables, context);
      },
      onError: (error, variables, context) => {
        DEFAULT_MUTATION_CONFIG.onError?.(error, variables, context);
        options.onError?.(error, variables, context);
      },
    });
  };
};

// Generic factory for PUT requests
export const usePutMutation = (endpoint, invalidateKeys = [], dataExtractor = null) => {
  return (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (payload) => {
        const url = typeof endpoint === 'function'
          ? endpoint(payload)
          : endpoint;

        const { data } = await api.put(url, payload);
        return dataExtractor ? dataExtractor(data) : data;
      },
      ...DEFAULT_MUTATION_CONFIG,
      ...options,
      onSuccess: (data, variables, context) => {
        invalidateKeys.forEach(key => {
          const queryKey = typeof key === 'function'
            ? key(variables)
            : key;

          const finalKey = Array.isArray(queryKey) ? queryKey : [queryKey];

          console.log('Invalidating query:', finalKey);
          queryClient.invalidateQueries({ queryKey: finalKey });
        });
        options.onSuccess?.(data, variables, context);
      },
      onError: (error, variables, context) => {
        DEFAULT_MUTATION_CONFIG.onError?.(error, variables, context);
        options.onError?.(error, variables, context);
      },
    });
  };
};

// Generic factory for DELETE requests
export const useDeleteMutation = (endpoint, invalidateKeys = [], dataExtractor = null) => {
  return (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (id) => {
        // support dynamic endpoints for deletes (e.g., /users/:id)
        const url = typeof endpoint === 'function'
          ? endpoint(id)
          : `${endpoint}/${id}`;

        const { data } = await api.delete(url);
        return dataExtractor ? dataExtractor(data) : data;
      },
      ...DEFAULT_MUTATION_CONFIG,
      ...options,
      onSuccess: (data, variables, context) => {
        // Invalidate related queries
        invalidateKeys.forEach(key => {
          const queryKey = typeof key === 'function'
            ? key(variables)
            : key;

          const finalKey = Array.isArray(queryKey) ? queryKey : [queryKey];

          console.log('Invalidating query:', finalKey);
          queryClient.invalidateQueries({ queryKey: finalKey });
        });
        // Call custom onSuccess if provided
        options.onSuccess?.(data, variables, context);
      },
      onError: (error, variables, context) => {
        DEFAULT_MUTATION_CONFIG.onError?.(error, variables, context);
        options.onError?.(error, variables, context);
      },
    });
  };
};