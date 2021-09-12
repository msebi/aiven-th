import './App.css';
import { GetGeoLocationAPI } from './hooks/GetGeoLocationAPI';

function App() {
  const geoLocation = GetGeoLocationAPI()
  return (
    <div className="App">
      <header className="App-header">
        aiven Cloud Selection Panel
      </header>
      <body className="App-body">
        <p>
          {geoLocation.isGeoLocationDataSet
            ? JSON.stringify(geoLocation)
            : "Location data not available yet."}
        </p>
      </body>
    </div>
  );
}

export default App;
