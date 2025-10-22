import { usePostMutation } from "./useQueryFactory";

// add package
export const useAddPackage = usePostMutation('/package/add', ['packages']);

// add client
export const useAddClient = usePostMutation('/client/add', ['client', 'clients']);
