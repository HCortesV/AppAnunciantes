import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { Advertiser, AdvertiserState, AdvertiserVm } from '../models/AdvertiserModels';


interface RequestAdvertisersAction {
    type: 'REQUEST_ADVERTISERS';
    startDateIndex: number;
}

interface ReceiveAdvertisersAction {
    type: 'RECEIVE_ADVERTISERS';
    startDateIndex: number;
    advertiservm: AdvertiserVm;
}

interface RequestAnAdvertiserAction {
    type: 'REQUEST_AN_ADVERTISER';
    id: number;
}

interface ReceiveAnAdvertiserAction {
    type: 'RECEIVE_AN_ADVERTISER';
    advertiser: Advertiser;
}
interface SaveAdvertiserAction {
    type: 'SAVE_ADVERTISER';
}

interface DoneSaveAdvertiserAction {
    type: 'DONE_SAVE_ADVERTISER';
}
interface ErrorSaveAdvertiserAction {
    type: 'ERROR_SAVE_ADVERTISER';
}
interface CancelSaveAdvertiserAction {
    type: 'CANCEL_SAVE_ADVERTISER';
}
interface RequestDeleteAdvertiserAction {
    type: 'REQUEST_DELETE_ADVERTISER';
    id: number;
}
interface DoneDeleteAdvertiserAction {
    type: 'DONE_DELETE_ADVERTISER';
}
type KnownAction = RequestAdvertisersAction | ReceiveAdvertisersAction | RequestAnAdvertiserAction |
    ReceiveAnAdvertiserAction | SaveAdvertiserAction | DoneSaveAdvertiserAction | ErrorSaveAdvertiserAction |
    CancelSaveAdvertiserAction | RequestDeleteAdvertiserAction | DoneDeleteAdvertiserAction;


export const actionCreators = {
    requestAdvertisers: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        fetch(`api/advertiser`)
            .then(response => response.json() as Promise<AdvertiserVm>)
            .then(data => {
                dispatch({ type: 'RECEIVE_ADVERTISERS', startDateIndex: startDateIndex, advertiservm: data });
            });

        dispatch({ type: 'REQUEST_ADVERTISERS', startDateIndex: startDateIndex });

    },
    requestAnAdvertiser: (id: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        fetch(`api/advertiser/${id}`)
            .then(response => response.json() as Promise<Advertiser>)
            .then(data => {
                dispatch({ type: 'RECEIVE_AN_ADVERTISER', advertiser: data });
            });
        dispatch({ type: 'REQUEST_AN_ADVERTISER', id: id });
    },
    saveAdvertiser: (): AppThunkAction<KnownAction> => (dispatch, getState) => {

        dispatch({ type: 'SAVE_ADVERTISER'});
    },
    saveDoneAdvertiser: (): AppThunkAction<KnownAction> => (dispatch, getState) => {

        dispatch({ type: 'DONE_SAVE_ADVERTISER'});
    },
    errorSaveAdvertiser: (): AppThunkAction<KnownAction> => (dispatch, getState) => {

        dispatch({ type: 'ERROR_SAVE_ADVERTISER' });
    },
    cancelSaveAdvertiser: (): AppThunkAction<KnownAction> => (dispatch, getState) => {

        dispatch({ type: 'CANCEL_SAVE_ADVERTISER' });
    },
    deleteAdvertiser: (idAdvertiser: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        fetch(`api/advertiser/${idAdvertiser}`, { method: "DELETE" })
            .then(response => response.json() as Promise<boolean>)
            .then(data => {
                dispatch({ type: 'DONE_DELETE_ADVERTISER' });
            });
        dispatch({ type: 'REQUEST_DELETE_ADVERTISER', id: idAdvertiser });
    },
};

const unloadedState: AdvertiserState = { advertiservm: undefined, isLoading: false, redirect: false, deleted:false };

export const reducer: Reducer<AdvertiserState> = (state: AdvertiserState | undefined, incomingAction: Action): AdvertiserState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_ADVERTISERS':
            return {
                ...state,
                isLoading: true,
                redirect: false,
                deleted:false,
                startDateIndex: action.startDateIndex
            };
        case 'RECEIVE_ADVERTISERS':
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    ...state,
                    startDateIndex: action.startDateIndex,
                    advertiservm: action.advertiservm,
                    isLoading: false
                };
            }
            break;
        case 'REQUEST_AN_ADVERTISER':
            return {
                ...state,
                advertiser: undefined,
                isLoading: true
            };
        case 'RECEIVE_AN_ADVERTISER':
            return {
                ...state,
                advertiser: action.advertiser,
                isLoading: false
            };
        case 'SAVE_ADVERTISER':
            return {
                ...state,
                isLoading:true
            };
        case 'DONE_SAVE_ADVERTISER':
            return {
                ...state,
                isLoading: false,
                redirect:true
            };
        case 'ERROR_SAVE_ADVERTISER':
            return {
                ...state,
                isLoading:false
            }
        case 'CANCEL_SAVE_ADVERTISER':
            return {
                ...state,
                redirect: true,
                advertiser:undefined
            };

        case 'REQUEST_DELETE_ADVERTISER':
            return {
                ...state,
                isLoading: true,
                deleted:false
            };
        case 'DONE_DELETE_ADVERTISER':
            return {
                ...state,
                isLoading: false,
                deleted:true
            };
    }


    return state;
};
