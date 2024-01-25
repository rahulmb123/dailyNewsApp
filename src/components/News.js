import React,{useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {
    const apiKey = "9ac334c853b043b9a36f42da81a4be8e";
    const capitalizeLetter = (string)=>
    {
        return string.charAt(0).toUpperCase()  + string.slice(1);
    }

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    const updateNews= async ()=>{
        props.setProgress(20);

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url); 
        props.setProgress(40);
        let parsedUrl = await data.json();
        props.setProgress(80);
        console.log(parsedUrl)

        setArticles(parsedUrl.articles);
        setTotalResults(parsedUrl.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    
    useEffect(()=>{
        document.title = `${capitalizeLetter((props.category))} - DailyNew`;
        updateNews();
    }, [])

    // const handlePrevPage = async ()=>{
    //     setPage(page - 1);
    //     updateNews();
       
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page - 1}&pageSize=${props.pageSize}`;
            // setLoading(true);
    
    //     let data = await fetch(url); 
    //     let parsedUrl = await data.json();
    //     console.log(parsedUrl)
            // setArticles(parsedUrl.articles);
            // setTotalResults(parsedUrl.totalResults);
            // setLoading(false);
            // setPage(page - 1);
    //     
    // }

    // const handleNextPage = async ()=>{
        // setPage(page + 1)
    //     updateNews();
        
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
                // setLoading(true);
    //         let data = await fetch(url); 
    //         let parsedUrl = await data.json();

    //         // setArticles(parsedUrl.articles);
            // setTotalResults(parsedUrl.totalResults);
            // setLoading(false);
            // setPage(page + 1);
    // }

    const fetchMoreData = async () => {
        setPage(page+1)
       
       console.log("I'm fetchMoreData")
       let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
       setLoading(true)

        let data = await fetch(url); 
        let parsedUrl = await data.json();
        console.log(parsedUrl)

        setArticles(articles.concat(parsedUrl.articles));
        setTotalResults(parsedUrl.totalResults);
        setLoading(false)
      };

    return (
    <>
        <h2 className="text-center" style={{marginTop: '75px'}}>Breaking News - Top {capitalizeLetter(props.category)} Headlines</h2>
        {loading && <Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className='container my-3'>
            <div className="row">
                {articles.map((element, index)=>{
                    return <div className="col-md-4" key= {index}>
                    <NewsItem title={element.title?element.title.slice(0, 33):""} description={element.description?element.description.slice(0, 90):""} 
                    imageUrl= {element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source = {element.source.name}/>
                </div>
                })}
            </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
            <button disabled={page<=1} type="button" className="btn btn-primary" onClick={handlePrevPage} >&larr; Previous</button>
            <button disabled = {page+1 > Math.ceil(totalResults/20)} type="button" className="btn btn-primary " onClick={handleNextPage} >Next &rarr;</button>
        </div> */}
    </>
    )
  
    News.defaultProps = {
        country :'in',
        category :'general',
        pageSize : 8
    }
    News.propTypes = {
        country : PropTypes.string,
        category : PropTypes.string,
        pageSize : PropTypes.number
    }
}

export default News
