import React, { useRef, useEffect, useState } from 'react'
import InputForm from "../Elements/Input/index"
import Button from "../Elements/Button";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const FormEditStudent = () => {
  const [barcode, setBarcode] = useState("")
  const [name, setName] = useState("")
  const [unit, setUnit] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [msg, setMsg] = useState("")
  const navigate = useNavigate()
  const { id } = useParams()


  useEffect(() => {
    const getStudentById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/items/${id}`)
        setBarcode(response.data.item_barcode)
        setName(response.data.item_nama)
        setUnit(response.data.item_satuan)
        setPrice(response.data.item_harga)
        setCategory(response.data.category_id)
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg)
        }
      }
    }
    getStudentById()
  }, [id])


  const updateItem = async (e) => {
    e.preventDefault()
    try {
      await axios.patch(`http://localhost:5000/items/${id}`, {
        item_barcode: barcode,
        item_nama: name,
        item_satuan: unit,
        item_harga: price,
        category_id: category
      })
      navigate('/items')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }


  const usernameRef = useRef(null)
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  return (
    <div>
      <h1 className="title">Items</h1>
      <h2 className="subtitle">Update Items</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content"></div>
          <form onSubmit={updateItem}>
            <p className="has-text-centered">{msg}</p>
            <InputForm label="Barcode" type="text" placeholder="Muhammad" value={barcode} ref={usernameRef} onChange={(e) => setBarcode(e.target.value)} />
            <InputForm label="Nama Item" type="text" placeholder="Muhammad" value={name}  onChange={(e) => setName(e.target.value)} />
            <InputForm label="Satuan Item" type="text" placeholder="Muhammad" value={unit}  onChange={(e) => setUnit(e.target.value)} />
            <InputForm label="Harga" type="text" placeholder="Muhammad" value={price}  onChange={(e) => setPrice(e.target.value)} />
            <InputForm label="Kategori" type="text" placeholder="Muhammad" value={category}  onChange={(e) => setCategory(e.target.value)} />
            <Button type="submit" children="Update" classname="bg-blue-700 w-full"></Button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default FormEditStudent

