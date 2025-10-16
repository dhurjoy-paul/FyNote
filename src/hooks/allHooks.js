import useGetQuery from "./useGetQuery";

// hook to fetch authenticated ISP profile
export const useAuth = (options = {}) => {
  return useGetQuery('/ispProfile', {
    queryKey: ['userProfile'],
    select: (data) => data.user,
    validate: (data) => !!data?.user,
    ...options,
  });
};

// GET all packages
export const usePackages = (options = {}) => {
  return useGetQuery('/package', {
    queryKey: ['packages'],
    select: (data) => data.packages,
    ...options,
  });
}