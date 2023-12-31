import React, { useEffect,useState,useRef,useLayoutEffect } from 'react'

const Gallery = (props) => {
  const {option,sort} = props;  //sort option and type of sort is passed down from sort component
  const [data, setData] = useState(props.data); //data regarding artist is also passed down
  const [time,setTime] = useState(0); //time is set in state so it can be rendered below and manipulated easier


  const quickSort = (arr, option) => {  //quicksort function used , conditionals used depending on sorting condition
    if (arr.length <= 1) return arr;
  
    const pivot = arr[0];
    const left = [];
    const right = [];
  
    for (let i = 1; i < arr.length; i++) {
      if (option === 'tempo' && arr[i].tempo < pivot.tempo) {
        left.push(arr[i]);
      } else if (option === 'energy' && arr[i].energy < pivot.energy) {
        left.push(arr[i]);
      } else if (option === 'dance' && arr[i].danceability < pivot.danceability) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
  
    return [...quickSort(left, option), pivot, ...quickSort(right, option)];
  };
  
  
  

  const mergeSort = (arr, option) => { //mergesort function used , conditionals used depending on sorting condition
    if (arr.length <= 1) {
      return arr;
    }
  
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
  
    if (option === 'tempo') {
      return merge(mergeSort(left, option), mergeSort(right, option), option);
    } else if (option === 'dance') {
      return merge(mergeSort(left, option), mergeSort(right, option), option);
    } else if (option === 'energy') {
      return merge(mergeSort(left, option), mergeSort(right, option), option);
    }
  };
  
  const merge = (left, right, option) => {  //mergesort helepr function
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    while (leftIndex < left.length && rightIndex < right.length) {
      if (option === 'tempo' && left[leftIndex].tempo < right[rightIndex].tempo) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else if (option === 'dance' && left[leftIndex].danceability < right[rightIndex].danceability) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else if (option === 'energy' && left[leftIndex].energy < right[rightIndex].energy) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
  
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };
 

  const startTimeRef = useRef(0); //useRef hook used as I ran into many errors trying to incorporate a timer within the useEffect


  useEffect(()=>{
    startTimeRef.current = performance.now(); //starts timer

    if(sort=='quick'){  //if quick sort
      const sortedData = quickSort(data,option); 
      setData(sortedData);  //updates data variable to sorteddata
    
    }
    else if(sort=='merge'){ //if merge sort
        const sortedData = mergeSort(data,option); 
        setData(sortedData);  
    }
        
  },[option,sort])
  
  useLayoutEffect(() => {
    const endTime = performance.now();
    const timeTaken = endTime - startTimeRef.current;
    setTime(timeTaken);
  }, [data]);




  return (  //returns gallery of sorted artitsts
    <div className="gallery">
      {data.map((item) => (
        <a href={item.url} style={{textDecoration: 'none'}}>  {/*anchor tag used so user can click on song */} 
        <div                // data array mapped over and then is styled to make app more aesthetic
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
          <p className='artistStyle'>Artist: {item.artist}</p>  {/*artist name displayed */}
          <p className='songStyle'>Song: {item.name}</p>  {/*song name displayed */}
          {option === 'dance' && <p className='traitStyle'>Danceability: {item.danceability}</p>} {/*conditional rendering used to display wanted trait */}
          {option === 'energy' && <p className='traitStyle'>Energy: {item.energy}</p>}
          {option === 'tempo' && <p className='traitStyle'>Tempo: {item.tempo}</p>}
        </div>
        </a>
      ))}
      <h1 className='time'>{/*displays time */} 
      {time.toFixed(3)} milliseconds
      </h1>
    </div>
  );
}

export default Gallery