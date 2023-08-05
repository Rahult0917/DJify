import React, { useEffect } from 'react'

const Gallery = (props) => {
  const {data,option} = props;

  console.log(option)

  useEffect(()=>{
    if (option=='Energy'){
      
    }
    else if (option=='Tempo'){
      console.log('adada')
    }
    else if (option=='Dance'){
      console.log('adada')
    }
  },[])
  



  return (
    <div className="gallery">
      {data.map((item) => (
        <a href={item.url} style={{textDecoration: 'none'}}>
        <div
          key={item.id}
          style={{
            backgroundColor: "lightgreen",
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            width: 185,
            height: 185,
            borderRadius: '50%',
            color: 'white',
            
          }}
        >
          <p className='artistStyle'>Artist: {item.artist}</p>
          <p className='songStyle'>Song: {item.name}</p>
          <p className='traitStyle'>Tempo: {item.tempo}</p>
        </div>
        </a>
      ))}
    </div>
  );
}

export default Gallery