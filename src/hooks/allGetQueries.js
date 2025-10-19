import useGetQuery from "./useGetQuery";

/**
 * Example usage:
 * export const useUserProfile = useGetQuery('userProfile', '/ispProfile', data => data.user);
 *                                          (['userProfile', 'anyKey'], '/ispProfile', data => data.user);
 * 
 * const { data: user, isLoading, ... } = useUserProfile();
 */


// GET all packages hook
export const usePackages = useGetQuery('packages', '/package', data => data.packages);

// GET ISP profile
export const useUserProfile = useGetQuery('userProfile', '/ispProfile', data => data.user);