import React, { useEffect, useRef, useState } from 'react'

function Countdown({setResultVal}) {
    const [countdown, setCountdown] = useState(600);
    let timerId = useRef()
    useEffect(()=>{
            timerId.current = setInterval(()=>{
                setCountdown(prev=>prev-1);
    
            },1000)
            return ()=> clearInterval(timerId.current)
        
    },[])
    
    useEffect(()=>{
        if(countdown<0){
            clearInterval(timerId.current);
            setResultVal(true)
        }
    },[countdown])

    const formatTime = (time)=>{
        let minutes =Math.floor(time/60)
        let seconds = Math.floor(time - minutes * 60)

        if(minutes<10) minutes = "0"+minutes;
        if(seconds<10) seconds = "0"+seconds;

        return minutes +":"+seconds
    }
  return (
      <p> Time Remaining: {formatTime(countdown)}</p>
  )
}

export default Countdown
