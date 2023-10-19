/* eslint-disable no-unused-vars */
import Button from "../../ui/Button";
import { useChekout } from "./useChekout";
function CheckoutButton({ bookingId }) {
  const { chenkoutFn, isCheckingout } = useChekout();
  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckingout}
      onClick={() => chenkoutFn(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
