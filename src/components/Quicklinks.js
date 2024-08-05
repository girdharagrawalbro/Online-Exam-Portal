import React from 'react';
import Linkbox from './Linkbox';

function Quicklinks({ onQuicklinkClick }) {
  return (
    <div className='container d-flex gap-2 text-dark justify-content-center'>
      <Linkbox LinkName="Apply" onClick={() => onQuicklinkClick('Apply')} />
      <Linkbox LinkName="Admit Card" onClick={() => onQuicklinkClick('Admit Card')} />
      <Linkbox LinkName="Answer Key" onClick={() => onQuicklinkClick('Answer Key')} />
      <Linkbox LinkName="Result" onClick={() => onQuicklinkClick('Result')} />
    </div>
  );
}

export default Quicklinks;
