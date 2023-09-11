'use client'

import { Button, Dropdown, Navbar } from "flowbite-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";

export const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [username, setUsername] = useState("")
  const [usermail, setUsermail] = useState("")
  
  useEffect(() => {
    if(session && session.user) {
      setUsername(session.user.name ? `${session.user?.name.split("(")[0].trim()}` : "");
      setUsermail(session.user.email ? session.user.email :  "");
    }
  }, [session]);

  return (
    <Navbar fluid={true} rounded={true} border={true}>
      <Navbar.Brand href="/">
        <picture>
          <img
            src="./teltecLogo.png"
            className="mr-3 h-9 sm:h-9"
            alt="Teltec Solutions Logo"
          />
        </picture>
      </Navbar.Brand>
      <div className="flex md:order-2 gap-3">
        {session ? 
        (
          <Dropdown
            arrowIcon={true}
            inline={false}
            label={`${username.split(" ")[0]} ${username.split(" ").slice(-1)}`}
          >
            <Dropdown.Header>
              <span className="block text-sm">{username}</span>
              <span className="block truncate text-sm font-medium">{usermail}</span>
            </Dropdown.Header>
            <Dropdown.Item icon={HiOutlineLogout} onClick={() => signOut()}>Sign out</Dropdown.Item>
          </Dropdown>
        ) :
        (
          <Button onClick={() => signIn("azure-ad", { callbackUrl: "/", redirect: true })}>Sign In</Button>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active={pathname === "/" ? true : false}>Formulário</Navbar.Link>
        {/* <Navbar.Link href="/about" active={pathname === "/about" ? true : false}>About</Navbar.Link> */}
        {/* <Navbar.Link href="/form" active={pathname === "/form" ? true : false}>Form</Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
};
