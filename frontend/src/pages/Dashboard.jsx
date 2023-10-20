import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';

const Dashboard = () => {

    const [customerList, setCustomerList] = useState([])
    const [popup, setPopup] = useState(false)

    const init = {
        first_name: '',
        last_name: '',
        street: '',
        address: '',
        city: '',
        state: '',
        email: '',
        phone: '',
    }

    const [customer, setCustomer] = useState(init)
    const [edit, setEdit] = useState(false)

    useEffect(() => {

        async function getCustomerList() {
            const response = await fetch('http://localhost:8080/getCustomerList?cmd=get_customer_list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setCustomerList(data)
            } else {
                // Handle errors
                const errorData = await response.json();
                console.log(errorData);
                alert(`Error: Incorrect login details. Please try again.`);
            }
        }

        getCustomerList()

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(customer);
        const response = await fetch('http://localhost:8080/createCustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(customer)
        });
        if (response.status === 200) {
            setCustomerList([customer, ...customerList])
            setCustomer(init)
            alert('Customer Added Successfully')
        } else {
            // Handle errors
            console.log(response);
            alert(`Error: Incorrect login details. Please try again.`);
        }
        setPopup(false)
        setEdit(false)
    }

    const handlePassEdit = async (e) => { 
        e.preventDefault()
        console.log(customer);
        const response = await fetch(`http://localhost:8080/updateCustomer?uuid=${customer.uuid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(customer)
        });
        if (response.status === 200) {
            const newList = customerList.map((item) => {
                if (item.uuid === customer.uuid) {
                    return customer
                }
                return item
            })
            setCustomerList(newList)
            setCustomer(init)
            alert('Customer Updated Successfully')
        } else {
            // Handle errors
            console.log(response);
            alert(`Error: Incorrect login details. Please try again.`);
        }
        setPopup(false)
        setEdit(false)
    }

    const handleClose = () => {
        setPopup(false)
        setCustomer(init)
        setEdit(false)
    }

    const handleEdit = (customer) => {
        setCustomer(customer)
        setPopup(true)
        setEdit(true)
    }

    const handleDelete = async (customer) => { 
        const response = await fetch(`http://localhost:8080/deleteCustomer?uuid=${customer.uuid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        if (response.status === 200) {
            const newList = customerList.filter((item) => item.uuid !== customer.uuid)
            setCustomerList(newList)
            alert('Customer Deleted Successfully')
        } else {
            // Handle errors
            console.log(response);
            alert(`Error: Incorrect login details. Please try again.`);
        }
    }


    return (
        <div className='mx-2 ' >

            {/* Modal */}
            {popup && <div class="modal show d-block  fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" >
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add Customer</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleClose()}>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form >
                                <div className='d-lg-flex gap-3  '>
                                    <div class="form-floating w-100  mb-3">
                                        <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" value={customer.first_name} onChange={(e) => setCustomer({ ...customer, first_name: e.target.value })} />
                                        <label for="floatingInput">First Name</label>
                                    </div>
                                    <div class="form-floating w-100  ">
                                        <input type="text" class="form-control" id="floatingPassword" placeholder="Password" value={customer.last_name} onChange={(e) => setCustomer({ ...customer, last_name: e.target.value })} />
                                        <label for="floatingPassword">Last Name</label>
                                    </div>
                                </div>
                                <div className='d-lg-flex gap-3  '>
                                    <div class="form-floating w-100  mb-3">
                                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={customer.street} onChange={(e) => setCustomer({ ...customer, street: e.target.value })} />
                                        <label for="floatingInput">Street</label>
                                    </div>
                                    <div class="form-floating w-100  ">
                                        <input type="text" class="form-control" id="floatingPassword" placeholder="Password" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />
                                        <label for="floatingPassword">Address</label>
                                    </div>
                                </div>
                                <div className='d-lg-flex gap-3  '>
                                    <div class="form-floating mb-3 w-100  ">
                                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={customer.city} onChange={(e) => setCustomer({ ...customer, city: e.target.value })} />
                                        <label for="floatingInput">City</label>
                                    </div>
                                    <div class="form-floating w-100  ">
                                        <input type="text" class="form-control" id="floatingPassword" placeholder="Password" value={customer.state} onChange={(e) => setCustomer({ ...customer, state: e.target.value })} />
                                        <label for="floatingPassword">State</label>
                                    </div>
                                </div>
                                <div className='d-lg-flex gap-3  '>
                                    <div class="form-floating mb-3 w-100  ">
                                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
                                        <label for="floatingInput">Email</label>
                                    </div>
                                    <div class="form-floating w-100  ">
                                        <input type="text" class="form-control" id="floatingPassword" placeholder="Password" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
                                        <label for="floatingPassword">Phone</label>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={() => setPopup(false)}>Save and close</button>
                            {!edit && <button type="button" class="btn btn-primary" onClick={handleSubmit} > Submit </button>}
                            {edit && <button type="button" class="btn btn-primary" onClick={handlePassEdit} > Edit </button>}
                        </div>
                    </div>
                </div>
            </div>}

            <h1>Customer List</h1>
            <div className='justify-content-end me-4  d-flex '>
                <button className='btn btn-primary' onClick={() => setPopup(true)}>Add a customer</button>
            </div>
            <table className='table table-sm' >
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Street</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customerList.map((customer) => {
                        return (
                            <tr key={customer.uuid}>
                                <td>{customer.first_name}</td>
                                <td>{customer.last_name}</td>
                                <td>{customer.street}</td>
                                <td>{customer.address}</td>
                                <td>{customer.city}</td>
                                <td>{customer.state}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td className='d-flex  ' >
                                    <div className='  ' style={{ cursor: 'pointer' }} onClick={() => handleDelete(customer)}>
                                        <MdDelete />
                                    </div>
                                    <div className='ms-2  ' onClick={() => handleEdit(customer)} style={{ cursor: 'pointer' }}>
                                        <MdEdit />
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard