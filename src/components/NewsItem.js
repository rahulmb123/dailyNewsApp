import React from 'react'

const NewsItem = (props)=>{
 
    let {title, description, imageUrl, newsUrl, author, date , source} = props;
    return (
      <div>
        <div className="card my-3">
          <div style={{display: 'flex',
                      justifyContent: 'flex-end',
                      position: 'absolute',
                      right: '0'}}>
            <span className="badge rounded-pill bg-danger">{source}<span className="visually-hidden">unread messages</span>
            </span>
          </div>
            <img src={!imageUrl?"https://cdn.ndtv.com/common/images/ogndtv.png":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">Author {!author? "Unknown" :author} | {new Date(date).toGMTString()}</small></p>
                <a href= {newsUrl} rel="noreferrer" target="_blank" className="btn btn-dark btn-sm">Read more</a>
            </div>  
        </div>
      </div>
    )
}

export default NewsItem
