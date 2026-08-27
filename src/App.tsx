import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { PlannerProvider } from './context/PlannerContext';
import { AppShell } from './components/layout/AppShell';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PlannerProvider>
        <AppShell />
      </PlannerProvider>
    </ThemeProvider>
  );
};

export default App;
