import { usePutMutation } from "./useMutationQuery";

// edit package
export const useUpdatePackage = usePutMutation(
  (payload) => `/package/${payload.package_id}`,
  ['packages', (payload) => ['package', payload.package_id]]
);

