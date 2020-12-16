import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div className="navigation">
      <h1>LOGO</h1>
      <Link>Signup</Link>
      <Link>Login</Link>
    </div>
  );
}

export default Navigation;
