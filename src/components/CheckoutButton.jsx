import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react"; // Replace with your auth hook

export default function CheckoutButton() {
  const { isSignedIn } = useUser(); // from auth provider
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckoutClick = () => {
    if (isSignedIn) {
      // ✅ User is signed in → show checkout component
      setShowCheckout(true);
    } else {
      // ❌ Not signed in → redirect to your sign-in page with redirect back to cart
      window.location.href =
        "https://mighty-bluejay-64.accounts.dev/sign-in?redirect_url=https%3A%2F%2Fteknix.netlify.app%2Fcart";
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckoutClick} // ✅ Fixed: now calls function on click
        className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer mt-3 w-full"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

