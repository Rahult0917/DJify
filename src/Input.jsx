import './Input.css'
import Data from './Data'
import React, {useState} from 'react'



const Input = (props) => {
  const {access} = props;
  const [formData, setFormData] = useState(
    {
        firstName: "", 
        lastName: "", 
    }
  )
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  function handleChange(event) {
    const {name, value} = event.target
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]:  value
        }
    })
  }

  function handleSubmit(event){
    event.preventDefault();
    const valid = !isSubmitted;
    setIsSubmitted(valid);
  }
  

  return (
    <form onSubmit={handleSubmit}>
        <div className='inputs'>
            <input type="text" name="firstName" placeholder="Spotify Artist 1" value={formData.firstName} onChange={handleChange}></input>
            <input type="text" name="lastName" placeholder="Spotify Artist 2" value={formData.lastName}onChange={handleChange} ></input>
            <button type="submit">Find a match!</button >
            {isSubmitted &&<Data data={formData} accessToken={access} />}
        </div>
    </form>
  )
}

export default Input