import { BsChevronRight } from "react-icons/bs";
import { Loader } from "@googlemaps/js-api-loader";
import React from 'react';
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <header>
        <h1>IP Address Tracker</h1>
        <form>
          <input
            type="text"
            id="ip-address"
            name="addressIP"
            placeholder="Search for any IP address or domain"
            minlength="7"
            maxlength="15"
            size="20"
            required
          />
          <button type="submit"><BsChevronRight /></button>
          IP Address Location Timezone UTC ISP
        </form>
      </header>
      <div id="map"></div>
      <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="#">Your Name Here</a>.
      </div>
    </div>
  );
}

const loader = new Loader({
  apiKey: "AIzaSyD89y5MUDYd1B0uD6UiJMr-1ztnTlce8Dg",
  version: "weekly",
});

loader.load().then(() => {
  // eslint-disable-next-line no-undef
  let map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
});
