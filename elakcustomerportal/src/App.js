import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="max-w-lg bg-slate-500 p-20 mx-auto my-10 rounded-lg">
        <p className="text-white font-bold">Tailwind CSS is working!</p>
      </div>
    </div>
  );
}

export default App;
