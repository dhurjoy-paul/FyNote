import { api } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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