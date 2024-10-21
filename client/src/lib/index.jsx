export const getData = async(endpoint) => {   // getting data from backend
  try{ // response (the data)
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    })
    if(!res.ok){ // checking if the response is okay
      throw new Error('Data fetching Error' + res.statusText)
    }
    const data = await res.json();
    return data;

  } catch (error) { // throwing error if data is not found
    console.log('Error while fetching data', error)
    throw error;
  }
} 