import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CodeChillRouter from "./components/CodeChillRouter";
import "semantic-ui-css/semantic.min.css";
import "xterm/lib/xterm.css";
import "./App.css";

ReactDOM.render(
    // <iframe src="http://localhost:8080" width="1700" height="700"/>,
    <BrowserRouter>
        <CodeChillRouter />
    </BrowserRouter>,
    document.getElementById("root") as HTMLElement,
);
