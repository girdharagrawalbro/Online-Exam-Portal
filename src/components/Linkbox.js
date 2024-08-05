import React from 'react';

function Linkbox({ LinkName, onClick }) {
  return (
    <button onClick={onClick} className='btn linkbox rounded-pill btn-light bt'>
      {LinkName}
    </button>
  );
}

export default Linkbox;
