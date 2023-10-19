import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useChekout() {
  /*  when we need to iterat with Api to mutate
     data we use useMutation hooks form react query */
  const queryClient = useQueryClient();

  const { mutate: chenkoutFn, isLoading: isCheckingout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully cheched out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error(`there was an error while checking out`);
    },
  });

  return { chenkoutFn, isCheckingout };
}
