import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Home() {
  //const {user}=setUser.u;
  const [user, setUser] = useState([])
  const navigate=useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000")
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = async (id) => {
    try{
      fetch(`http://localhost:5000/deleteUser/${id}`, {
      method: 'DELETE',
      }).then((res)=>res.json())
      .then(async(res)=>{
        if(res.status===201)
        {
          const updated=await fetch("http://localhost:5000");
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
      </div>
      <div className='data container  '>
        {/*<table className='table table-striped table-warning'>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Contact Details</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              user.map((em) => {
                //console.log(emp)
                return <tr>
                  <td>{em.name}</td>
                  <td>{em.email}</td>
                  <td>{em.contact}</td>
                  <td><Link to={`/updateUser/${em._id}`} className='btn btn-success'>Update</Link></td>
                  <td><button onClick={(e) => handleDelete(em._id)} className='btn btn-warning'>Delete</button></td>
                </tr>
              })

            }
          </tbody>
          </table>*/}
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
