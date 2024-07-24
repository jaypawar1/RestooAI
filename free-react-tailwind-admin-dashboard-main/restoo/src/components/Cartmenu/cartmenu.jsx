import React, { useContext, useState } from "react";
import { foodItems } from "./menu";
import { FaCircle, FaStar } from "react-icons/fa";
import Orders from "./orders";
import axios from "axios";
import { MenuContext } from '../../context/menuContext.jsx';
const Cartmenu = () => {

  const user = useContext(MenuContext);
  console.log(user);
  console.log(user[1]._id);
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showOrderPopup, setShowOrderPopup] = useState(false);

  const addToCart = (item) => {
    if (cart.length < 4) {
      setCart([...cart, item]);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 20000);
    } else {
      alert("You can only add up to 4 items to the cart.");
    }
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  const createOrder = async (orderData, userId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/order/', orderData);
      console.log(response.data);
      await sendMessage(response.data.data, userId); // Correcting the argument passed to sendMessage
    } catch (error) {
      console.error('Error creating order:', error.response ? error.response.data : error.message);
    }
  };

  const sendMessage = async (orderId, userId) => {
    try {
      const res = await axios.post('http://localhost:5000/webhooks/', { order: orderId, client: userId });
      setResponse(res.data);
    } catch (error) {
      console.error('Error sending message:', error);
      setResponse('Error sending message');
    }
  };

  const onConfirm = () => {
    const orderData = {
      product: cart.map((product) => ({
        item: product.name,
        price: product.price,
        quantity: 1, // Set the quantity as needed
      })),
      price: cart.reduce((total, product) => total + product.price, 0),
      status: 'Pending',
      clientId: user[1]._id,
      orderDate: new Date(),
    };

    createOrder(orderData, user[1]._id);
  };
  return (
    <div className="flex flex-col gap-1">
      {foodItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center border rounded-lg shadow-sm p-2 mt-2 gap-1 border-gray-400"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 rounded-lg"
          />
          <div className="flex-1 ml-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium ">{item.name}</h3>
              {item.mark === "veg" && (
                <div className="flex items-center justify-center h-4 w-4 ">
                  <FaCircle className="text-green-500 h-2 w-2" />
                </div>
              )}
              {item.mark === "non-veg" && (
                <div className="flex items-center justify-center h-4 w-4 ">
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
                onClick={() => addToCart(item)}
                className="flex items-center px-2 py-1 border border-lime-600 rounded-lg text-lime-600"
              >
                + Add
              </button>
            </div>
          </div>
        </div>
      ))}
      {showPopup && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-lime-100 border border-green-500 rounded-lg p-4 shadow-lg w-80">
          <div className="flex justify-between items-center">
            <span>Total {cart.length} items added</span>
            <span className="font-semibold">Total amount: ₹ {totalAmount}</span>
          </div>
          <button
            onClick={() => setShowOrderPopup(true)}
            className="underline text-sm mt-2"
          >
            Review order details
          </button>
        </div>
      )}
      {showOrderPopup && (
        <Orders
          cart={cart}
          totalAmount={totalAmount}
          onClose={() => setShowOrderPopup(false)}
          onDelete={removeFromCart}
          onConfirm={onConfirm}
        />
      )}
    </div>
  );
};

export default Cartmenu;
