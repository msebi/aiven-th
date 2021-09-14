import './App.css';
import { CloudSelectionPanel } from './components/cloudselectionpanel/CloudSelectionPanel'

function App() {

  return (
    <div className="App">
      <div className="App-header">
        aiven Cloud Selection Panel
      </div>
      <div className="App-body">
        <CloudSelectionPanel />
      </div>
    </div>
  );
}

export default App;
