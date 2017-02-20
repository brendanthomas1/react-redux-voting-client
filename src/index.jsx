import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['Ten', 'Vs.'];

ReactDOM.render(
  <Voting pair={pair} winner="Ten" />,
  document.getElementById('app')
);
