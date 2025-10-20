import { usePostMutation } from "./useQueryFactory";

// add package
export const useAddPackage = usePostMutation('/package/add', ['packages']);

