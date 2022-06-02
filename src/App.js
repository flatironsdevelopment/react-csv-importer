import logo from "./logo.svg";
import "./App.css";
import ImporterButtonComponent from "./ImporterButtonComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ImporterButtonComponent />
      </header>
    </div>
  );
}

export default App;
