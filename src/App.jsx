import React from 'react';
import Home from './templates/Home/Home';
import PrivacyProtocol from './components/common/PrivacyProtocol';

export default function App() {
  return (
    <div className="relative min-h-screen notranslate" translate="no">
      {/* Sovereign Home Site */}
      <Home />

      {/* Global Privacy & Security Protocol Modal (accessible on-demand via footer) */}
      <PrivacyProtocol />
    </div>
  );
}
