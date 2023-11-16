import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./global.css";

// my awesome transcript code from: https://stackoverflow.com/questions/13121948/dynamically-add-script-tag-with-src-that-may-include-document-write
const container = document.getElementById("root");
var my_awesome_script = document.createElement('script');
var my_awesome_script2 = document.createElement('script');

my_awesome_script.setAttribute('src','https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js');
my_awesome_script2.setAttribute('src', 'https://rawgit.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js');

document.head.appendChild(my_awesome_script);
document.head.appendChild(my_awesome_script2)
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
