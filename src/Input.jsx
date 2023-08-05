import Data from './Data'
import React, { useState } from 'react'

const Input = (props) => {
  const { access } = props;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    option: "" // New state for storing selected radio button value
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const valid = !isSubmitted;
    setIsSubmitted(valid);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='inputs'>
        <input type="text" name="firstName" placeholder="Spotify Artist 1" value={formData.firstName} onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Spotify Artist 2" value={formData.lastName} onChange={handleChange} />
        <div className='selection'>
          <input type="radio" id="html_dance" name="option" value="Dance" onChange={handleChange} checked={formData.option === "Dance"} />
          <label htmlFor="html_dance">Dance</label>

          <input type="radio" id="html_energy" name="option" value="Energy" onChange={handleChange} checked={formData.option === "Energy"} />
          <label htmlFor="html_energy">Energy</label>

          <input type="radio" id="html_tempo" name="option" value="Tempo" onChange={handleChange} checked={formData.option === "Tempo"} />
          <label htmlFor="html_tempo">Tempo</label>
        </div>
        <button type="submit">Find a match!</button>
      </div>
      {isSubmitted && <Data datas={formData} accessToken={access} />}
    </form>
  )
}

export default Input;