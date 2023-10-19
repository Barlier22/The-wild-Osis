import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creacteCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: creatingCabin, isLoading: isCreating } = useMutation({
    mutationFn: creacteCabin,
    onSuccess: () => {
      toast.success("new Cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { creatingCabin, isCreating };
}
