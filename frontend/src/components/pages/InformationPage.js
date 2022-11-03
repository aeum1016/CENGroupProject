import axios from 'axios';
import React from 'react'

function InformationPage() {
  const address = '12605 Biscayne Bay Drive North Miami, FL'

  const voterInfo = (e) => {
    e.preventDefault();
    const obj = {
      address: {address}
    }
    axios.get('api/voterinfo/', {obj})
    .then((response) => {
      var result = response.data;
      console.log(result);
    }, (error) => {
      console.log(error);
    })
  };

  return (
    <div>
      InformationPage
      <button onClick={voterInfo}/>
      </div>
  )
}

export default InformationPage
