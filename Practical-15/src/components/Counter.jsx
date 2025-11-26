import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-box" style={{ border: '1px solid #ccc', padding: '20px', margin: '20px' }}>
      <h2>Counter App</h2>
      <h3 style={{ fontSize: '24px' }}>{count}</h3>
      <button onClick={() => setCount(count + 1)} style={{ marginRight: '10px' }}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default Counter;