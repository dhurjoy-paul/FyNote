import { useGetQuery } from "./useQueryFactory";

/**
 * Example usage:
 * export const useUserProfile = useGetQuery('user', (id) => `/users/${id}`, (data) => data.user);
 *                                          (['userProfile', 'user'], '/ispProfile', data => data.user);
 * 
 * const { data: user, isLoading, ... } = useUserProfile(userId);
 */

// GET ISP profile
export const useUserProfile = useGetQuery('userProfile', '/ispProfile', data => data.user);

// GET single client details
export const useClientDetails = useGetQuery('clientDetails', (id) => `/client/${id}`, data => data.client);

// GET all packages
export const usePackages = useGetQuery('packages', '/package', data => data.packages);

// GET single package
export const usePackageDetails = useGetQuery('packageSingle', (id) => `/package/${id}`, data => data.package);