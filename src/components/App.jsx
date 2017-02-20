import React from 'react';
import {List} from 'immutable';

const pair = List.of('Ten', 'Vs.');
const tally = Map({'Ten': 5, 'Vs.': 4});

export default React.createClass({
  render: function() {
    return React.cloneElement(this.props.children, {
      pair: pair,
      tally: tally
    });
  }
});
