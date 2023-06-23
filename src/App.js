import ErrorBoundary from './utils/ErrorBoundary';
import { ThemeProvider } from "styled-components";
import Router from './routes';

import { Provider } from 'react-redux';
import store from "./store/store";

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ThemeProvider theme={{ color: 'red', backgroundColor: 'blue' }}>
          <Router />
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
