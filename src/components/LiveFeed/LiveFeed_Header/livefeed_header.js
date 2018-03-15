import React, { Component } from 'react';


const LFHeader = ({city}) => {
  console.log(city)

  console.log(city)
    if(!city){
      return(
        <div>
          Please wait a moment...
        </div>
      )
    }

    return (
      <nav className="navbar navbar-light bg-light">
        In your area: {city}
      </nav>
    );

}

export default LFHeader;
