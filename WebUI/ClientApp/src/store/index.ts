import * as Advertisers from './Advertisers';
import { ApplicationState } from '../models/ApplicationModels';


export const reducers = {
    advertisers: Advertisers.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
