import React from 'react';
import Linkbox from './Linkbox';

function Quicklinks({ onQuicklinkClick }) {
  return (
    <div className='container d-flex gap-2 text-dark justify-content-center'>
      <Linkbox LinkName="Apply" />
      <Linkbox LinkName="Admit Card" />
      <Linkbox LinkName="Answer Key" />
      <Linkbox LinkName="Result"  />
    </div>
  );
}

export default Quicklinks;
