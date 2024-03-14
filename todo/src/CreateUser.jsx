import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};


    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

  
    if (!age.trim()) {
      errors.age = 'Age is required';
    } else if (isNaN(age) || parseInt(age) < 0) {
      errors.age = 'Age must be a valid positive number';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post('http://localhost:3001/createUser', { name, email, age })
        .then((result) => navigate('/'))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className='mb-2'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              placeholder='Enter name'
              className='form-control'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className='text-danger'>{errors.name}</div>}
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Enter email'
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className='text-danger'>{errors.email}</div>}
          </div>
          <div className='mb-2'>
            <label htmlFor='age'>Age</label>
            <input
              type='number'
              id='age'
              placeholder='Enter age'
              className='form-control'
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {errors.age && <div className='text-danger'>{errors.age}</div>}
          </div>
          <button className='btn btn-success'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
