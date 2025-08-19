import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";

function DateDisplay() {
  const getNextDates = () => {
    const today = new Date();

    const after2Days = new Date(today);
    after2Days.setDate(today.getDate() + 2);

    const after3Days = new Date(today);
    after3Days.setDate(today.getDate() + 3);

    return {
      today: today.toDateString(),
      after2Days: after2Days.toDateString(),
      after3Days: after3Days.toDateString(),
    };
  };

  const dates = getNextDates();

  return (
    <p className="md:block hidden" >
      FREE delivery{" "}
      <span className="font-semibold">, {dates.after3Days}</span>{" "}
      <br />
      Or fastest delivery{" "}
      <span className="font-semibold">
        , {dates.after2Days}
      </span>{" "}
    </p>
  );
}

// export DateDisplay if needed
export { DateDisplay };

const ProductListView = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="space-y-2 mt-4 rounded-md">
      <div className="bg-gray-100 gap-7 flex items-center p-2 rounded-md">
        <img
          src={product.image}
          alt={product.title}
          className="md:h-60 md:w-60 h-25 w-25 rounded-md cursor-pointer"
          onClick={() => navigate(`/products/${product.id}`)}
        />
        <div className="space-y-2">
          <h1 className="font-bold md:text-xl text-lg md:line-clamp-3 line-clamp-2 hover:text-red-400 md:w-full w-[220px]">
            {product.title}
          </h1>
          <p className="font-semibold flex md:text-lg text-sm items-center">
            <span className="md:text-4xl text-2xl">₹ {product.price * 80} </span>
            {product.discount > 0 ? (
              <span>({product.discount}% off)</span>
            ) : (
              <div></div>
            )}
          </p>
          {DateDisplay()}
          <button
            onClick={() => addToCart(product)}
            className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListView;
