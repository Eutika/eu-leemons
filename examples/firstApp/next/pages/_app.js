import '../styles/globals.css';
import PropTypes from 'prop-types';
import hooks from "leemons-hooks";
import {useEffect} from "react";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import {plugins, frontPlugins} from "@plugins";

const theme = createMuiTheme({});
function MyApp({ Component, pageProps }) {

  // Only add it once
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    window.addEventListener('error', (e) => {
      e.preventDefault();
      console.error(e.error);
    });
  }, []);

  // Only add it once (when leemons is not setted)
  if (!global.leemons) {
    // Define logger to console (temporal)
    global.leemons = {log: console};

    console.log('Frontend plugins:', frontPlugins.map(plugin => plugin.name));
    console.log('All the installed plugins:', plugins)
    frontPlugins.forEach(plugin => {
      plugin.load();
    });
    hooks.addFilter('user-admin::welcome_visited', ({args: [msg = [], ...args]}) => {
      console.log("Filter receives:", msg);
      return [[...msg, "Hello World"], ...args]
    });
  }
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
