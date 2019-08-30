import { createReducer, on } from '@ngrx/store';
import { changeProvider} from './counter.actions';

export const initialState = {
  provider: 'ethereum'
};

const _counterReducer = createReducer(initialState,
  on(changeProvider, (state, { provider }) => ({ provider: provider }))
);

function counterReducer(state, action) {
  return _counterReducer(state, action);
}

export {counterReducer};
