import { api } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// default configuration for all mutations
const DEFAULT_MUTATION_CONFIG = {
  retry: 1,                // retry once if fails
  retryDelay: 1000,        // wait 1 second before retry

  // onSuccess: (data, variables, context) => { },
  onError: (error, variables, context) => { console.error('⦿•=>', 'Mutation failed:', error) },
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
      onSuccess: (data, variables, context) => {
        // Invalidate related queries
        invalidateKeys.forEach(key => {
          queryClient.invalidateQueries({ queryKey: Array.isArray(key) ? key : [key] });
        });
        // Call custom onSuccess if provided
        options.onSuccess?.(data, variables, context);
      },
      ...DEFAULT_MUTATION_CONFIG,
      ...options
    });
  };
};