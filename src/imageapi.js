import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './imageapi.css';

const BingImageSearch = ({ query }) => {
  const [images, setImages] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const subscriptionKey = 'c01cf0904b1e4746898aca7c54fa149e'; // Replace with your Bing Search API key
  const imaggaAuth = 'Basic YWNjXzBmYmNhNTNlODc2OTdlZTo2YmYxMzBmZjhjZGM3YTlmOGYzNWRkYzMyN2U4YTQwNQ==';
  const endpoint = 'https://api.bing.microsoft.com/v7.0/images/search';
  const count = 5; // Number of images per page

  useEffect(() => {
    const fetchImages = async () => {
      const url = `${endpoint}?q=${encodeURIComponent(query)}&count=${count}&safeSearch=Strict`;

      try {
        const response = await axios.get(url, {
          headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
          },
        });
        setImages(response.data.value || []); // Ensure response handling
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    if (query) {
      fetchImages();
    }
  }, [query, subscriptionKey, endpoint, count]);

  const handleDoubleClick = async (imageUrl) => {
    console.log('Double-clicked on image:', imageUrl); // Verify double-click event

    const url = `https://api.imagga.com/v2/tags?image_url=${encodeURIComponent(imageUrl)}`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': imaggaAuth,
        },
      });

      const productKeywords = ['shirt', 'chain', 'dress', 'pants', 'shoes', 'jacket', 'hat', 'bag', 'watch', 'sunglasses'];
      const filteredTags = (response.data.result.tags || []).filter(tag =>
        productKeywords.some(keyword => tag.tag.en.toLowerCase().includes(keyword))
      );

      setProductDetails(filteredTags);
    } catch (error) {
      console.error('Error identifying product:', error);
    }
  };

  return (
    <div className="bing-image-search">
      <h2>{query}</h2>
      <div className="images-container">
        {images.map((image) => (
          <div key={image.imageId} className="image-item">
            <img
              src={image.thumbnailUrl}
              alt={image.name}
              onDoubleClick={() => handleDoubleClick(image.contentUrl)} // Ensure contentUrl is correct
            />
          </div>
        ))}
      </div>
      {productDetails.length > 0 && (
        <div className="product-details">
          <h3>Identified Products:</h3>
          <ul>
            {productDetails.map((tag, index) => (
              <li key={index}>{tag.tag.en}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BingImageSearch;
