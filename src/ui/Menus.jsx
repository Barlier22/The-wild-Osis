/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useClickOutSide } from "../hooks/useClickOutSide";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
// 1) create a context
const MenuContext = createContext();

// 2) parent component!
function Menus({ children }) {
  const [openMenuId, setOpenMenuId] = useState("");
  const [position, setPosition] = useState(null);
  const close = () => setOpenMenuId("");
  const open = setOpenMenuId;
  return (
    <MenuContext.Provider
      value={{ openMenuId, close, open, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}
// 3 the children component!
function Toggle({ id }) {
  const { openMenuId, close, open, setPosition } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    // console.log(openMenuId === "" || openMenuId !== id);

    openMenuId === "" || openMenuId !== id ? open(id) : close();
  }
  //   return le trois points : in UI
  /* ONclick open or close and set de position */
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openMenuId, position, close } = useContext(MenuContext);
  // console.log(openMenuId);

  const ref = useClickOutSide(() => {
    close();
  }, false);

  useEffect(
    function () {
      if (openMenuId) document.addEventListener("scroll", close, true);
      return () => {
        document.removeEventListener("scroll", close, true);
      };
    },

    [close, openMenuId, id]
  );

  if (openMenuId !== id) return null;
  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenuContext);
  function handleOnClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleOnClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
