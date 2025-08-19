import React from "react";
import { FaFilter } from "react-icons/fa6";
import { getData } from "../../Context/DataContext";

const MobileFilter = ({
  openFilter,
  setOpenFilter,
  search,
  setSearch,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  handleCategoryChange,
  handleBrandChange,
  setPage,
}) => {

  const { categoryOnlyData, brandOnlyData } = getData();
  const toggleFilter = () => {
    setOpenFilter(!openFilter)
  }

  return (
    <>
      <div className="bg-gray-100 flex justify-between md:hidden items-center px-4 p-2 mt-5">
        <h1 className="font-semibold text-xl">Filters</h1>
        <FaFilter
          onClick={toggleFilter}
          className="text-gray-800"
        />
      </div>
      {openFilter ? (
        <div className="bg-gray-100 p-2 md:hidden px-4">
          <input
            type="text"
            placeholder="Search.."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value, setPage(1));
            }}
            className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
          />

          {/* Category Only Data */}
          <h1 className="mt-5 font-semibold text-xl">Category</h1>
          <div className="flex flex-col mt-3 gap-2">
            {categoryOnlyData?.map((item, index) => {
              return (
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    name={item}
                    checked={category === item}
                    value={item}
                    onChange={handleCategoryChange}
                  />
                  <button className="cursor-pointer uppercase">{item}</button>
                </div>
              );
            })}
          </div>

          {/* Brand only Data */}
          <h1 className="mt-5 font-semibold text-xl mb-3">Brand</h1>
          <select
            name=""
            id=""
            className="bg-white w-full p-2 border-gray-200 border-2 rounded-md cursor-pointer"
            value={brand}
            onChange={handleBrandChange}
          >
            {brandOnlyData?.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item.toUpperCase()}
                </option>
              );
            })}
          </select>

          {/* Price Range */}
          <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="">
              Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
            </label>
            <input
              type="range"
              min="0"
              max="150000"
              name=""
              id=""
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([
                  priceRange[0],
                  Number(e.target.value),
                  setPage(1),
                ])
              }
              className="transition-all w-[275px] cursor-pointer"
            />
          </div>
          <button
            className="bg-red-500 text-white rounded-md px-3 py-1 cursor-pointer mt-5"
            onClick={() => {
              setSearch("");
              setCategory("All");
              setBrand("All");
              setPriceRange([0, 150000]);
              setOpenFilter(false)
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : null}
    </>
  );
};

export default MobileFilter;
