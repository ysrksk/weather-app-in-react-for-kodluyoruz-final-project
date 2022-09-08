import React, { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner'

const withLoading = WrappedComponent => {
  return props => {
    const style = {textAlign: 'center'};
    const [loading, setLoading] = useState(true);
    
    return (
      <div style={style}>
        {loading && (
         <RotatingLines
         strokeColor="rgb(18, 30, 53)"
         strokeWidth="5"
         animationDuration="0.75"
         width="156"
         visible={true}
       />
        )}
        <WrappedComponent
          setLoading={setLoading}
          {...props}
        />
      </div>
    );
  };
};
export default withLoading;