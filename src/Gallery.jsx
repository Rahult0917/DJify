import React from 'react'

const Gallery = (props) => {
  const {data} = props;
  const circleStyle = {
    width: 121,
    height: 112,
    backgroundColor: "lightblue",
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const curData = data[0].name;
  console.log(curData)
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