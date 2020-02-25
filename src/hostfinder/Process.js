import React from 'react';

export function Process({ processName, children }) {
  return (
    <>
      <h4>{processName}</h4>
      {children}
    </>
  );
}
