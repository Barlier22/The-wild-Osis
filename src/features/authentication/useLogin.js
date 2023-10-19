import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiauth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const querClient = useQueryClient();
  const { mutate: loginFn, isLoading: isLogin } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      querClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("error", err);
      toast.error("Provider email or password was incorrect");
    },
  });
  return { loginFn, isLogin };
}
