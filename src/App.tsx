import './App.css';
import { CloudSelectionPanel } from './components/cloudselectionpanel/CloudSelectionPanel'
import { GetCloudServiceProviders } from './hooks/GetCloudServiceProviders';

function App() {
  const cloudProviders = GetCloudServiceProviders()

  return (
    <div className="App">
      <div className="App-header">
        aiven Cloud Selection Panel
      </div>
      <div className="App-body">
        <CloudSelectionPanel {...cloudProviders}/>
      </div>
    </div>
  );
}

export default App;
