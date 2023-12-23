import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export const ItemsList = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        getItems()
    }, [])

    const getItems = async () => {
        const response = await axios.get('http://localhost:5000/items')
        setItems(response.data)
        console.log(response.data)
    }

    const deleteStudent = async (id) => {
        await axios.delete(`http://localhost:5000/items/${id}`)
        getItems()
    }

    // function formatBirthDate(originalDate) {
    //     const [year, month, day] = originalDate.slice(0, 10).split('-');
    //     const formattedDate = `${day}-${month}-${year}`;
    //     return formattedDate;
    //   }


    return (
        <div>
            <h1 className="title">Items</h1>
            <h2 className="subtitle">List of Items</h2>
            <Link to="/items/add" className="button is-primary mb-2">Add New</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Barcode Item</th>
                        <th>Nama Item</th>
                        <th>Satuan</th>
                        <th>Harga</th>
                        <th>Kategori</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item.uuid}>
                            <th>{index + 1}</th>
                            <th>{item.item_barcode}</th>
                            <th>{item.item_nama}</th>
                            <th>{item.item_satuan}</th>
                            <th>Rp.{item.item_harga}</th>
                            <th>{item.category.category_name}</th>
                            <th>
                                <Link to={`/items/edit/${item.uuid}`} className="button is-small is-info mr-1">Edit</Link>
                                <button onClick={() => { deleteStudent(item.uuid) }} className="button is-small is-danger">Delete</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
