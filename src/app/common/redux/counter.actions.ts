import { createAction, props } from '@ngrx/store';

export const changeProvider = createAction('changeProvider', props<{provider: string}>());
