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
  const [isSubmitted, setIsSubmitted] = useState(false);  //form is intially set to false

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => { //registers input from forms and stores in state
      return {
        ...prevFormData,
        [name]: value
      }
    });

    
  }

  function handleSubmit(event) {  //submits the form
    event.preventDefault();
    const valid = !isSubmitted;
    setIsSubmitted(valid);
  }

  function handleSubmitRefresh(){ //submission for trying again
    window.location.reload();
  }



  //form below 
  return (
    <form onSubmit={handleSubmit}>  
      <div className='inputs'>
        {/*inputs for Spotify Artists */}
        <input type="text" name="firstName" placeholder="Spotify Artist 1" value={formData.firstName} onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Spotify Artist 2" value={formData.lastName} onChange={handleChange} />
        
        {/*inputs for choosing what characteristic*/}
        <div className='selection'>
          <input type="radio" id="html_dance" name="option" value="dance" onChange={handleChange} checked={formData.option === "dance"} />
          <label htmlFor="html_dance">Dance</label>

          <input type="radio" id="html_energy" name="option" value="energy" onChange={handleChange} checked={formData.option === "energy"} />
          <label htmlFor="html_energy">Energy</label>

          <input type="radio" id="html_tempo" name="option" value="tempo" onChange={handleChange} checked={formData.option === "tempo"} />
          <label htmlFor="html_tempo">Tempo</label>
        </div>
        {/*inputs for sorting option*/}
        <div className='selection'>
          <input type="radio" id="html_merge_sort" name="sortOption" value="merge" onChange={handleChange} checked={formData.sortOption === "merge"} />
          <label htmlFor="html_merge_sort">Merge Sort</label>

          <input type="radio" id="html_quick_sort" name="sortOption" value="quick" onChange={handleChange} checked={formData.sortOption === "quick"} />
          <label htmlFor="html_quick_sort">Quick Sort</label>
        </div>
        {/*form submission - first one is used for finding a match the other is to try again */}
        <button type="submit">Find a match!</button>
        <button type="submit" onClick={handleSubmitRefresh}>Try Again?</button>
      </div>
      {isSubmitted && <Data datas={formData} accessToken={access} />}
    </form>
  )
}

export default Input;