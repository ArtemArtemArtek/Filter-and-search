import React from "react";
import './SearchResult.css'
// import styled from "styled-components";
// import { BASE_URL, Button, Container } from "../App";


const SearchResult = ({ data }) => {
  return (
    <div className="cardContainer">
      <div>
        <div className="cards">
          {data?.map(({ name, image, text, price }) => (
            <div key={name} className="deviceCard">
              <div >
                <img src={image} className="device_image"/>
              </div>
              <div className="device_info">
                <div className="info">
                  <h3>{name}</h3>
                  <p>{text}</p>
                </div>
                <button className="buttonCard">${price.toFixed(2)}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResult