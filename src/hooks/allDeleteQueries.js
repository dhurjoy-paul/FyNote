import { useDeleteMutation } from "./useMutationQuery";

// DELETE package
export const useDeletePackage = useDeleteMutation((package_id) => `/package/${package_id}`, ['packages']);

