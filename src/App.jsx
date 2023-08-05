import { useState,useEffect } from 'react'
import Header from './Header'
import Input from './Input'

const CLIENT_ID = "29c7e8b8484e412aab9c2dc177789f9f"; //api id from spotify used to get access to all artists
const CLIENT_SECRET = "608e375e469d46b694dfa908038fe87b";




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
