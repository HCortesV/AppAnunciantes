"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editAdvertiser = exports.addAdvertiser = exports.processAdvertiser = void 0;
var redux_form_1 = require("redux-form");
var Advertisers_1 = require("../store/Advertisers");
var BADREQUEST = 400;
function processAdvertiser(values, dispatch) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(values.id > 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, editAdvertiser(values, dispatch)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, addAdvertiser(values, dispatch)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.processAdvertiser = processAdvertiser;
function addAdvertiser(values, dispatch) {
    return __awaiter(this, void 0, void 0, function () {
        var apiresponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch(Advertisers_1.actionCreators.saveAdvertiser());
                    return [4 /*yield*/, fetch('api/advertiser', { method: "POST", body: JSON.stringify(values), headers: { 'Content-type': 'application/json' } })
                            .then(function (response) {
                            if (!response.ok && response.status == BADREQUEST)
                                return Promise.reject(response.json());
                            else
                                return response.json();
                        })
                            .catch(function (response) { return response; })
                            .then(function (errorResp) { return errorResp; })];
                case 1:
                    apiresponse = _a.sent();
                    if (isNumber(apiresponse)) {
                        dispatch(Advertisers_1.actionCreators.saveDoneAdvertiser());
                        return [2 /*return*/];
                    }
                    if (isAdvertiserErrorModel(apiresponse)) {
                        dispatch(Advertisers_1.actionCreators.errorSaveAdvertiser());
                        submitError(apiresponse);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.addAdvertiser = addAdvertiser;
function editAdvertiser(values, dispatch) {
    return __awaiter(this, void 0, void 0, function () {
        var apiresponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch(Advertisers_1.actionCreators.saveAdvertiser());
                    return [4 /*yield*/, fetch("api/advertiser/".concat(values.id), { method: "PUT", body: JSON.stringify(values), headers: { 'Content-type': 'application/json' } })
                            .then(function (response) {
                            if (!response.ok && response.status == BADREQUEST)
                                return Promise.reject(response.json());
                            else
                                return response.json();
                        })
                            .catch(function (response) { return response; })
                            .then(function (errorResp) { return errorResp; })];
                case 1:
                    apiresponse = _a.sent();
                    if (isNumber(apiresponse)) {
                        dispatch(Advertisers_1.actionCreators.saveDoneAdvertiser());
                        return [2 /*return*/];
                    }
                    if (isAdvertiserErrorModel(apiresponse)) {
                        dispatch(Advertisers_1.actionCreators.errorSaveAdvertiser());
                        submitError(apiresponse);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.editAdvertiser = editAdvertiser;
function submitError(response) {
    var errorResponse = {
        _error: 'validation errors'
    };
    console.log(response);
    if (response.errors.Rut)
        errorResponse.rut = response.errors.Rut[0];
    if (response.errors.Name)
        errorResponse.name = response.errors.Name[0];
    if (response.errors.Phone)
        errorResponse.phone = response.errors.Phone[0];
    throw new redux_form_1.SubmissionError(errorResponse);
}
function isNumber(value) {
    return ((value != null) &&
        (value !== '') &&
        !isNaN(Number(value.toString())));
}
function isAdvertiserErrorModel(object) {
    return 'errors' in object;
}
//# sourceMappingURL=AdvertiserCalls.js.map