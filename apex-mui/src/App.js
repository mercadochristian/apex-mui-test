import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import AppHeader from './components/app-header/AppHeader';
import ApexChart from './components/apex-chart/ApexChart';

function App() {
  return (
    <div>
      <AppHeader/>
      <ApexChart/>
    </div>
  );
}

export default App;
