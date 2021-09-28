import { BsChevronRight } from "react-icons/bs";
import { Loader } from "@googlemaps/js-api-loader";
import React, { useState } from 'react';

// Initialise API for IP tracker
var api_key = process.env.REACT_APP_GEO_IPIFY_KEY;
var api_url = 'https://geo.ipify.org/api/v1?apiKey=' + api_key + '&ipAddress=';
/*e.preventDefault();
            let url = api_url + addressIP;
            require('http').get(url, function(response) {
              var str = '';
              response.on('data', function(chunk) { str += chunk; });
              response.on('end', function() { console.log(str); });
          }).end();*/
export default function App() {
  const [input, setInput] = useState ("");
  const [addressIP, setAddressIP] = useState("8.8.8.8");
  const [location, setLocation] = useState({ "city": "Mountain View",
                                             "region": "California",
                                             "country": "US",
                                             "postcode": "94035",
                                             "timezone": "-07:00",
                                             "lat": "37.38605",
                                             "lng": "-122.08385"});
  const [serviceProvider, setServiceProvider] = useState("Google LLC");                               
  const handleInput = (event) => {
    let localInput = input.toString();
    let arrayIP = localInput.split("."); // Split entered IP address up for further validation
      for ( let i = 0 ; i < arrayIP.length ; i++ ) {
        // Invalidate private IP addresses
        if( parseInt(arrayIP[0]) < 192 &&
              parseInt(arrayIP[i]) <= 255 && 
              parseInt(arrayIP[0]) !== 10 &&
              parseInt(arrayIP[0]) !== 0 &&
              (parseInt(arrayIP[0]) !== 172 && 
                (parseInt(arrayIP[1]) < 16 || parseInt(arrayIP[1]) > 31)) ) {
                  // Allow input as IP address
                  setAddressIP(localInput);
        } else { // Return validity error
          console.log(localInput);
        }
      }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleInput(event);
    let url = api_url + addressIP;
    // Run IP tracker
    require('http').get(url, function(response) {
      var str = '';
      response.on('data', function(chunk) { str += chunk; });
      response.on('end', function() {
        // Convert response into JS Object
        let responseJSON = JSON.parse(str);
        console.log(responseJSON); 
        setLocation(responseJSON.location);
        setServiceProvider(responseJSON.isp);
      });
    }).end();
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <header>
        <h1>IP Address Tracker</h1>
        <form 
            onSubmit={e => handleSubmit(e)}>
          <input
            type="text"
            id="ip-address"
            name="addressIP"
            title="Enter a valid IP address"
            minLength="7"
            maxLength="15"
            pattern="\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"
            placeholder="Search for any IP address"
            onChange={e => setInput(e.target.value)}
            onInvalid={e => e.target.setCustomValidity("Please enter a valid IP address!")}
            required
          />
          <button type="submit"><BsChevronRight /></button> 
        </form>
        <Datalist addressIP={addressIP} location={location} serviceProvider={serviceProvider} />
      </header>
    </div>
  );
}

// Initialise API for GMaps
const loader = new Loader({
  apiKey: process.env.REACT_APP_GMAPS_KEY,
  version: "weekly",
});
const Datalist = (props) => {
  let coordinates = {lat: parseFloat(props.location.lat), lng: parseFloat(props.location.lng)};
  loader.load().then(() => {
    // eslint-disable-next-line no-undef
    let map = new google.maps.Map(document.getElementById("map"), {
      center: coordinates,
      zoom: 8,
    });
    // eslint-disable-next-line no-undef
    new google.maps.Marker({
      position: coordinates,
      map,
      title: "IP Tracker",
    });
  });
  return (
    <article>
      <dl>
        <div>
          <dt>IP Address</dt>
          <dd>{props.addressIP}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{props.location.city}, {props.location.region}, {props.location.country}</dd>
        </div>
        <div>
          <dt>Timezone</dt>
          <dd>UTC {props.location.timezone}</dd>
        </div>
        <div id="last">
          <dt>ISP</dt>
          <dd>{props.serviceProvider}</dd>
        </div>
      </dl>
    </article>
  );
}