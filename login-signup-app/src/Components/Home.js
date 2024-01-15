import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Home() {
  //const {user}=setUser.u;
  const [user, setUser] = useState([])
  const navigate=useNavigate();
  useEffect(() => {
    fetch("https://user-management-backend-app.onrender.com")
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = async (id) => {
    try{
      fetch(`https://user-management-backend-app.onrender.com/deleteUser/${id}`, {
      method: 'DELETE',
      }).then((res)=>res.json())
      .then(async(res)=>{
        if(res.status===201)
        {
          const updated=await fetch("https://user-management-backend-app.onrender.com");
          const result=await updated.json();
          setUser(result);
          navigate("/deleteUser");
          //document.getElementById("demo").innerHTML=res.message;
        }
        else{
          console.log("Use Not Deleted");
          //document.getElementById("demo").innerHTML=res.message;
        }
      })
      .catch((e)=>console.log(e))  
    }
    catch(e)
    {
      console.log(e);
    }
      
  };
  return (
    <div>
      <div className='navbar  p-3 text-center mx-auto  bg-dark text-light'>
        <div className="text-right">
          <Link to="/addUser" className='btn btn-primary me-4'>Add User</Link>
        </div>
        <div className="text-middle">
          <Link to="/"><h3>User Management</h3></Link>
        </div>
      </div>
      <div className='data container'>
          {user.map((us)=>{
            return <div className="card" style={{ width: "18rem" }} key={us._id}>
            <div className="card-body">
              <h5 className="card-title">{us.name}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary" id="email"><label>E-mail: {us.email}</label></h6>
              <h6 className="card-text" id="contact"><label>Contact: {us.contact}</label> </h6>
              <div className='buttons'>
                <Link to={`/updateUser/${us._id}`} className='btn btn-success' id="up">Update</Link>
                <button onClick={(e) => handleDelete(us._id)} className='btn btn-warning' id="up">Delete</button>
              </div>
             
            </div>
          </div>  
            })
          }
      </div>
    </div>

  )
}

export default Home
