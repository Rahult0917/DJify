import './Input.css'
import React, {useState} from 'react'



const Input = () => {
  const [formData, setFormData] = useState(
    {
        firstName: "", 
        lastName: "", 
    }
  )
  
  function handleChange(event) {
    const {name, value} = event.target
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]:  value
        }
    })
  }
  
  console.log(formData)

  return (
    <form>
        <div className='inputs'>
            <input type="text" name="firstName" placeholder="Spotify Artist 1" value={formData.firstName} onChange={handleChange}></input>
            <input type="text" name="lastName" placeholder="Spotify Artist 2" value={formData.lastName}onChange={handleChange} ></input>
            <button type="submit">Find a match!</button >
            <span className="circle">{formData.firstName + formData.lastName}</span>
        </div>
    </form>
  )
}

export default Input