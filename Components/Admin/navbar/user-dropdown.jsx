import {
  Avatar,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import DarkModeSwitch from "./darkmodeswitch";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../../Redux/reducer";
import NextLink from "next/link";

export default function UserDropdown() {
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    if (e === "logout") {
      localStorage.removeItem("lg_tk");
      dispatch(setLoggedIn(false));
    } else if (e === "switch") {
      console.log("dark or light");
    }
  };

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            color="secondary"
            size="md"
            name="Ad"
            // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={handleLogout}
        // variant="bordered"
      >
        <DropdownSection showDivider>
          <DropdownItem
            key="profile"
            className="flex flex-col justify-start w-full items-start"
          >
            {/* <p>Signed in as</p> */}
            <p className="font-semibold text-violet-600">Admin</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownItem
          key="configurations"
          as={NextLink}
          href="/admin/credentials"
        >
          Change Credentials
        </DropdownItem>
        <DropdownItem
          key="visit-site"
          as={Link}
          href="/"
          target="_blank"
          color="secondary"
        >
          {/* <Link href={"/"} target="_blank" color="secondary"> */}
          <p>Visit Site</p>
          {/* </Link> */}
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger "
          onClick={handleLogout}
        >
          Log Out
        </DropdownItem>
        <DropdownItem key="switch">
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
