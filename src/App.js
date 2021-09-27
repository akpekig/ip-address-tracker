import { BsChevronRight } from "react-icons/bs";
import "./App.css";

function App() {
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

export default App;
