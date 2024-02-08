import { RouterProvider } from "react-router-dom";
import BrandingProvider from "./branding/provider/BrandingProvider";
import { Provider } from "react-redux";
import { persistor, store } from "./reduxStore";
import { PersistGate } from "redux-persist/integration/react";
import { router } from "./routes/router";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrandingProvider>
          <RouterProvider router={router} />
        </BrandingProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
