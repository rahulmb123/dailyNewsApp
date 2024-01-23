import React, { Component } from 'react'
import loadingPic from './loadingPic.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center my-3">
        <img style={{width:"35px"}} src={loadingPic} alt="loadingPic" />
      </div>
    )
  }
}
