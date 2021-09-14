import './App.css';
import { GetGeoLocation } from './hooks/GetGeoLocation';
import { GetCloudServiceProviders } from './hooks/GetCloudServiceProviders';
import { CloudSelectionPanel } from './components/cloudselectionpanel/CloudSelectionPanel'

function App() {
  const geoLocation = GetGeoLocation()
  const cloudProviders = GetCloudServiceProviders()
  return (
    <div className="App">
      <div className="App-header">
        aiven Cloud Selection Panel
      </div>
      <div className="App-body">
        <CloudSelectionPanel />
        <p>
          {geoLocation.isGeoLocationDataSet
            ? JSON.stringify(geoLocation)
            : "Location data not available yet."}
        </p>
        <div>
          {
            cloudProviders.clouds.map((provider: any) => (
              <p id={provider.id}>{provider.id}:{provider.cloud_name}:{provider.cloud_distance}</p>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
