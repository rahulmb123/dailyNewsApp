import React from 'react'
import loadingPic from './loadingPic.gif'

const Spinner = ()=> {
    return (
      <div className="text-center my-3">
        <img style={{width:"35px"}} src={loadingPic} alt="loadingPic" />
      </div>
    )
}
export default Spinner