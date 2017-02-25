import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote:Map({
          pair: List.of('Ten', 'Vs.'),
          tally: Map({Ten: 1})
        })
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Ten', 'Vs.'],
        tally: {Ten: 1}
      }
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Ten', 'Vs.'],
          tally: { Ten: 1 }
        }
      }
    }
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Ten', 'Vs.'],
        tally: {Ten: 1}
      }
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Ten', 'Vs.'],
          tally: { Ten: 1 }
        }
      }
    }
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Ten', 'Vs.'],
        tally: {Ten: 1}
      }
    }));
  });

  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Ten', 'Vs.'],
        tally: {Ten: 1}
      }
    });
    const action = {type: 'VOTE', entry: 'Ten'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Ten', 'Vs.'],
        tally: {Ten: 1}
      },
      hasVoted: 'Ten'
    }));
  });

  it('does not set hasVoted on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['Ten', 'Vs.'],
        tally: {Ten: 1}
      }
    });
    const action = {type: 'VOTE', entry: 'No Code'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Ten', 'Vs.'],
        tally: {Ten: 1}
      }
    }));
  });

  it('should remove hasVoted on SET_STATE if pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Ten', 'Vs.'],
        tally: {Ten: 1}
      },
      hasVoted: 'Ten'
    });
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Vitalogy', 'No Code']
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Vitalogy', 'No Code']
        }
    }));
  });
});
