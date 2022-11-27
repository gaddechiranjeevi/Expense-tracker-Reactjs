import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Store/CentralStore";
import"./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./Context/ContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <ContextProvider>
  <BrowserRouter>
     <App />
  </BrowserRouter>
  </ContextProvider>
  </Provider>
);