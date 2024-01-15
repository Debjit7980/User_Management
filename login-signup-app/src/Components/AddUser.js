import React, { useState } from 'react'
import { Link } from 'react-router-dom'


function AddUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await fetch("https://user-management-backend-app.onrender.com/addUser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, contact }),
            })
            const result = await data.json()
            if (result.status === 201) {
                
                document.getElementById("demo2").innerHTML = result.message;
                setName('');
                setEmail('');
                setContact('');
                setTimeout(() => {
                    document.getElementById("demo2").innerHTML = '';
                }, 2000);
            }
        } catch (e) {
            console.error("Error is:", e);
        }
    };

    return (
        <div>

            <div className="form signin">
                <p id="demo2" className='text-success'></p>
                <h3>Add User</h3>
                <form onSubmit={handleSubmit} className='signinform'>
                    <div className='cont'>
                        <div className="form-floating mb-4">
                            <input type="text" className="form-control shadow-none" required name="name" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="name" />
                            <label >User Name</label>

                        </div>
                        <div className="form-floating mb-4">
                            <input type="email" className="form-control shadow-none" required name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="name@example" />
                            <label >E-mail</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input type="tel" pattern="[0-9]{10}" title="Please enter 10 digi Number" className="form-control shadow-none" required name="cont" value={contact} onChange={(e) => { setContact(e.target.value) }} placeholder="contact" />
                            <label >Contact</label>

                        </div>
                        <div className='buttons'id="add">
                            <button type="submit" className='btn btn-success m-4'>Add User</button>
                            <Link to="/" className='btn btn-primary m-4'>Back</Link>
                        </div>
                    </div>
                    <div className='pic'>
                        <img src={require('./1.jpg')} className='image' alt="img" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUser
