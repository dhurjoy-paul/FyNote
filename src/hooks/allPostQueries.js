import { usePostMutation } from "./useMutationQuery";

// add package
export const useAddPackage = usePostMutation('/package/add', ['packages']);

