import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Newsinfo = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const getNewsById = async (newsId) => {
      try {
        const response = await axios.get(`https://expodersfour-001-site1.ltempurl.com/api/lookup/GetNewsById?id=${newsId}`);
        setNews(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news by ID:', error);
        setLoading(false);
      }
    };

    if (id) {
      getNewsById(id);
    }
  }, [id]);

  const newsInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    padding: '20px',
    margin: '20px auto',
    maxWidth: '1000px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const labelStyle = {
    fontWeight: 'bold'
  };

  const descriptionStyle = {
    overflow: 'hidden',
    marginBottom: '10px'
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const displayData = (data) => {
    return data !== null ? data : 'NA';
  };

  const countWords = (text) => {
    return text.split(/\s+/).filter(word => word.length > 0).length;
  };

  const getShortDescription = (text, wordLimit) => {
    const words = text.split(/\s+/);
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  return (
    <div className="container" style={{ fontFamily: 'San Francisco, Helvetica, Arial, sans-serif' }}>
      <div style={newsInfoStyle}>
        <div style={{ marginBottom: '20px' }}>
          <div className="mb-4">
            <label style={labelStyle}>Title:</label>
            <div>{loading ? 'Loading...' : displayData(news ? news.title : null)}</div>
          </div>
          <div className="mb-4">
            <label style={labelStyle}>Description:</label>
            <div style={descriptionStyle}>
              {loading ? 'Loading...' : displayData(news ? (showFullDescription ? news.description : getShortDescription(news.description, 50)) : null)}
            </div>
            {news && news.description && countWords(news.description) > 50 && (
              <button className="btn btn-link" onClick={toggleDescription} style={{ display: 'block', marginLeft: '-10px' }}>
                {showFullDescription ? 'Read Less' : 'Read More'}
              </button>
            )}
          </div>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <div className="mb-4">
            <label style={labelStyle}>Date & Time:</label>
            <div>
              {loading
                ? 'Loading...'
                : displayData(news ? new Date(news.dateTime).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }) : null)}
            </div>
          </div>
          <div className="mb-4">
            <label style={labelStyle}>Village:</label>
            <div>{loading ? 'Loading...' : displayData(news ? news.village : null)}</div>
          </div>
        </div>
        <div>
          <div className="mb-4">
            <label style={labelStyle}>Created Date:</label>
            <div>
              {loading
                ? 'Loading...'
                : displayData(news ? new Date(news.created_on).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : null)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsinfo;
