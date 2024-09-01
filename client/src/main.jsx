import { createRoot } from "react-dom/client";
import App from "./App.jsx"; // Ensure this path is correct
import "./index.css"; // Ensure this path is correct
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js"; // Ensure this path is correct
import { Toaster } from "./components/ui/toaster.jsx";
// Ensure this path is correct

// Create the root element
const root = createRoot(document.getElementById("root"));

// Render the application
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster></Toaster>
    </Provider>
  </BrowserRouter>
);

/*
Summary:
Routing: The BrowserRouter component enables the use of 
routes in your app, allowing you to navigate between 
different pages without refreshing the browser.

State Management: The Provider component connects 
your app to the Redux store, making the global state 
accessible to all components.

App Rendering: Finally, the App component is 
rendered as the root of your application, containing 
all the logic, components, and routes of your project.
*/
