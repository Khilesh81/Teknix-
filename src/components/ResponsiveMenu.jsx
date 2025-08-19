import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  ClerkProvider,
} from "@clerk/clerk-react";


const ResponsiveMenu = ({ openNav, setOpenNav }) => {
  const { user } = useUser();
  const { isSignedIn } = useUser();
  return (
    <div
      className={`${
        openNav ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between px-8 bg-white pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all`}
    >
      <div>
        <div className="flex justify-start items-center gap-3">
          {user ? <UserButton size={50} /> : <FaUserCircle size={50} />}
          <div>
            <h1>Hello, {user?.firstName}</h1>
            <h1 className="text-sm text-slate-500">Premium User</h1>
          </div>
        </div>
        <nav className="mt-12">
          <ul className="flex flex-col gap-7 text-2xl font-semibold">
            <Link
              to="/"
              className="cursor-pointer"
              onClick={() => setOpenNav(false)}
            >
              <li>Home</li>
            </Link>
            <Link
              to="/products"
              className="cursor-pointer"
              onClick={() => setOpenNav(false)}
            >
              <li>Products</li>
            </Link>
            <Link
              to="/about"
              className="cursor-pointer"
              onClick={() => setOpenNav(false)}
            >
              <li>About</li>
            </Link>
            <Link
              to="/contact"
              className="cursor-pointer"
              onClick={() => setOpenNav(false)}
            >
              <li>Contact</li>
            </Link>

            {!isSignedIn && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer justify-center items-center text-center">
                <SignedOut>
                  <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer md:text-xl text-2xl" />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            )}
          </ul>
        </nav>
      </div>
      <div class="pb-20">
        <h1>Made with ❤️ by Rao Sahab</h1>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
