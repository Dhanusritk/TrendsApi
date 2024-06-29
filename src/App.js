import React, { useEffect, useState } from "react";
import BingImageSearch from "./imageapi";
import fetchData from "./movieapi";

const App = () => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    fetchData(setNames);
  }, []);

  return (
    <div>
      <h1>Trending Series in India</h1>
      <ul>
        {names.length === 0 ? (
          <li>Loading...</li>
        ) : (
          names.slice(0, 2).map((name, index) => (
            <BingImageSearch key={index} query={name} />
          ))
        )}
      </ul>
    </div>
  );
};

export default App;
