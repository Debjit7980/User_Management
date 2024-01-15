import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'


function UpdateUser() {
  const {id}=useParams();
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[contact,setContact]=useState("");
  const navigate=useNavigate()

  useEffect(() => {
    fetch(`https://user-management-backend-app.onrender.com/getUser/${id}`)
      .then(response => response.json())
      .then(data => {
        setName(data.name);
        setEmail(data.email);
        setContact(data.contact);
        //console.log("Home:", data);
      })
      .catch(error => console.log(error));
  }, [id]);
  
  const Update = async (e) => {
    e.preventDefault();
  
    try {
      const data=await fetch(`https://user-management-backend-app.onrender.com/updateUser/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name,email,contact}),
      })
        /*.then(response => response.json())
        .then(data => {
          navigate('/');
          console.log(data);
        })
        .catch(error => console.log(error));*/
        const result=await data.json();
        if(result.status===201)
        {
            alert(result.message);
            navigate("/");
        }
        else{
            document.getElementById("demo").innerHTML=result.message;
        }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className='container col-4 p-2 mx-auto shadow m-5 update' >
            <h1 className='p-3'>Update User</h1>
            <p id="demo" className='text-success'></p>
            <p id="demo"></p>
            <form onSubmit={Update} className='update-form'>
                <div class="form-group m-2">
                    <label for="formGroupExampleInput">Name</label>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control " id="formGroupExampleInput" placeholder="Example input"/>
                </div>
                <div class="form-group m-2">
                    <label for="formGroupExampleInput2">Email</label>
                    <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} class="form-control" id="formGroupExampleInput2" placeholder="Another input"/>
                </div>
                <div class="form-group m-2">
                    <label for="formGroupExampleInput2">Department</label>
                    <input type="text" value={contact} onChange={(e)=>{setContact(e.target.value)}}  class="form-control" id="formGroupExampleInput2" placeholder="Another input"/>
                </div>
                <div className='buttons'>
                    <button type="submit" className='btn btn-success m-4'>Update</button>
                    <Link to="/" className='btn btn-primary back'>Back</Link>
                </div>
                
            </form>
        </div>
  );
}

export default UpdateUser
