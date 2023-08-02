import React, { useEffect } from 'react'


const Data = (props) => {
  const {data,accessToken} = props;
  
  return (
    <div>{accessToken}</div>
  )
}

export default Data