import logo from "./logo.svg";
import "./styles/App.css";
import { io } from "socket.io-client";
import { WEBSOCKET_URL } from "./components/Utils";

function App() {
  const socket = io(WEBSOCKET_URL);

  const testSocket = () => {
    socket.emit("ws-test");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Atomos - React Frontend</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br />
        <button onClick={testSocket}>Test websockets</button>
      </header>
    </div>
  );
}

export default App;
