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

require('dotenv').config();

const loader = new Loader({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
  version: "weekly",
});

loader.load().then(() => {
  // eslint-disable-next-line no-undef
  let map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
});

var http = require('http');

var ip = '8.8.8.8';
var api_key = process.env.GEO_IPIFY_API_KEY;
var api_url = 'https://geo.ipify.org/api/v1?';

var url = api_url + 'apiKey=' + api_key + '&ipAddress=' + ip;

http.get(url, function(response) {
    var str = '';
    response.on('data', function(chunk) { str += chunk; });
    response.on('end', function() { console.log(str); });
}).end();