import { MapPin } from "lucide-react";
import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/logo.webp';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  ClerkProvider,
} from "@clerk/clerk-react";
import { CgClose } from "react-icons/cg";
import { useCart } from "../../Context/CartContext";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = ({ location, getLocation, openDropdown, setopenDropdown }) => {

  const {cartItem} = useCart()
  const [openNav, setOpenNav] = useState(false)

  const toggleDropdown = () => {
    setopenDropdown(!openDropdown);
  };

  return (
    <div className="bg-white py-3 shadow-2xl px-4 md:px-0">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex gap-7 items-center">
          <Link to={"/"} className="flex space-x-2" >
            <img src={logo} alt="Logo" className="w-8" />
            <h1 className="font-bold text-3xl">
              <span className="text-red-500 font-serif">T</span>eknix
            </h1>
          </Link>
          <div className="md:flex gap-1 cursor-pointer text-gray-700 items-center hidden">
            <MapPin className="text-red-500" />
            <div className="font-semibold">
              {location ? (
                <div className="-space-y-2">
                  <p>{location.county}</p>
                  <p>{location.state}</p>
                </div>
              ) : (
                "Add Address"
              )}
            </div>
            <FaCaretDown onClick={toggleDropdown} />
          </div>

          {openDropdown ? (
            <div className="w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md">
              <h1 className="font-semibold mb-4 text-xl flex justify-between">
                Change Location{" "}
                <span onClick={toggleDropdown} className="cursor-pointer">
                  <CgClose />
                </span>
              </h1>
              <button
                onClick={getLocation}
                className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-600"
              >
                Detect my location
              </button>
            </div>
          ) : null}
        </div>
        {/* Menu Section */}
        <nav className="flex gap-7 items-center">
          <ul className="md:flex gap-7 font-semibold text-xl items-center hidden">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Products</li>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>

          <Link to="/cart" className="relative">
            <IoCartOutline className="w-7 h-7" />
            <span className="bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white">
              {cartItem.length}
            </span>
          </Link>

          <div className="hidden md:block" >
            <SignedOut>
              <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          {
            openNav ? <HiMenuAlt3 onClick={()=>setOpenNav(false)} className="h-7 w-7 md:hidden" /> : <HiMenuAlt1 onClick={()=>setOpenNav(true)} className="h-7 w-7 md:hidden" />
          }
        </nav>
      </div>
      <ResponsiveMenu setOpenNav={setOpenNav} openNav={openNav} />
    </div>
  );
};

export default Navbar;
