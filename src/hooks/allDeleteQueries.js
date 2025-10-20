import { useDeleteMutation } from "./useQueryFactory";

// DELETE package
export const useDeletePackage = useDeleteMutation((package_id) => `/package/${package_id}`, ['packages']);

