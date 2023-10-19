import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiauth";
import { toast } from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUpFn, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signup({ fullName, email, password }),
    onSuccess: () => {
      toast.success(
        "account succesfully created ! Please verify  the new account from the user's email address"
      );
    },
  });

  return { signUpFn, isLoading };
}
