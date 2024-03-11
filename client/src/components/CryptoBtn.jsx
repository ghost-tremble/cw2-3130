import React from 'react'

export const CryptoBtn = ({title,action,dbTitle}) => {
  return (
    <div className='coin-btn' onClick={()=>action(dbTitle)}>
  <span>
 {title}
  </span>
   
   
       
        
        </div>
  )
}


