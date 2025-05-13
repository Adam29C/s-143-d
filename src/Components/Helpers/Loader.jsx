import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loader = ({lodersize,text}) => {

  return (
    <div className='main-loader'><ClipLoader color="#4bb6b9"   size={15}/>
{text ? text : ""}
    </div>
  )
}

export default Loader