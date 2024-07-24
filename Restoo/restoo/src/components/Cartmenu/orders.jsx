import React, { useContext } from "react";
import { FaTrashAlt, FaCircle, FaStar } from "react-icons/fa";
import { MenuContext } from "../../context/menuContext.jsx";
const Orders = ({ cart, totalAmount, onClose, onDelete, onConfirm }) => {
  const user = useContext(MenuContext);

  const onOrder = async () => {
    console.log(cart);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-96 shadow-lg max-h-3/4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
        <div className="flex flex-col gap-2">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center border rounded-lg shadow-sm p-2 mt-2 gap-1 border-gray-400"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg"
              />
              <div className="flex-1 ml-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  {item.mark === "veg" && (
                    <div className="flex items-center justify-center h-4 w-4">
                      <FaCircle className="text-green-500 h-2 w-2" />
                    </div>
                  )}
                  {item.mark === "non-veg" && (
                    <div className="flex items-center justify-center h-4 w-4">
                      <FaCircle className="text-red-500 h-2 w-2" />
                    </div>
                  )}
                  {item.mark === "chef-special" && (
                    <div className="flex items-center justify-center h-4 w-4">
                      <FaStar className="text-purple-500 h-2 w-2" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">₹ {item.price}</span>
                  <button
                    onClick={() => onDelete(index)}
                    className="text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button onClick={onClose} className="underline text-sm">
            Close
          </button>
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={onConfirm}
            className="bg-lime-600 text-white px-4 py-2 rounded-lg"
          >
            Confirm and Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
