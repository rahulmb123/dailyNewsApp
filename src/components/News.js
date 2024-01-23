import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country :'in',
        category :'general',
        pageSize : 8
    }
    
    static propTypes = {
        country : PropTypes.string,
        category : PropTypes.string,
        pageSize : PropTypes.number
    }

    capitalizeLetter = (string)=>
    {
        return string.charAt(0).toUpperCase()  + string.slice(1);
    }
    
    constructor(props)
    {
        super(props);
        console.log("I'm a constructor of component news")
        this.state = {
            articles: [],
             loading: false,
             page: 1,
             totalResults: 0
        }
        document.title = `${this.capitalizeLetter((this.props.category))} - DailyNew`;
    }

    async updateNews(){
        this.props.setProgress(20);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=de8a5c4a4b724dbea3aba5e21d565a66&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url); 
        this.props.setProgress(40);
        let parsedUrl = await data.json();
        this.props.setProgress(80);
        console.log(parsedUrl)
        console.log("Hi laudi billya")
              this.setState({
            articles:parsedUrl.articles,
            totalResults:parsedUrl.totalResults,
            loading:false
        })
        this.props.setProgress(100);
    }

    componentDidMount = () =>  {
        console.log("I'm componentDidMount")
            this.updateNews();
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=de8a5c4a4b724dbea3aba5e21d565a66&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data = await fetch(url);
        // let parsedUrl = await data.json();
        // console.log(parsedUrl)
        // this.setState({
        //     articles:parsedUrl.articles,
        //     totalResults:parsedUrl.totalResults,
        //     loading:false
        // })
    }

    // handlePrevPage = async ()=>{
    //     this.setState({page:this.state.page - 1});
    //     this.updateNews();
       
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=de8a5c4a4b724dbea3aba5e21d565a66&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading:true})
    //     let data = await fetch(url); 
    //     let parsedUrl = await data.json();
    //     console.log(parsedUrl)

    //     this.setState({
    //         page:this.state.page-1,
    //         articles:parsedUrl.articles,
    //         totalResults:parsedUrl.totalResults,
    //         loading:false
    //     })
    // }

    // handleNextPage = async ()=>{
    //     this.setState({page:this.state.page + 1});
    //     this.updateNews();
        
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=de8a5c4a4b724dbea3aba5e21d565a66&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //         this.setState({loading:true})
    //         let data = await fetch(url); 
    //         let parsedUrl = await data.json();
    //         console.log(this.state.page)

    //         this.setState({
    //             page:this.state.page+1,
    //             articles:parsedUrl.articles,
    //             totalResults:parsedUrl.totalResults,
    //             loading:false
    //         })
    // }
    fetchMoreData = async () => {
       this.setState({page: this.state.page + 1})
       console.log(this.state.page + 1)
       console.log("I'm fetchMoreData")
       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=de8a5c4a4b724dbea3aba5e21d565a66&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url); 
        let parsedUrl = await data.json();
        console.log(parsedUrl)

        this.setState({
            articles:this.state.articles.concat(parsedUrl.articles),
            totalResults:parsedUrl.totalResults,
            loading:false
        })
      };

  render() {
    return (
    <>
        <h2 className="text-center" style={{marginTop: '25px'}}>Breaking News - Top {this.capitalizeLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className='container my-3'>
            <div className="row">
                {this.state.articles.map((element, index)=>{
                    return <div className="col-md-4" key= {index}>
                    <NewsItem title={element.title?element.title.slice(0, 33):""} description={element.description?element.description.slice(0, 90):""} 
                    imageUrl= {element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source = {element.source.name}/>
                </div>
                })}
            </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevPage} >&larr; Previous</button>
            <button disabled = {this.state.page+1 > Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-primary " onClick={this.handleNextPage} >Next &rarr;</button>
        </div> */}
    </>
    )
  } 
}

export default News
