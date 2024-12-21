import axios from 'axios';
import React, { useState } from 'react';

const App = () => {
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);

  const ClickHandler = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const cartHandler = (id) => {
    const selectedItem = user.find((item) => item.id === id);
    if (!cart.some((item) => item.id === id)) {
      setCart([...cart, selectedItem]);
    }
  };

  const removeHandler = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  return (
    <div className="p-2 min-h-fit w-full bg-zinc-200">
      <button
        onClick={ClickHandler}
        className="px-4 py-2 ml-3 mt-2 text-lg font-medium shadow-md bg-black text-white rounded-md mb-6"
      >
        Get Data
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Products Section */}
        <div className="flex flex-wrap gap-4 lg:w-[70%]">
          {user.map((elem) => (
            <div
              key={elem.id}
              className="bg-white w-[100%] sm:w-[45%] lg:w-[30%] p-4 shadow-lg rounded-md overflow-hidden"
            >
              <div className="w-full aspect-w-4 aspect-h-3 bg-gray-100">
                <img
                  loading="lazy"
                  className="mx-auto mt-4 h-[24vh] w-auto object-cover"
                  src={elem.image}
                  alt={elem.title}
                />
              </div>
              <div className="p-3 text-center">
                <h4 className="text-sm font-bold text-gray-700">{elem.category}</h4>
                <p className="text-xs text-gray-600 my-1 line-clamp-2">{elem.description}</p>
                <h1 className="text-2xl font-bold text-emerald-600">${elem.price}</h1>
                <button
                  onClick={() => cartHandler(elem.id)}
                  className="bg-green-700 rounded text-white font-bold w-full mt-2 py-2"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        <div className="w-full lg:w-[30%] p-4 rounded-lg bg-white shadow-md">
          <h1 className="text-xl font-bold mb-4 text-center text-gray-800">Shopping Cart</h1>
          {cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 border-b pb-3"
                >
                  <img
                    className="h-16 w-16 object-cover rounded-md bg-gray-100"
                    src={item.image}
                    alt={item.title}
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-700">{item.title}</h4>
                    <p className="text-sm text-emerald-600 font-bold">${item.price}</p>
                  </div>
                  <button
                    onClick={() => removeHandler(item.id)}
                    className="bg-red-600 text-white text-sm px-3 py-1 rounded-md hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Total: ${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
                </h3>
                <button className="bg-blue-600 text-white w-full py-2 mt-2 rounded-md hover:bg-blue-700">
                  Checkout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
