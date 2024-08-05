import React from 'react';
import { ThemeProvider } from 'styled-components';
import * as theme from './configs/theme';
import Dashboard from './component/Dashboard';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
