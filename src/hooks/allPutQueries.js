import { usePutMutation } from "./useQueryFactory";

// edit package
export const useUpdatePackage = usePutMutation(
  (payload) => `/package/${payload.package_id}`,
  ['packages', (payload) => ['packageSingle', payload.package_id]]
);

// edit ISP profile
export const useUpdateProfile = usePutMutation('/ispProfile', ['userProfile']);