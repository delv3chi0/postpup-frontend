import React from 'react';
import ReactDOM from 'react-dom/client';

console.log("✅ Attempting simple render");

const root = document.getElementById('root');
if (root) {
  root.innerHTML = "<h1 style='color:green;text-align:center;'>Static Render Success</h1>";
} else {
  console.error("❌ No #root found in index.html");
}
