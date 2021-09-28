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
      <Datalist addressIP={addressIP} location={location} serviceProvider={serviceProvider} />
    </div>
  );
}

require('dotenv').config();

const loader = new Loader({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
  version: "weekly",
});
const Datalist = (props) => {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
});
  return (
  );
}