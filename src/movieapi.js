import axios from 'axios';

const fetchData = async (setNames) => {
  const options = {
    method: 'GET',
    url: 'https://real-time-events-search.p.rapidapi.com/search-events',
    params: {
      query: 'series in india',
      date: 'any',
      is_virtual: 'false',
      start: '0'
    },
    headers: {
      'x-rapidapi-key': '6d8143df3fmsh895a97c3629236dp184249jsnff7d24451239',
      'x-rapidapi-host': 'real-time-events-search.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    const data = response.data;

    console.log('API response:', data); // Debugging line

    // Access the `data` array inside the response
    const searchResults = data.data || [];
    console.log('Search results:', searchResults); // Debugging line

    // Extract names directly from search results
    const names = searchResults.map(item => item.name);
    console.log('Extracted names:', names); // Debugging line

    // Update the state in the parent component with the extracted names
    setNames(names);
  } catch (error) {
    console.error('API request error:', error);
  }
};

export default fetchData;
