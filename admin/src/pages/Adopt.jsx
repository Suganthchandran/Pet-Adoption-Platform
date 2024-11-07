import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Adopt.css'

const Adopt = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const response = await axios.get('http://localhost:8086/api/adopt');
        setAdoptions(response.data.reverse());
        setLoading(false);
      } catch (err) {
        console.error('Error fetching adoption requests:', err);
        setError('Failed to load adoption requests');
        setLoading(false);
      }
    };

    fetchAdoptions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Adoption Requests</h1>
      {adoptions.length === 0 ? (
        <p>No adoption requests available.</p>
      ) : (
        <div className="list-main">
          <div className="list-table-head1" style={{fontWeight:'bold'}}>
            <div style={{marginRight:'2.5rem'}}>Name</div>
            <div style={{marginRight:'2.5rem'}}>Animal</div>
            <div style={{marginRight:'2.5rem'}}>Email</div>
            <div style={{marginRight:'2.5rem'}}>Phone</div>
            <div style={{marginRight:'2.5rem'}}>City</div>
            <div style={{marginRight:'2.5rem'}}>Address</div>
            <div style={{marginRight:'2.5rem'}}>Message</div>
            <div style={{marginRight:'2.5rem'}}>Owner Name</div>
            <div style={{marginRight:'2.5rem'}}>Owner Email</div>
            <div style={{marginRight:'2.5rem'}}>Owner Phone</div>
          </div>
          {adoptions.map((adoption) => (
            <div key={adoption._id} className="list-table-content1">
              <div style={{marginLeft:'0rem'}}>{adoption.name}</div>
              <div style={{marginLeft:'0rem'}}>{adoption.animalName}</div>
              <div style={{marginLeft:'0rem'}}>{adoption.email}</div>
              <div style={{marginLeft:'0rem'}}>{adoption.phone}</div>
              <div style={{marginLeft:'0rem'}}>{adoption.city}</div>
              <div style={{marginLeft:'0rem'}}>{adoption.address}</div>
              <div style={{marginLeft:'0rem'}}>{adoption.message}</div>
              <div style={{marginLeft:'0rem'}}>{adoption.ownername}</div>
              <div style={{marginLeft:'0rem'}}>{adoption.owneremail}</div>
              <div style={{marginLeft:'0rem'}}>{adoption.ownerphone}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Adopt;
