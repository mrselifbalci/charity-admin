import React,{useState,useEffect} from 'react'
import axios from 'axios' 
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../../styles/news.css'

export default function NewsDetails({apiBaseUrl}) {
    
    const { id } = useParams();
    const [news,setNews]=useState([])
 useEffect(() => {
     axios 
     .get(`${apiBaseUrl}/news/${id}`)
     .then((res)=>{
        setNews(res.data.data)   
     })
     .catch((err) => {
        console.log(err);
    });
 }, [])
    return (
        <div className="component-wrapper"> 

            <div className="news-detail-summary-container">
               <h1>{news.title}</h1>
               <p>{news.summary}</p>
               <div>
                   <h3>News Quote</h3>
                   <p>"{news.quote}"</p>
                   <p>{news.quoteAuthor}</p>
               </div>

               <div>
                    <h3>News Content</h3>
                    <p>{news.content}</p>
                </div>
            </div>
           
            <div className="news-detail-info-container">               
                <div className="media-container">
                    <div className="media-item">
                        <h3>Banner Image</h3>
                        <img className="news-images" src={news.mediaId && news.mediaId.url}  alt="news-img"/>
                    </div>
                    <div className="media-item">
                        <h3>Quote Author Image</h3>
                        <img className="news-images" src={news.quoteAuthorMedia && news.quoteAuthorMedia.url} alt="banner-img"/>
                    </div>
                </div>
                <div className="news-detail-buttons-container">
                    <Link to="/news"><button className="submit-button back-to-news-button"> Back to News List</button></Link>
                </div> 
                
                      
            </div>         
        </div>
    )
}
