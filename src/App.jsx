import { useState,useEffect } from 'react'
import Header from './Header'
import Input from './Input'

const CLIENT_ID = "330fa14d7def4b9f9955b0c12a160e25"; //api id from spotify used to get access to all artists
const CLIENT_SECRET = "274b0417c6334a608518fdd4ec9490fd";




function App() {
  const [accessToken,setAccessToken] = useState("");
  useEffect(()=>{     //retreives api access token 
    var authParameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token',authParameters)
      .then(result => result.json())
      .then(data=> setAccessToken(data.access_token)) //saves api access token to the accessToken variable in state and passes it down
  },[])

  return ( //app consists of a header and an input which consists of other components, accessToken is passed down as a prop
    <>
      <Header/> 
      <Input access={accessToken}/> 
    </>
  )
}
          
export default App
