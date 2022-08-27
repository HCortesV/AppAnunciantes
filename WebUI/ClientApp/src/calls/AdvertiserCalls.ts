import { SubmissionError } from "redux-form";
import { AdvertiserErrorModel, AdvertiserErrorResponse } from "../models/AdvertiserErrorModel";
import { Advertiser } from "../models/AdvertiserModels";
import { actionCreators } from "../store/Advertisers";

const BADREQUEST: number = 400;

export async function processAdvertiser(values: Advertiser, dispatch) {
    if (values.id > 0)
        await editAdvertiser(values, dispatch);
    else
        await addAdvertiser(values, dispatch);
}

export async function addAdvertiser(values: Advertiser, dispatch) {
    dispatch(actionCreators.saveAdvertiser());
    let apiresponse = await fetch('api/advertiser', { method: "POST", body: JSON.stringify(values), headers: { 'Content-type': 'application/json' } })
        .then(response => {
            if (!response.ok && response.status == BADREQUEST)
                return Promise.reject(response.json());
            else
                return response.json() as Promise<number>;
        })
        .catch(response => response as Promise<AdvertiserErrorModel>)
        .then(errorResp => { return errorResp; });

    if (isNumber(apiresponse)) {
        dispatch(actionCreators.saveDoneAdvertiser());
        return;
    }

    if (isAdvertiserErrorModel(apiresponse)) {
        dispatch(actionCreators.errorSaveAdvertiser());
        submitError(apiresponse);
    }
}

export async function editAdvertiser(values: Advertiser, dispatch) {
    dispatch(actionCreators.saveAdvertiser());
    let apiresponse = await fetch(`api/advertiser/${values.id}`, { method: "PUT", body: JSON.stringify(values), headers: { 'Content-type': 'application/json' } })
        .then(response => {
            if (!response.ok && response.status == BADREQUEST)
                return Promise.reject(response.json());
            else
                return response.json() as Promise<number>;
        })
        .catch(response => response as Promise<AdvertiserErrorModel>)
        .then(errorResp => { return errorResp; })

    if (isNumber(apiresponse)) {
        dispatch(actionCreators.saveDoneAdvertiser());
        return;
    }

    if (isAdvertiserErrorModel(apiresponse)) {
        dispatch(actionCreators.errorSaveAdvertiser());
        submitError(apiresponse);
    }
}

function submitError(response: AdvertiserErrorModel) {
    let errorResponse: AdvertiserErrorResponse = {
        _error: 'validation errors'
    };
    console.log(response);
    if (response.errors.Rut)
        errorResponse.rut = response.errors.Rut[0];
    if (response.errors.Name)
        errorResponse.name = response.errors.Name[0];
    if (response.errors.Phone)
        errorResponse.phone = response.errors.Phone[0];
    throw new SubmissionError(errorResponse);
}

function isNumber(value: any | number): boolean {
    return ((value != null) &&
        (value !== '') &&
        !isNaN(Number(value.toString())));
}

function isAdvertiserErrorModel(object: any): object is AdvertiserErrorModel {
    return 'errors' in object;
}