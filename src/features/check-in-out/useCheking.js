import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheking() {
  /*  when we need to iterat with Api to mutate
     data we use useMutation hooks form react query */
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: chenkinFn, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully cheched In`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => {
      toast.error(`there was an error while checking In`);
    },
  });

  return { chenkinFn, isCheckingIn };
}
