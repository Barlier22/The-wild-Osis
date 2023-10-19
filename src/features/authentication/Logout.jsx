import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";

function Logout() {
  const { logoutFn, isLoading } = useLogout();
  return (
    <ButtonIcon onClick={() => logoutFn()} disabled={isLoading}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
