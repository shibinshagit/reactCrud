import React, {useEffect, useState } from 'react'
import axios from 'axios'
import { Link ,useNavigate} from 'react-router-dom'

function Users() {

const [users,setUsers] = useState ([{
    Name : "yousaf", Email : "aloo@gmail.com",Age : 30 
}])

useEffect (() => {
    axios.get('http://localhost:3001')
    .then(result => setUsers(result.data))
    .catch(err => console.log('sha3421',err))
    },[])
const navigate = useNavigate()
    const handleDelete = (id) => {
        axios.delete("http://localhost:3001/deleteUser/"+id)
        .then(result => 
            window.location.reload()
           )
        .catch(err => console.log(err))
    }    

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
       <Link to="/create" className='btn btn-success'>Add+</Link>
        <table className='table'>
            <thead>
                <tr>
                    <th>name</th>
                    <th>email</th>
                    <th>age</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
{
    users.map((user) => {
      return  <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>  <Link to={`/update/${user._id}`} className='btn btn-success'>update</Link>
            <button className='btn btn-danger' onClick={(e) =>{
                handleDelete(user._id)
            }}>Delete</button></td>
        </tr>
    })
}
            </tbody>
        </table>
    </div>
    </div>
  )
}

export default Users
