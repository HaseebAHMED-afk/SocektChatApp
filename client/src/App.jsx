import React from "react";
import ReactDOM from "react-dom";
import Chat from "./Chat";

import "./index.css";


const App = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("app"));
