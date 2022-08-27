"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
exports.actionCreators = {
    requestAdvertisers: function (startDateIndex) { return function (dispatch, getState) {
        fetch("api/advertiser")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            dispatch({ type: 'RECEIVE_ADVERTISERS', startDateIndex: startDateIndex, advertiservm: data });
        });
        dispatch({ type: 'REQUEST_ADVERTISERS', startDateIndex: startDateIndex });
    }; },
    requestAnAdvertiser: function (id) { return function (dispatch, getState) {
        fetch("api/advertiser/".concat(id))
            .then(function (response) { return response.json(); })
            .then(function (data) {
            dispatch({ type: 'RECEIVE_AN_ADVERTISER', advertiser: data });
        });
        dispatch({ type: 'REQUEST_AN_ADVERTISER', id: id });
    }; },
    saveAdvertiser: function () { return function (dispatch, getState) {
        dispatch({ type: 'SAVE_ADVERTISER' });
    }; },
    saveDoneAdvertiser: function () { return function (dispatch, getState) {
        dispatch({ type: 'DONE_SAVE_ADVERTISER' });
    }; },
    errorSaveAdvertiser: function () { return function (dispatch, getState) {
        dispatch({ type: 'ERROR_SAVE_ADVERTISER' });
    }; },
    cancelSaveAdvertiser: function () { return function (dispatch, getState) {
        dispatch({ type: 'CANCEL_SAVE_ADVERTISER' });
    }; },
    deleteAdvertiser: function (idAdvertiser) { return function (dispatch, getState) {
        fetch("api/advertiser/".concat(idAdvertiser), { method: "DELETE" })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            dispatch({ type: 'DONE_DELETE_ADVERTISER' });
        });
        dispatch({ type: 'REQUEST_DELETE_ADVERTISER', id: idAdvertiser });
    }; },
};
var unloadedState = { advertiservm: undefined, isLoading: false, redirect: false, deleted: false };
var reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_ADVERTISERS':
            return __assign(__assign({}, state), { isLoading: true, redirect: false, deleted: false, startDateIndex: action.startDateIndex });
        case 'RECEIVE_ADVERTISERS':
            if (action.startDateIndex === state.startDateIndex) {
                return __assign(__assign({}, state), { startDateIndex: action.startDateIndex, advertiservm: action.advertiservm, isLoading: false });
            }
            break;
        case 'REQUEST_AN_ADVERTISER':
            return __assign(__assign({}, state), { advertiser: undefined, isLoading: true });
        case 'RECEIVE_AN_ADVERTISER':
            return __assign(__assign({}, state), { advertiser: action.advertiser, isLoading: false });
        case 'SAVE_ADVERTISER':
            return __assign(__assign({}, state), { isLoading: true });
        case 'DONE_SAVE_ADVERTISER':
            return __assign(__assign({}, state), { isLoading: false, redirect: true });
        case 'ERROR_SAVE_ADVERTISER':
            return __assign(__assign({}, state), { isLoading: false });
        case 'CANCEL_SAVE_ADVERTISER':
            return __assign(__assign({}, state), { redirect: true, advertiser: undefined });
        case 'REQUEST_DELETE_ADVERTISER':
            return __assign(__assign({}, state), { isLoading: true, deleted: false });
        case 'DONE_DELETE_ADVERTISER':
            return __assign(__assign({}, state), { isLoading: false, deleted: true });
    }
    return state;
};
exports.reducer = reducer;
//# sourceMappingURL=Advertisers.js.map