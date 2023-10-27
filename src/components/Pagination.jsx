import React, { useState } from 'react'

const Pagination = ({ currentPage, endPage, onNextPage, onPrevPage ,numbers,changeCPage }) => {





  return (
    <div>
      <button onClick={()=>{
        onPrevPage()
       
      }}>
        prev
      </button>
      <nav>
        {
          numbers.map((n,i)=>(
            <li key={i}> 
             <a href="#" className='' onClick={()=>{changeCPage(i+1)}}>{n}</a>
            </li>
          ))

        }
      
      </nav>
      <button onClick={()=>{
        onNextPage()
      }}>
        next
      </button>
    </div>
  )
}

export default Pagination