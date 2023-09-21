import React, { useState, useEffect } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

const CustomScrollbar = ({ children, onReachedBottom, ...props }) => {
  const [reachedBottom, setReachedBottom] = useState(false)

  const handlePageUpdate = ({ scrollTop, scrollHeight, clientHeight }) => {
    const padding = 100
    const top = ((scrollTop + padding) / (scrollHeight - clientHeight))
    if (top > 1) {
      if(scrollTop !== 0) { 
        setReachedBottom(true)
      } 
    } else {
      setReachedBottom(false)
    }
  }

  useEffect(() => {
    if(reachedBottom === true) {
      onReachedBottom()
    }
  }, [reachedBottom, onReachedBottom])

  return (
    <Scrollbars style={props.style} onUpdate={handlePageUpdate}>
      { children }
    </Scrollbars>
  )
}

export default CustomScrollbar
