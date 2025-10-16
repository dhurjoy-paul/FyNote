import { api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

// default configuration for all GET queries
const DEFAULT_QUERY_CONFIG = {
  refetchInterval: 5 * 60 * 1000, // 5 mins
  refetchOnWindowFocus: true,
  refetchOnReconnect: true, // best for network issues
  staleTime: 2 * 60 * 1000, // 2 mins
  cacheTime: 10 * 60 * 1000, // 10 mins
  retry: 1,
};

/**
 * generic reusable hook for GET requests
 * @param {string} endpoint - API endpoint path
 * @param {Object} config - configuration object
 * @param {Array} config.queryKey - tanstack Query cache key
 * @param {Function} config.select - transform response data
 * @param {Function} config.validate - validate response data
 * @param {boolean} config.enabled - enable/disable query
 * @param {Object} config.params - query parameters
 * @param {Object} config.options - additional tanstack Query options
 */

const useGetQuery = (endpoint, config = {}) => {
  const {
    queryKey,
    select,
    validate,
    enabled = true,
    params = {},
    options = {},
    ...restConfig
  } = config;

  const fetchData = async () => {
    try {
      const response = await api.get(endpoint, { params });

      // custom validation if provided
      if (validate && !validate(response.data)) {
        throw new Error(`Invalid data received from ${endpoint}`);
      }

      // custom data selection/transformation if provided
      return select ? select(response.data) : response.data;
    } catch (error) {
      console.error(`⦿•=> Failed to fetch ${endpoint}:`, error);
      throw error;
    }
  };

  return useQuery({
    queryKey: queryKey || [endpoint, params],
    queryFn: fetchData,
    enabled,
    ...DEFAULT_QUERY_CONFIG,
    ...restConfig,
    ...options,
  });
};

export default useGetQuery;