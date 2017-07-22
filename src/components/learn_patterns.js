import React from 'react';
import Header from './header';

const LearnPatterns = () => {
  console.log("in learn patterns");
  // console.log("in render of video component");
  return (

    <div className="instruction-info-patterns">
      <h2></h2>
        <p>Polynomial factoring is a critical skill of algebra. This app will
        teach you how to factor quadratics/trinomials by identifiying the pattern
        first.
        </p>
        <p>The patterns are based off of the signs and coefficients of the quadratic expression
        in general form (ax<sup>2</sup> + bx + c)
        </p>
        <ul>
          <li>Step 1: Look for a GCF</li>
          <li>Step 2: Identifiy the Pattern</li>
          <li>Step 3: Idenitfy the coefficients a, b, and c </li>
          <li>Step 4: is a = 1 or a > 1?</li>
          <li>Step 5: If a = 1, look for factors of c that add up to b and
          dont forget the pattern - the signs of the factors must coresspond with the pattern</li>
        </ul>
    </div>

  );
}

export default LearnPatterns;

// could import a picture of factoring process ...
// could have your flow chart and example
// and box