import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import {Results} from '../../src/components/Results';
import {expect} from 'chai';

describe('Results', () => {

  it('renders entries with vote counts or zero', () => {
    const pair = List.of('Ten', 'Vs.');
    const tally = Map({'Ten': 4});
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [ten, vs] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(ten).to.contain('Ten');
    expect(ten).to.contain('4');
    expect(vs).to.contain('Vs.');
    expect(vs).to.contain('0');
  });

  it('invokes the next callback when next is pressed', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;
    
    const pair = List.of('Ten', 'Vs.');
    const component = renderIntoDocument(
      <Results pair={pair} tally={Map()} next={next} />
    );

    Simulate.click(ReactDOM.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Results winner='Vs.'
               pair={['Ten', 'Vs.']}
               tally={Map()} />
    );
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Vs.');
  });
});
