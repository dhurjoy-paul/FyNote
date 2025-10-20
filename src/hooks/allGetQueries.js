import { useGetQuery } from "./useQueryFactory";

/**
 * Example usage:
 * export const useUserProfile = useGetQuery('user', (id) => `/users/${id}`, (data) => data.user);
 *                                          (['userProfile', 'user'], '/ispProfile', data => data.user);
 * 
 * const { data: user, isLoading, ... } = useUserProfile(userId);
 */

// GET all packages hook
export const usePackages = useGetQuery('packages', '/package', data => data.packages);

// GET ISP profile
export const useUserProfile = useGetQuery('userProfile', '/ispProfile', data => data.user);