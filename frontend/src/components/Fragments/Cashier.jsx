import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import { IoTrashOutline, } from "react-icons/io5"
import { FaPlus, FaMinus } from "react-icons/fa";
import Button from "../Elements/Button";
import { useSelector } from "react-redux";

const Cashier = () => {
    const { user } = useSelector((state) => state.auth)
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [msg, setMsg] = useState('')




    const saveTransaction = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/transaction', {
                sell_date: Date.now(),
                total_price: totalPrice,
                payment_method: "cash",
                discount: 13,
                user_id: user && user.id,
                // customer_id: customer_id,
                transaction_details: cart.map((item) => ({
                    item_id: item.id,
                    item_qty: item.quantity,
                    item_price: item.item_harga,
                    subtotal_price: item.item_harga * item.quantity
                }))
            })
            alert('Transaction created')
            navigate('/')
        } catch (error) {
            if (error.response) {
                alert(error.response.data.msg)
            }
        }
    }


    const handleInputChange = async (e) => {
        const inputValue = e.target.value;
        setQuery(inputValue);
        try {
            const response = await axios.get(`http://localhost:5000/items/${inputValue}`);
            setSuggestions(response.data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        const isItemInCart = cart.some((item) => item.item_nama === suggestion.item_nama);
        if (isItemInCart) {
            setQuery("");
        } else {
            setCart((prevCart) => [...prevCart, { ...suggestion, quantity: 1 }]);
            setQuery("");
        }

    }
    const totalPriceRef = useRef(null)

    useEffect(() => {
        setSuggestions([]);
    }, [cart]);

    useEffect(() => {
        if (cart.length > 0) {
            totalPriceRef.current.style.display = "table-row"
        } else {
            totalPriceRef.current.style.display = "none"
        }
    }, [cart])

    const handleIncreaseQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity += 1;
        setCart(updatedCart);
    };
    const handleDecreaseQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity -= 1;
        setCart(updatedCart);
    };

    const deleteItem = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
    };

    useEffect(() => {
        if (cart.length > 0) {
            const totalPrice = cart.reduce((a, item) => {
                return a + item.item_harga * item.quantity;
            }, 0);
            setTotalPrice(totalPrice);
        }
    }, [cart]);


    return (
        <div>
            <h1 >{msg}</h1>
            <h1 className="title">Cashier</h1>
            <div className="card is-shadowless">
                <div className="card-content column is-9">
                    <div className="content"></div>
                    <label className='block text-slate-700 text-sm font-bold mb-2'>Barcode</label>
                    <form onSubmit={saveTransaction}>
                        <p className="has-text-centered"></p>
                        <div className="w-full mt-2 mb-9">
                            <input
                                type="text"
                                value={query}
                                onChange={handleInputChange}
                                placeholder="Item Name or Barcode"
                                className="border rounded-md p-2 w-full"
                            />
                            {query.trim() !== '' && suggestions.length > 0 && (
                                <ul className='absolute z-50 bg-white column is-8 mt-2 border rounded-md'>
                                    {suggestions.map((suggestion, index) => (
                                        <li className="hover:bg-gray-100 p-2" key={`${suggestion.id}-${index}`} onClick={() => handleSuggestionClick(suggestion)}>
                                            {suggestion.item_nama}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>


                        <table className="table is-striped is-fullwidth">
                            {cart.length > 0 && <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>}
                            <tbody>
                                {cart.map((item, index) => (
                                    <tr key={index + 1}>
                                        <td>{item.item_nama}</td>
                                        <td>Rp. {new Intl.NumberFormat('id-ID').format(item.item_harga)}</td>
                                        <td>
                                            {item.quantity}
                                        </td>
                                        <td>{new Intl.NumberFormat('id-ID').format(item.item_harga * item.quantity)}</td>
                                        <td>
                                            <button className="button is-small is-info mr-1" type="button" onClick={() => handleIncreaseQuantity(index)}><FaPlus /></button>
                                            <button className="button is-small is-info mr-1" type="button" onClick={() => handleDecreaseQuantity(index)}><FaMinus /></button>
                                            <button className="button is-small is-danger" type="button" onClick={() => deleteItem(index)}><IoTrashOutline /></button>

                                        </td>
                                    </tr>
                                ))}
                                <tr ref={totalPriceRef}>
                                    <td colSpan={3}><b>Total Price</b></td>
                                    <td><b>Rp {totalPrice.toLocaleString("id-ID", { styles: "currency", currency: "USD", })}</b></td>
                                </tr>
                            </tbody>
                        </table>

                        {cart.length > 0 && <Button type="submit" children="Submit" classname="bg-blue-700 w-full"></Button>}
                    </form>

                </div>
            </div>

        </div>
    )
}

export default Cashier