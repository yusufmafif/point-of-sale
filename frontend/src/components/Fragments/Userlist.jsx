import React, { useState, useEffect } from 'react'
import Layout from '../../pages/Layout'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'

export const Userlist = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const response = await axios.get("http://localhost:5000/users")
        setUsers(response.data)
    }

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:5000/users/${id}`)
        getUsers()
    }

    return (
        <div>
            <h1 className="title">Users</h1>
            <h2 className="subtitle">List of User</h2>
            <Link to="/users/add" className="button is-primary mb-2">Add New</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.uuid}>
                            <th>{index + 1}</th>
                            <th>{user.name}</th>
                            <th>{user.email}</th>
                            <th>{user.role}</th>
                            <th>
                                <Link to={`/users/edit/${user.uuid}`} className="button is-small is-info mr-1">Edit</Link>
                                <button onClick={() => { deleteUser(user.uuid) }} className="button is-small is-danger">Delete</button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Userlist
