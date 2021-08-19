import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import '../../styles/table.css'
import '../../styles/news.css'  

export default function AddNews({apiBaseUrl}) {

  const [authorImage, setAuthorImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [quote, setQuote] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  


  const history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("mediaId", bannerImage);
    formData.append("quoteAuthorMedia", authorImage);
    formData.append("type", type);
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("quote", quote);
    formData.append("quoteAuthor", quoteAuthor);
    formData.append("altImage", "news-banner");
    formData.append("altQuote", "quote-author");
    
    
 

    await axios
      .post(`${apiBaseUrl}/news`, formData)
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    history.push("/news");
  };

  const cancelUpload = (e) => {
    e.preventDefault();
    setAuthorImage("");
    setBannerImage("");
    setType("");
    setTitle("");
    setSummary("");
    setQuote("");
    setQuoteAuthor("");
  };
  return (
  <div className="news-component-wrapper">
    <div className="add-news-container">
      <div className="add-news-title-text">
          <h1>Add News or Campaign</h1>
      </div>
      <form className="add-news-form-container" onSubmit={handleSubmit}>
        <div className="add-news-category">
            <select onChange={(e) => setType(e.target.value)}>
              <option value="">Type</option>
              <option value="news">News</option>
              <option value="campaign">Campaign</option>
            </select>
        </div>  
        <div className="add-news-main">
            <div className="add-news-main-column-one">
              <div className="add-news-item">
                <label>Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)}/>
              </div>
              <div className="add-news-item">
                <label>Summary</label>
                <input value={summary} onChange={(e) => setSummary(e.target.value)}/>
              </div>
              <div className="add-news-item">
                <label>Quote Author</label>
                <input value={quoteAuthor} onChange={(e) => setQuoteAuthor(e.target.value)} />
              </div>
              <div className="add-news-item">
                <label>Quote</label>
                <textarea value={quote} onChange={(e) => setQuote(e.target.value)}/>
              </div>
              <div className="add-news-item">
                <label>Banner Image</label>
                <input type="file" onChange={(e) => {setBannerImage(e.target.files[0]);}}/>
              </div>
              <div className="add-news-item">
                <label>Quote Author Image</label>
                <input type="file" onChange={(e) => {setAuthorImage(e.target.files[0]);}}/>
              </div>
            </div>

            <div className="add-news-main-column-two">

                    <label>Content</label>
                    <input value="CK-EDITOR"/>

                 
                 <div>
                  {isLoading ? (
                    <p className="loading-text">
                      Uploading the news...
                    </p>
                  ) : null}
                </div>
            </div>
        </div>
        <div className="add-news-buttons">
          <div>
            <button className="submit-button add-news-button-items" type="submit">
              Submit
            </button>
          </div>
          <div>
            <button className="cancel-button add-news-button-items" onClick={cancelUpload}>
              Cancel
            </button>
          </div>
          
        </div>
      </form>
      </div>
    </div>
  );
}
