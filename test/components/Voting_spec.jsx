import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate
} from 'react-addons-test-utils';
import {Voting} from '../../src/components/Voting';
import { expect } from 'chai';
import { List } from 'immutable';

describe('Voting', () => {

  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={['Ten', 'Vs.']} />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Ten');
    expect(buttons[1].textContent).to.equal('Vs.');
  });

  it('invokes callback when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry

    const component = renderIntoDocument(
      <Voting pair={['Ten', 'Vs.']} vote={vote} />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).to.equal('Ten');
  });

  it('disables buttons when a user has voted', () => {
    const component = renderIntoDocument(
      <Voting pair={['Ten', 'Vs.']} hasVoted='Ten' />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('adds a label to the voted entry', () => {
    const component = renderIntoDocument(
      <Voting pair={['Ten', 'Vs.']} hasVoted='Ten' />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].textContent).to.contain('Voted');
  });

  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Voting winner="Ten" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(0);

    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Ten');
  });

  it('renders as a pure component', () => {
    const pair = List.of('Ten', 'Vs.');
    const container = document.createElement('div');
    let component = ReactDOM.render(
        <Voting pair={pair} />, container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Ten');

    pair[0] = 'Vitalogy';
    component = ReactDOM.render(
        <Voting pair={pair} />, container
    );

    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Ten');
  });
});
