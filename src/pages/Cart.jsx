import React from "react";
import { useCart } from "../../Context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import emptyCart from "../assets/empty-cart.png"
import CheckoutButton from "../components/CheckoutButton";

export function NameInput() {
  const { user: authUser } = useUser();
  const [user, setUser] = useState({ fullName: "" });

  useEffect(() => {
    if (authUser) {
      setUser((prev) => ({
        ...prev,
        fullName: authUser.fullName || "",
      }));
    }
  }, [authUser]);

   return (
    <input
      type="text"
      placeholder="Enter your name"
      className="p-2 rounded-md"
      value={user?.fullName || ""}
      onChange={(e) => setUser({ ...user, fullName: e.target.value })}
    />
  );
}

const Cart = ({location, getLocation, handleCheckoutClick}) => {
  const { cartItem, updateQuantity, deleteItem } = useCart();
  const navigate = useNavigate()
  // const [user, setUser] = useState({ fullName: "" });
  // const {user} = useUser()
  // console.log(user)


  const totalPrice = cartItem.reduce((total, item)=> total + item.price*item.quantity*80 , 0)

  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0">
      {cartItem.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">My Cart ({cartItem.length})</h1>
          <div>
            <div className="mt-10">
              {cartItem.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-md flex items-center justify-between mt-3 md:p-5 p-3 w-full"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 rounded-md"
                      />
                      <div>
                        <h1 className="md:w-[300px] line-clamp-2 w-[75px]">{item.title}</h1>
                        <p className="text-red-500 font-semibold text-lg">
                          ₹ {item.price * 80}
                        </p>
                      </div>
                    </div>
                    <div className="bg-red-500 text-white flex p-2 gap-4 rounded-md font-bold text-xl">
                      <button onClick={()=>updateQuantity(cartItem, item.id, "decrease")} className="cursor-pointer px-1">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={()=>updateQuantity(cartItem, item.id, "increase")} className="cursor-pointer px-1">+</button>
                    </div>
                    <span className="hover:bg-white/60 transition-all p-3 rounded-full hover:shadow-2xl">
                      <FaRegTrashAlt onClick={()=>deleteItem(item.id)} className="text-red-500 cursor-pointer text-2xl" />
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-20 gap-5">
              <div className="bg-gray-100 p-7 rounded-md mt-4 space-y-2">
                <h1 className="font-bold text-gray-800 text-xl">
                  Delivery Info
                </h1>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Full Name</label>
                  <NameInput />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Address</label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className="p-2 rounded-md"
                    value={location?.county}
                  />
                </div>
                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">State</label>
                    <input
                      type="text"
                      placeholder="Enter your state"
                      className="p-2 rounded-md w-full"
                      value={location?.state}
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">Post Code</label>
                    <input
                      type="text"
                      placeholder="Enter your postcode"
                      className="p-2 rounded-md w-full"
                      value={location?.postcode}
                    />
                  </div>
                </div>
                <div className="flex w-full gap-5">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">Country</label>
                    <input
                      type="text"
                      placeholder="Enter your country"
                      className="p-2 rounded-md w-full"
                      value={location?.country}
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">Phone No</label>
                    <input
                      type="text"
                      placeholder="Enter your phone number"
                      className="p-2 rounded-md w-full"
                    />
                  </div>
                </div>
                <button className="bg-red-500 text-white rounded-md px-3 py-1 mt-3 cursor-pointer">
                  Submit
                </button>

                <div className="flex justify-center items-center w-full text-gray-700">
                  ---------OR---------
                </div>
                <div className="flex justify-center">
                  <button onClick={getLocation} className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer">
                    Detect Location
                  </button>
                </div>
              </div>
              <div className="bg-white border border-gray-100 p-7 shadow-xl rounded-md mt-4 space-y-2 h-max" >
                <h1 className="text-gray-800 font-bold text-xl" >Bill Details</h1>
                <div className="flex justify-between items-center" >
                  <h1 className="flex gap-1 text-gray-700 items-center" ><span><LuNotebookText/></span>Items total</h1>
                  <p>₹ {totalPrice}</p>
                </div>
                <div className="flex justify-between items-center" >
                  <h1 className="flex gap-1 text-gray-700 items-center" ><span><MdDeliveryDining/></span>Delivery Charge</h1>
                  <p className="text-red-500 font-semibold" ><span className="line-through text-gray-600" >₹ 400</span> FREE</p>
                </div>
                <div className="flex justify-between items-center" >
                  <h1 className="flex gap-1 text-gray-700 items-center" ><span><GiShoppingBag/></span>Handling Charge</h1>
                  <p className="text-red-500 font-semibold" >₹ 100</p>
                </div>
                <hr className="text-gray-200 mt-2" />
                <div className="flex justify-between items-center" >
                  <h1 className="font-semibold text-lg" >Grand Total</h1>
                  <p className="font-semibold text-lg" >₹ {totalPrice + 100}</p>
                </div>
                <div>
                  <h1 className="text-gray-700 font-semibold mb-3 mt-7" >Apply Promo Code</h1>
                  <div className="flex gap-3" >
                    <input type="text" placeholder="Enter code" className="p-2 rounded-md w-full" />
                    <button className="bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md" >Apply</button>
                  </div>
                </div>
                <CheckoutButton />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center h-[600px]" >
          <h1 className="text-red-500/80 font-bold text-5xl text-muted" >Oh no! Your cart is empty</h1>
          <img src={emptyCart} alt="" className="w-[400px]" />
          <button onClick={()=>navigate('/products')} className="bg-red-500 text-white rounded-md px-3 py-2 cursor-pointer" >Continue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
