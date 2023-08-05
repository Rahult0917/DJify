import Data from './Data'
import React, { useState } from 'react' //this file handles the input form

const Input = (props) => {
  const { access} = props; 
  const [formData, setFormData] = useState({
    firstName: "",        //formData object is used to gather data from the submisson form
    lastName: "",
    option: "",
    sortOption: "" 
  });
  const [isSubmitted, setIsSubmitted] = useState(false);  //form is initallys set to false

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

  function handleSubmitRefresh(){
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='inputs'>
        <input type="text" name="firstName" placeholder="Spotify Artist 1" value={formData.firstName} onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Spotify Artist 2" value={formData.lastName} onChange={handleChange} />

        <div className='selection'>
          <input type="radio" id="html_dance" name="option" value="dance" onChange={handleChange} checked={formData.option === "dance"} />
          <label htmlFor="html_dance">Dance</label>

          <input type="radio" id="html_energy" name="option" value="energy" onChange={handleChange} checked={formData.option === "energy"} />
          <label htmlFor="html_energy">Energy</label>

          <input type="radio" id="html_tempo" name="option" value="tempo" onChange={handleChange} checked={formData.option === "tempo"} />
          <label htmlFor="html_tempo">Tempo</label>
        </div>

        <div className='selection'>
          <input type="radio" id="html_merge_sort" name="sortOption" value="merge" onChange={handleChange} checked={formData.sortOption === "merge"} />
          <label htmlFor="html_merge_sort">Merge Sort</label>

          <input type="radio" id="html_quick_sort" name="sortOption" value="quick" onChange={handleChange} checked={formData.sortOption === "quick"} />
          <label htmlFor="html_quick_sort">Quick Sort</label>
        </div>

        <button type="submit">Find a match!</button>
        <button type="submit" onClick={handleSubmitRefresh}>Try Again?</button>
      </div>
      {isSubmitted && <Data datas={formData} accessToken={access} />}
    </form>
  )
}

export default Input;