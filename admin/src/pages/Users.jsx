import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Users.css'

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8086/api/users');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>User List</h1>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (


        <div className='list-main'>
          <div className='list-table-head9'>
            <b>Display Name</b>
            <b>Email</b>
            {/* <b>UID</b> */}
            <b>Email Verfied</b>
            <b>Creation Time</b>
            <b>Last Sign-in Time</b>
          </div>

          <div className='list-table-content-container'>
            {users.map((user) => (
              <div className='list-table-content9' key={user.uid}>
                <p>{user.displayName || 'Suganth'}</p>
                <p>{user.email}</p>
                {/* <p>{user.uid}</p> */}
                <p>{user.emailVerified ? 'Yes' : 'No'}</p>
                <p>{new Date(user.metadata.creationTime).toLocaleString()}</p>
      <p>{new Date(user.metadata.lastSignInTime).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
