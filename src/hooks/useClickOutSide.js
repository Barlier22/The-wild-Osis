import { useEffect, useRef } from "react";

export function useClickOutSide(handler, isBublingPhase = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }
      document.addEventListener("click", handleClick, isBublingPhase);

      return () =>
        document.removeEventListener("click", handleClick, isBublingPhase);
    },
    [handler, isBublingPhase]
  );
  return ref;
}
