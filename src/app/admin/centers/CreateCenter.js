'use client';
import axios from "axios";
import { useState } from "react";
export default function CreateCenter() {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [region, setRegion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/center/insert', {
        _id: code,
        code,
        name,
        address,
        city,
        state,
        region,
      });
      console.log('Center created successfully:', response.data);
      // Clear form fields after successful submission
      setCode('');
      setName('');
      setAddress('');
      setCity('');
      setState('');
      setRegion('');
    } catch (error) {
      console.error('Error creating center:', error);
    }
  };

  return (
    <div >
    <h1>Hello</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        required
      />
      <button type="submit">Create Center</button>
    </form>

    </div>
  );
}
