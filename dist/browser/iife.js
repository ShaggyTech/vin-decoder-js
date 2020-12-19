var NHTSA=function(e,r){"use strict";function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o=t(r),n=Object.freeze({__proto__:null});
/*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
function s(e,r,t,o){return new(t||(t=Promise))((function(n,s){function i(e){try{c(o.next(e))}catch(e){s(e)}}function a(e){try{c(o.throw(e))}catch(e){s(e)}}function c(e){e.done?n(e.value):new t((function(r){r(e.value)})).then(i,a)}c((o=o.apply(e,r||[])).next())}))}
/**
   * @module utils/getTypeof
   * @category Utils
   */
/**
   * Gets type of `value` using `Object.prototype.toString.call(value)`.
   *
   * @param {any} value - Any kind of value (string, object, array, function, etc).
   *
   * @returns {string} - Type of value, normalized to a lowercase string.
   */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function i(e){const r=Object.prototype.toString.call(e).toLowerCase();/* ex: => '[object string]' or '[object array], etc. */return r.slice(8,r.length-1)}
/**
   * @module utils/isValidVin
   * @category Utils
   */
/*
   * There will need to be some way to translate vin digits that are alphabetic
   * into their number value in the VIN algorithm transliteration table.
   * Later, during the creation of the checksum variable, those digits will be
   * multiplied against their corresponding weight (by index) in the WEIGHTS_ARRAY.
   * This transliteration table is a key part of the VIN validation algorithm.
   */const a={A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,J:1,K:2,L:3,M:4,N:5,P:7,R:9,S:2,T:3,U:4,V:5,W:6,X:7,Y:8,Z:9},c=[8,7,6,5,4,3,2,10,0,9,8,7,6,5,4,3,2];
/*
   * Later, during the creation of the 'checksum' variable, these weights will be
   * multiplied by the value of their mirrored index vin digits.
   * The array index of each weight corresponds to the same index of each
   * digit in the 'vin'.
   */
/**
   * @module api/Fetch
   * @category API
   * @description API Fetch Logic.
   *
   * > **Module Exports**:
   * > - Class: [Fetch](module-api_Fetch.Fetch.html)
   * > - Constant: [BASE_URL](#~BASE_URL)
   * > - Constant: [DEFAULT_CONFIG](#~DEFAULT_CONFIG)
   * >
   * > **Types**
   * > - Type: [ApiResponse](#ApiResponse)
   * > - Type: [FetchConfig](#FetchConfig)
   * > - Type: [FetchRequestOptions](#FetchRequestOptions)
   * > - Type: [FetchRequestBodyTypes](https://github.github.io/fetch/#request-body)
   * > - Type: [FetchResponse](#FetchResponse)
   * > - Type: [NhtsaResponse](#NhtsaResponse)
   */
/*****************
   * CONSTANTS
   ****************/
/**
   * @constant {string} BASE_URL Default Fetch base URL string
   * @default 'https://vpic.nhtsa.dot.gov/api/vehicles'
   */
const u={apiResponseFormat:"json",baseUrl:"https://vpic.nhtsa.dot.gov/api/vehicles",options:{}};
/**
   * @constant {module:api/Fetch.FetchConfig} DEFAULT_CONFIG Default Fetch configuration options
   * @property {string} apiResponseFormat=json
   * @property {string} baseUrl=BASE_URL Default: [BASE_URL](module-api_Fetch.html#~BASE_URL)
   * @property {FetchRequestOptions} options={method:"GET"}
   */
/*****************
   * Fetch Class
   ****************/
/**
   * Class wrapper containing API wrapper HTTP Fetch logic.
   *
   * > **Static Methods**:
   * > - [buildQueryString](#buildQueryString)
   * > - [get](#get)
   *
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   * @category API
   */
class d{constructor(e){let r;
/* userConfig takes precedence over DEFAULT_CONFIG */r=e&&"object"===i(e)?Object.assign(Object.assign(Object.assign({},u),e),{options:Object.assign(Object.assign({},u.options),e.options)}):Object.assign({},u)
/** @private */,this.apiResponseFormat="json",
/** @private */
this.baseUrl=r.baseUrl,
/** @private */
this.options=r.options}
/**
       * Builds a query string from QueryStringParameters.
       *
       * @param {QueryStringParameters} params - Object containing Key:Value pairs to build the URL query string with.
       * @param {boolean} [allowEmptyStringValues=false] - Set to `true` to add empty parameter values to the returned query string.
       * - Given params of `{paramName: ""}` , setting this to true will use 'paramName=' in the final query string.
       * - GetCanadianVehicleSpecifications is the only API Action that requires this functionality.
       * @returns {(Promise<string>)} A formatted NHSTA.dot.gov Vehicles API query string.
       */buildQueryString(e,r=!1){return s(this,void 0,void 0,(function*(){
/* Return the completed query string */
/*
               * Make sure we're always using 'format=json' in the url Query parameters
               * If the user provides a 'format' key in the params, during class instantiation we want to override it to 'json'
               * This package may provide support for the other formats (CSV and XML) if requested.
               */
return e=e&&"object"===i(e)?Object.assign(Object.assign({},e),{format:this.apiResponseFormat}):{format:this.apiResponseFormat},yield
/**
   * @module utils/makeQueryString
   * @category Utils
   */
/**
   * Utility method to generate a query string compatible with the NHSTA API, for use in an API URL string.
   *
   * @async
   *
   * @param {object} params - Object of Type [QueryStringParameters](module-utils_makeQueryString.html#.QueryStringParameters).
   * @param {boolean} [allowEmptyStringValues=false] - Set to `true` to add empty parameter values to the returned query string.
   * - Given params of `{ paramName: "" }` , setting this to true will use 'paramName=' in the final query string.
   * - GetCanadianVehicleSpecifications is the only API Action that requires this functionality.
   *
   * @returns {Promise<string>} A query string of search parameters for use in a final Fetch.get URL.
   *
   * @example <caption>When loaded from the browser via html script tags</caption>
   * // <script type="text/javascript" src="https://www.npmjs.com/package/@shaggytools/nhtsa-api-wrapper"><\/script>
   * const qs = await NHTSA.makeQueryString({ modelYear: 2010 }).catch(error => error)
   * console.log(qs) // "?modelYear=2010"
   *
   * @example <caption>When loaded as a module</caption>
   * import { makeQueryString } from '@shaggytools/nhtsa-api-wrapper'
   * const qs = await makeQueryString({ modelYear: 2010 }).catch(error => error)
   * console.log(qs) // "?modelYear=2010"
   *
   * @example <caption>Single Param:</caption>
   * const qs = await makeQueryString({
   *   modelYear: 2019
   * }).catch(error => error)
   * console.log(qs) // "?modelYear=2019"
   *
   * @example <caption>Multiple Params:</caption>
   * const qs = await makeQueryString({
   *   whatever: 'some value',
   *   modelYear: 2006,
   *   page: "2"
   * }).catch(error => error)
   *
   * console.log(qs) // "?whatever=some%20value&modelYear=2006&page=2"
   *
   * @example <caption>Empty Params Object:</caption>
   * const qs = await makeQueryString({}).catch(error => error)
   *
   * console.log(qs) // ""
   *
   * @example <caption>Using allowEmptyStringValues option:</caption>
   * const qs = await makeQueryString({
   *   year: 2016,
   *   vehicleType: '',
   *   make: 'Audi'
   * }, true).catch(error => error)
   *
   * console.log(qs) // "?year=2016&vehicleType=&make=Audi"
   *
   */
function(e={},r=!1){
/* Runtime type guard params argument, must be of type object */
if("object"!==i(e))return Promise.reject(new Error("queryString(params) - expected params in the form of an object, got: "+e));
/* Setup QueryString for Array mapping */const t=Object.entries(e),o=t.length;
/* Return an empty string if params are an empty object */
if(o<1)return Promise.resolve("");
/* Used to check if we've already prepended a valid query param */let n=!1;
/* Map [key]:value entries to "key=value" strings in an array */const s=t.map(([e,t],s)=>{let a="",c="";const u=i(t);
/* Convert any number values to a string */
/* Skip any invalid values, only string and number value types are valid */
if(t&&"number"===u&&(t=t.toString()),(t||r)&&("string"===u||"number"===u))
/* Add the completed partial query string to queryStringArray */
/* if this is the first param we need to prepend the '?' char */
return n||(a="?",n=!0)
/* if there is another param coming after this one we need to append the '&' char */,s<o-1&&(c="&"),`${a}${e}=${t}${c}`});
/* Join and return the completed query string after URI encoding */return Promise.resolve(encodeURI(s.join("")))}(e,r)}))}
/**
       * Uses the `cross-fetch` npm package to send HTTP requests and retrieve data from an API.
       * - In browser environments, [whatwg-fetch](https://github.com/github/fetch/) window.fetch is used.
       * - In node environments, [node-fetch](https://github.com/bitinn/node-fetch/) NPM package is used.
       *
       * @param {string} url - URL to fetch data from.
       * @param {FetchRequestOptions} [options] - [Fetch options](https://github.github.io/fetch/#options).
       * @returns {(Promise<module:api/Fetch.ApiResponse>)} Response from the API.
       */get(e,r={}){return s(this,void 0,void 0,(function*(){
/* Runtime typechecking */
const t=i(e);if("string"!==t)return Promise.reject(new Error("Fetch.get(url) - url argument must be of type string, got: "+t));const n=i(r);if("object"!==n)return Promise.reject(new Error("Fetch.get(url, options) - options argument must be of type object, got: "+n));
/* Combine user provided 'options' and class property 'this.options', user options overwrite class options */const s=Object.assign(Object.assign({},this.options),r),a=yield o.default(e,s).then(e=>{if(!(null==e?void 0:e.status)||e.status>=400)throw new Error(`Bad response from server, code: ${null==e?void 0:e.status}, text: ${null==e?void 0:e.statusText}, headers: ${null==e?void 0:e.headers}`);return e}).catch(e=>Promise.reject(new Error("Fetch.get() http error: "+e))),c=yield a.json().then(e=>e),u=Object.assign(Object.assign({},c),{FetchResponse:{headers:a.headers,ok:a.ok,redirected:a.redirected,status:a.status,statusText:a.statusText,url:a.url}});
/* Use the cross-fetch package to perform an HTTP request */
/* Return the completed ApiResponse */
return Promise.resolve(u)}))}}
/**
   * @module api/actions/DecodeVin
   * @category Actions
   * @description DecodeVin NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [DecodeVin](module-api_actions_DecodeVin.DecodeVin.html)
   * >
   * > **Types**
   * > - Type: [DecodeVinResponse](#DecodeVinResponse)
   * > - Type: [DecodeVinResults](#DecodeVinResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class l extends d{constructor(e){super(e)}
/**
       * The DecodeVin API Action will decode the VIN and the decoded output will be made available in the format of Key-value pairs.
       * - Providing `params.modelYear` allows for the decoding to specifically be done in the current,
       *   or older (pre-1980), model year ranges.
       *   - It is recommended to always provide `params.modelYear` if the model year is known at the time of decoding.
       * - This API also supports partial VIN decoding (VINs that are less than 17 characters).
       *   - In this case, the VIN will be decoded partially with the available characters.
       *   - In case of partial VINs, a "*" could be used to indicate the unavailable characters.
       *   - The 9th digit is not necessary.
       *
       * @async
       * @param {string} vin - Vehicle Identification Number (full or partial).
       * @param {object} [params={}] - Query Search Parameters to append to the URL.
       * @param {number} [params.modelYear] - Optional Model Year search parameter.
       * @returns {(Promise<DecodeVinResponse>)} - Api Response object.
       */DecodeVin(e,r){return s(this,void 0,void 0,(function*(){const t="DecodeVin",o=i(r);
/* Runtime typechecking */if(r&&"object"!==o)return Promise.reject(new Error(`DecodeVin, "params" argument must be of type object, got: <${o}> ${r}`));const n=i(e);if("string"!==n)return Promise.reject(new Error(`DecodeVin, "vin" argument is required and must be of type string, got: <${n}> ${e}`));const s=i(null==r?void 0:r.modelYear);if((null==r?void 0:r.modelYear)&&"number"!==s)return Promise.reject(new Error(`DecodeVin, "params.modelYear" argument is required and must be of type string or number, got: <${s}> ${r.modelYear}`));
/* Build the query string to be appended to the URL*/const a=yield this.buildQueryString(r).catch(e=>Promise.reject(new Error(`${t}, Error building query string: ${e}`))),c=`${this.baseUrl}/${t}/${e}${a}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(c).then(e=>e).catch(e=>Promise.reject(new Error(`${t}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/DecodeVinExtended
   * @category Actions
   * @description DecodeVinExtended NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [DecodeVinExtended](module-api_actions_DecodeVinExtended.DecodeVinExtended.html)
   * >
   * > **Types**
   * > - Type: [DecodeVinExtendedResponse](#DecodeVinExtendedResponse)
   * > - Type: [DecodeVinExtendedResults](#DecodeVinExtendedResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class m extends d{constructor(e){super(e)}
/**
       * This is exactly like the DecodeVin method but provides additional information on variables
       * related to other NHTSA programs like
       * [NCSA](https://www.nhtsa.gov/research-data/national-center-statistics-and-analysis-ncsa), etc.
       * - This will decode the VIN and the decoded output will be made available
       *   in the format of Key-value pairs.
       * - In the returned 'Results` object:
       *   - The IDs (VariableID and ValueID) represent the unique ID associated with the Variable/Value.
       *   - In case of text variables, the ValueID is not applicable.
       * - Providing `params.modelYear` allows for the decoding to specifically be done in the current,
       *   or older (pre-1980), model year ranges.
       *   - It is recommended to always provide `params.modelYear` if the model year is known at the time of decoding.
       * - This Action also supports partial VIN decoding (VINs that are less than 17 characters).
       *   - In this case, the VIN will be decoded partially with the available characters.
       *   - In case of partial VINs, a "*" could be used to indicate the unavailable characters.
       *   - The 9th digit is not necessary.
       *
       * @async
       * @param {string} vin - Vehicle Identification Number (full or partial).
       * @param {object} [params={}] - Query Search Parameters to append to the URL.
       * @param {string|number} [params.modelYear] - Optional Model Year search parameter.
       * @returns {(Promise<DecodeVinExtendedResponse>)} - Api Response object.
       */DecodeVinExtended(e,r){return s(this,void 0,void 0,(function*(){const t="DecodeVinExtended",o=i(r);
/* Runtime typechecking */if(r&&"object"!==o)return Promise.reject(new Error(`DecodeVinExtended, "params" argument must be of type object, got: <${o}> ${r}`));const n=i(e);if("string"!==n)return Promise.reject(new Error(`DecodeVinExtended, "vin" argument is required and must be of type string, got: <${n}> ${e}`));const s=i(null==r?void 0:r.modelYear);if((null==r?void 0:r.modelYear)&&"number"!==s)return Promise.reject(new Error(`DecodeVinExtended, "params.modelYear" argument is required and must be of type string or number, got: <${s}> ${r.modelYear}`));
/* Build the query string to be appended to the URL*/const a=yield this.buildQueryString(r).catch(e=>Promise.reject(new Error(`${t}, Error building query string: ${e}`))),c=`${this.baseUrl}/${t}/${e}${a}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(c).then(e=>e).catch(e=>Promise.reject(new Error(`${t}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/DecodeVinValues
   * @category Actions
   * @description DecodeVinValues NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [DecodeVinValues](module-api_actions_DecodeVinValues.DecodeVinValues.html)
   * >
   * > **Types**
   * > - Type: [DecodeVinValuesResponse](#DecodeVinValuesResponse)
   * > - Type: [DecodeVinValuesResults](#DecodeVinValuesResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class g extends d{constructor(e){super(e)}
/**
       * The DecodeVinValues API Action will decode the VIN with the Results returned in a _flat file_ format.
       * - The Results will be made available in a flat file format of a single object containing
       *   'key<string>: value<string>' results.
       * - Providing params.modelYear allows for the decoding to specifically be done in the current,
       *   or older (pre-1980), model year ranges.
       *   - It is recommended to always provide `params.modelYear` if the model year is known at the time of decoding.
       * - This Action also supports partial VIN decoding (VINs that are less than 17 characters).
       *   - In this case, the VIN will be decoded partially with the available characters.
       *   - In case of partial VINs, a "*" could be used to indicate the unavailable characters.
       *
       * @async
       * @param {string} vin - Vehicle Identification Number (full or partial).
       * @param {object} [params={}] - Query Search Parameters to append to the URL.
       * @param {string|number} [params.modelYear] - Optional Model Year search parameter.
       * @returns {(Promise<DecodeVinValuesResponse>)} Api Response object.
       */DecodeVinValues(e,r){return s(this,void 0,void 0,(function*(){const t="DecodeVinValues",o=i(r);
/* Runtime typechecking */if(r&&"object"!==o)return Promise.reject(new Error(`DecodeVinValues, "params" argument must be of type object, got: <${o}> ${r}`));const n=i(e);if("string"!==n)return Promise.reject(new Error(`DecodeVinValues, "vin" argument is required and must be of type string, got: <${n}> ${e}`));const s=i(null==r?void 0:r.modelYear);if((null==r?void 0:r.modelYear)&&"string"!==s&&"number"!==s)return Promise.reject(new Error(`DecodeVinValues, "params.modelYear" argument is required and must be of type string or number, got: <${s}> ${r.modelYear}`));
/* Build the query string to be appended to the URL*/const a=yield this.buildQueryString(r).catch(e=>Promise.reject(new Error(`${t}, Error building query string: ${e}`))),c=`${this.baseUrl}/${t}/${e}${a}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(c).then(e=>e).catch(e=>Promise.reject(new Error(`${t}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/DecodeVINValuesBatch
   * @category Actions
   * @description DecodeVINValuesBatch NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [DecodeVINValuesBatch](module-api_actions_DecodeVINValuesBatch.DecodeVINValuesBatch.html)
   * >
   * > **Types**
   * > - Type: [DecodeVINValuesBatchResponse](#DecodeVINValuesBatchResponse)
   * > - Type: [DecodeVINValuesBatchResults](#DecodeVINValuesBatchResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class h extends d{constructor(e){super(e)}
/**
       * This decodes a batch of VINs that are submitted in a standardized format in a string
       * and returns multiple decodes in a flat format.
       *
       * The `inputString` parameter should be in the following format:
       * - `vin , modelYear ; vin , modelYear ; vin , modelYear ...`
       *
       * "modelYear" is optional, the output for each VIN decode is in the same format as produced by the "Decode VIN (flat format)" method.
       *
       * @async
       * @param {string} inputString - A string of Vehicle Identification Numbers (full or partial) following the format listed in the description.
       * @returns {(Promise<DecodeVINValuesBatchResponse>)} - Api Response object.
       */DecodeVINValuesBatch(e){return s(this,void 0,void 0,(function*(){const r="DecodeVINValuesBatch",t=i(e);
/* Runtime typechecking */if("string"!==t)return Promise.reject(new Error(`DecodeVINValuesBatch, "inputString" argument is required and must be of type string, got: <${t}> ${e}`));
/* Build the final request URL*/const o=`${this.baseUrl}/${r}/`,n=encodeURI(`DATA=${e}&format=json`);
/* Return the result */
return yield this.get(o,{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:n}).then(e=>e).catch(e=>Promise.reject(new Error(`${r}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/DecodeVinValuesExtended
   * @category Actions
   * @description DecodeVinValuesExtended NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [DecodeVinValuesExtended](module-api_actions_DecodeVinValuesExtended.DecodeVinValuesExtended.html)
   * >
   * > **Types**
   * > - Type: [DecodeVinValuesExtendedResponse](#DecodeVinValuesExtendedResponse)
   * > - Type: [DecodeVinValuesExtendedResults](#DecodeVinValuesExtendedResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class $ extends d{constructor(e){super(e)}
/**
       * This is exactly like the DecodeVinValues (flat format Results) method but provides additional information
       * on variables related to other NHTSA programs like
       * [NCSA](https://www.nhtsa.gov/research-data/national-center-statistics-and-analysis-ncsa), etc.
       * - The Results will be made available in a flat file format of a single object containing
       *   'key<string>: value<string>' results.
       * - Providing `params.modelYear` allows for the decoding to specifically be done in the current,
       *   or older (pre-1980), model year ranges.
       *   - It is recommended to always provide `params.modelYear` if the model year is known at the time of decoding.
       * - This Action also supports partial VIN decoding (VINs that are less than 17 characters).
       *   - In this case, the VIN will be decoded partially with the available characters.
       *   - In case of partial VINs, a "*" could be used to indicate the unavailable characters.
       *
       * @async
       * @param {string} vin - Vehicle Identification Number (full or partial).
       * @param {object} [params={}] - Query Search Parameters to append to the URL.
       * @param {string|number} [params.modelYear] - Optional Model Year search parameter.
       * @reje
       * @returns {(Promise<DecodeVinValuesExtendedResponse>)} Api Response object.
       */DecodeVinValuesExtended(e,r){return s(this,void 0,void 0,(function*(){const t="DecodeVinValuesExtended",o=i(r);
/* Runtime typechecking */if(r&&"object"!==o)return Promise.reject(new Error(`DecodeVinValuesExtended, "params" argument must be of type object, got: <${o}> ${r}`));const n=i(e);if("string"!==n)return Promise.reject(new Error(`DecodeVinValuesExtended, "vin" argument is required and must be of type string, got: <${n}> ${e}`));const s=i(null==r?void 0:r.modelYear);if((null==r?void 0:r.modelYear)&&"number"!==s)return Promise.reject(new Error(`DecodeVinValuesExtended, "params.modelYear" argument is required and must be of type string or number, got: <${s}> ${r.modelYear}`));
/* Build the query string to be appended to the URL*/const a=yield this.buildQueryString(r).catch(e=>Promise.reject(new Error(`${t}, Error building query string: ${e}`))),c=`${this.baseUrl}/${t}/${e}${a}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(c).then(e=>e).catch(e=>Promise.reject(new Error(`${t}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/DecodeWMI
   * @category Actions
   * @description DecodeWMI NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [DecodeWMI](module-api_actions_DecodeWMI.DecodeWMI.html)
   * >
   * > **Types**
   * > - Type: [DecodeWMIResponse](#DecodeWMIResponse)
   * > - Type: [DecodeWMIResults](#DecodeWMIResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class p extends d{constructor(e){super(e)}
/**
       * This provides information on the World Manufacturer Identifier for a specific WMI code.
       * - `WMI` may be put in as either 3 characters representing VIN position 1-3 or 6 characters
       *   representing VIN positions 1-3 & 12-14. Example "JTD", "1T9131".
       *
       * @async
       * @param {string} WMI - World Manufacturer Identifier.
       * @returns {(Promise<DecodeWMIResults>)} Api Response object.
       */DecodeWMI(e){return s(this,void 0,void 0,(function*(){const r="DecodeWMI",t=i(e);
/* Runtime typechecking */if("string"!==t)return Promise.reject(new Error(`DecodeWMI, "WMI" argument is required and must be of type string, got: <${t}> ${e}`));
/* Build the 'default' query string to be appended to the URL*/const o=yield this.buildQueryString().catch(e=>Promise.reject(new Error(`${r}, Error building query string: ${e}`))),n=`${this.baseUrl}/${r}/${e}${o}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(n).then(e=>e).catch(e=>Promise.reject(new Error(`${r}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/GetAllMakes
   * @category Actions
   * @description GetAllMakes NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [GetAllMakes](module-api_actions_GetAllMakes.GetAllMakes.html)
   * >
   * > **Types**
   * > - Type: [GetAllMakesResponse](#GetAllMakesResponse)
   * > - Type: [GetAllMakesResults](#GetAllMakesResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class y extends d{constructor(e){super(e)}
/**
       * This provides a list of all the Makes available in the vPIC Dataset.
       *
       * @async
       * @returns {(Promise<GetAllMakesResponse>)} Api Response object.
       */GetAllMakes(){return s(this,void 0,void 0,(function*(){const e=yield this.buildQueryString().catch(e=>Promise.reject(new Error("GetAllMakes, Error building query string: "+e))),r=`${this.baseUrl}/GetAllMakes${e}`
/* Return the result */;
/* Build the 'default' query string to be appended to the URL*/return yield this.get(r).then(e=>e).catch(e=>Promise.reject(new Error("GetAllMakes, Fetch.get() error: "+e)))}))}}
/**
   * @module api/actions/GetAllManufacturers
   * @category Actions
   * @description GetAllManufacturers NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [GetAllManufacturers](module-api_actions_GetAllManufacturers.GetAllManufacturers.html)
   * >
   * > **Types**
   * > - Type: [GetAllManufacturersResponse](#GetAllManufacturersResponse)
   * > - Type: [GetAllManufacturersResults](#GetAllManufacturersResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class b extends d{constructor(e){super(e)}
/**
       * This provides a list of all the Manufacturers available in vPIC Dataset.
       * - `params.manufacturerType` allows the user to filter the list based on manufacturer type,
       *   ('Incomplete Vehicles', 'Completed Vehicle Manufacturer', 'Incomplete Vehicle Manufacturer',
       *   'Intermediate Manufacturer', 'Final-Stage Manufacturer', 'Alterer', or any partial match of those strings).
       * - You can get a list of all manufacturer types with the following API Action:
       *   `GetVehicleVariableValuesList('manufacturer type')`
       * - Results are provided in pages of 100 items.
       * - Provide a number value for `params.page` to specify 1st (default), 2nd, 3rd, Nth, etc page.
       *
       * @async
       * @param {object} [params={}] - Query Search Parameters to append to the URL.
       * @param {string} [params.manufacturerType] - See method description.
       * @param {number} [params.page] - Specify the page number (results returned 100 at a time).
       * @returns {(Promise<module:api.ApiResponse>)} Api Response object.
       */GetAllManufacturers(e={}){return s(this,void 0,void 0,(function*(){const r="GetAllManufacturers",t=i(e);
/* Runtime typechecking */if("object"!==t)return Promise.reject(new Error(`GetAllManufacturers, "params" argument must be of type object, got: <${t}> ${e}`));const o=i(e.manufacturerType);if(e.manufacturerType&&"string"!==o)return Promise.reject(new Error(`GetAllManufacturers, "params.manufacturerType" argument must be of type string, got: <${o}> ${e.manufacturerType}`));const n=i(e.page);if(e.page&&"number"!==n)return Promise.reject(new Error(`GetAllManufacturers, "params.page" argument must be of type number, got: <${n}> ${e.page}`));
/* Build the query string to be appended to the URL*/const s=yield this.buildQueryString(e).catch(e=>Promise.reject(new Error(`${r}, Error building query string: ${e}`))),a=`${this.baseUrl}/${r}${s}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(a).then(e=>e).catch(e=>Promise.reject(new Error(`${r}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/GetCanadianVehicleSpecifications
   * @category Actions
   * @description GetCanadianVehicleSpecifications NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [GetCanadianVehicleSpecifications](module-api_actions_GetCanadianVehicleSpecifications.GetCanadianVehicleSpecifications.html)
   * >
   * > **Types**
   * > - Type: [GetCanadianVehicleSpecificationsResponse](#GetCanadianVehicleSpecificationsResponse)
   * > - Type: [GetCanadianVehicleSpecificationsResults](#GetCanadianVehicleSpecificationsResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class f extends d{constructor(e){super(e)}
/**
       * The Canadian Vehicle Specifications (CVS) consists of a database of original vehicle dimensions,
       * used primarily in collision investigation and reconstruction, combined with a search engine.
       *
       * The database is compiled annually by the Collision Investigation and Research Division of Transport Canada.
       * Visit official [Canadian Vehicle Specifications](http://www.carsp.ca/research/resources/safety-sources/canadian-vehicle-specifications/)
       * page for more details.
       *
       * This API action will return a 404 html error if any of the query parameters in params
       * are missing from the query string. This is the only API action with this behaviour. Therefore,
       * parameters are inserted into the query string as empty strings if not provided by the user.
       *
       * @async
       * @param {object} params - Query Search Parameters to append to the URL.
       * @param {number} params.year - Model year of the vehicle (required) - Number, >= 1971.
       * @param {string} [params.make] - Vehicle's make, like "Honda", "Toyota", etc...
       * @param {string} [params.model] - Vehicle's model, like "Pilot", "Focus". Can also include some other elements like Body Type, Engine Model/size, etc...
       * @param {string} [params.units] - "Metric" (default), or "US" for United States customary units.
       * @returns {(Promise<GetCanadianVehicleSpecificationsResponse>)} Api Response object.
       */GetCanadianVehicleSpecifications(e){return s(this,void 0,void 0,(function*(){const r="GetCanadianVehicleSpecifications",t=i(e);
/* Runtime typechecking */if("object"!==t)return Promise.reject(new Error(`GetCanadianVehicleSpecifications, "params" argument must be of type object, got: <${t}> ${e}`));const o=i(e.year);if("number"!==o)return Promise.reject(new Error(`GetCanadianVehicleSpecifications, "params.year" argument is required and must be of type number, got: <${o}> ${e.year}`));const n=i(e.make);if(e.make&&"string"!==n)return Promise.reject(new Error(`GetCanadianVehicleSpecifications, "params.make" argument must be of type string, got: <${n}> ${e.make}`));const s=i(e.model);if(e.model&&"string"!==s)return Promise.reject(new Error(`GetCanadianVehicleSpecifications, "params.model" argument must be of type string, got: <${s}> ${e.model}`));const a=i(e.units);if(e.units&&"string"!==a)return Promise.reject(new Error(`GetCanadianVehicleSpecifications, "params.units" argument must be of type string, got: <${a}> ${e.units}`));
/* Set default query parameters to empty strings if not provided by the user */const c=e.make||"",u=e.model||"",d=e.units||"",l={year:e.year,make:c,model:u,units:d},m=yield this.buildQueryString(l,!0).catch(e=>Promise.reject(new Error(`${r}, Error building query string: ${e}`))),g=`${this.baseUrl}/${r}${m}`
/* Return the result */;return yield this.get(g).then(e=>e).catch(e=>Promise.reject(new Error(`${r}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/GetEquipmentPlantCodes
   * @category Actions
   * @description GetEquipmentPlantCodes NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [GetEquipmentPlantCodes](module-api_actions_GetEquipmentPlantCodes.GetEquipmentPlantCodes.html)
   * >
   * > **Types**
   * > - Type: [GetEquipmentPlantCodesResponse](#GetEquipmentPlantCodesResponse)
   * > - Type: [GetEquipmentPlantCodesResults](#GetEquipmentPlantCodesResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class E extends d{constructor(e){super(e)}
/**
       * Returns assigned Equipment Plant Codes. Can be filtered by Year, Equipment Type and Report Type.
       *
       * `params.year`:
       *  - Only years >= 2016 are supported
       *
       * `params.equipmentType`:
       *  - 1 (Tires)
       *  - 3 (Brake Hoses)
       *  - 13 (Glazing)
       *  - 16 (Retread)
       *
       * `params.reportType`:
       *  - 'New' (The Equipment Plant Code was assigned during the selected year).
       *  - 'Updated' (The Equipment Plant data was modified during the selected year).
       *  - 'Closed' (The Equipment Plant is no longer Active).
       *  - 'All' (All Equipment Plant Codes regardless of year, including their status (active or closed)).
       *
       * @async
       * @param {object} params - Query Search Parameters to append to the URL.
       * @param {number} params.year - Model year of the vehicle - Number, >= 2016.
       * @param {number} params.equipmentType - Number equal to 1, 3, 13, or 16.
       * @param {string} params.reportType - 'New', 'Updated', 'Closed', or 'All'.
       * @returns {(Promise<GetEquipmentPlantCodesResponse>)} Api Response object.
       */GetEquipmentPlantCodes(e){return s(this,void 0,void 0,(function*(){const r="GetEquipmentPlantCodes",t=i(e);
/* Runtime typechecking */if("object"!==t)return Promise.reject(new Error(`GetEquipmentPlantCodes, "params" argument must be of type object, got: <${t}> ${e}`));const o=i(e.year);if("number"!==o)return Promise.reject(new Error(`GetEquipmentPlantCodes, "params.year" argument is required and must be of type number, got: <${o}> ${e.year}`));const n=i(e.equipmentType);if("number"!==n)return Promise.reject(new Error(`GetEquipmentPlantCodes, "params.equipmentType" argument is required and must be of type number, got: <${n}> ${e.equipmentType}`));const s=i(e.reportType);if("string"!==s)return Promise.reject(new Error(`GetEquipmentPlantCodes, "params.reportType" argument is required and must be of type string, got: <${s}> ${e.reportType}`));
/* Build the query string to be appended to the URL*/const a=yield this.buildQueryString(e).catch(e=>Promise.reject(new Error(`${r}, Error building query string: ${e}`))),c=`${this.baseUrl}/${r}${a}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(c).then(e=>e).catch(e=>Promise.reject(new Error(`${r}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/GetMakeForManufacturer
   * @category Actions
   * @description GetMakeForManufacturer NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [GetMakeForManufacturer](module-api_actions_GetMakeForManufacturer.GetMakeForManufacturer.html)
   * >
   * > **Types**
   * > - Type: [GetMakeForManufacturerResponse](#GetMakeForManufacturerResponse)
   * > - Type: [GetMakeForManufacturerResults](#GetMakeForManufacturerResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class j extends d{constructor(e){super(e)}
/**
       * This returns all the Makes in the vPIC dataset for a specified manufacturer that is requested.
       * - If supplied `manufacturer` is a number - method will do exact match on Manufacturer's Id.
       * - If supplied `manufacturer` is a string - it will look for manufacturers whose name is LIKE the provided name
       *   (it accepts a partial manufacturer name as an input).
       * - `manufacturer` name can be a partial name, or a full name for more specificity
       *   (e.g., "988", "HONDA", "HONDA OF CANADA MFG., INC.", etc.).
       * - Multiple results are returned in case of multiple matches.
       *
       * @async
       * @param {string|number} manufacturer - Manufacturer Name (string) or Manufacturer ID (number).
       * @returns {(Promise<GetMakeForManufacturer>)} Api Response object.
       */GetMakeForManufacturer(e){return s(this,void 0,void 0,(function*(){const r="GetMakeForManufacturer",t=i(e);
/* Runtime typechecking */if("string"!==t&&"number"!==t)return Promise.reject(new Error(`GetMakeForManufacturer, "manufacturer" argument is required and must be of type string or number, got: <${t}> ${e}`));
/* Build the 'default' query string to be appended to the URL*/const o=yield this.buildQueryString().catch(e=>Promise.reject(new Error(`${r}, Error building query string: ${e}`))),n=`${this.baseUrl}/${r}/${e}${o}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(n).then(e=>e).catch(e=>Promise.reject(new Error(`${r}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/GetMakesForManufacturerAndYear
   * @category Actions
   * @description GetMakesForManufacturerAndYear NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [GetMakesForManufacturerAndYear](module-api_actions_GetMakesForManufacturerAndYear.GetMakesForManufacturerAndYear.html)
   * >
   * > **Types**
   * > - Type: [GetMakesForManufacturerAndYearResponse](#GetMakesForManufacturerAndYearResponse)
   * > - Type: [GetMakesForManufacturerAndYearResults](#GetMakesForManufacturerAndYearResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class M extends d{constructor(e){super(e)}
/**
       * This returns all the Makes in the vPIC dataset for a specified manufacturer,
       * and whose Year From and Year To range cover the specified year.
       * - If supplied `manufacturer` is a number - method will do exact match on Manufacturer's Id.
       * - If supplied `manufacturer` is a string - it will look for manufacturers whose name is LIKE the provided name
       *   (it accepts a partial manufacturer name as an input).
       * - Multiple results are returned in case of multiple matches.
       * - Manufacturer can be idenfitied by Id, a partial name, or a full name
       *   (e.g., "988", "HONDA", "HONDA OF CANADA MFG., INC.", etc.).
       *
       * @async
       * @param {string|number} manufacturer - Manufacturer Name (string) or Manufacturer ID (number).
       * @param {object} params - Query Search Parameters to append to the URL.
       * @param {number} params.year - Model year of the vehicle - Number, >= 2016.
       *
       * @returns {(Promise<GetMakesForManufacturerAndYearResponse>)} Api Response object.
       */GetMakesForManufacturerAndYear(e,r){return s(this,void 0,void 0,(function*(){const t="GetMakesForManufacturerAndYear",o=i(e);
/* Runtime typechecking */if("string"!==o&&"number"!==o)return Promise.reject(new Error(`GetMakesForManufacturerAndYear, "manufacturer" argument is required and must be of type string or number, got: <${o}> ${e}`));const n=i(r);if("object"!==n)return Promise.reject(new Error(`GetMakesForManufacturerAndYear, "params" argument is required and must be of type object, got: <${n}> ${r}`));const s=i(r.year);if("number"!==s)return Promise.reject(new Error(`GetMakesForManufacturerAndYear, "params.year" argument is required and must be of type number, got: <${s}> ${r.year}`));
/* Build the query string to be appended to the URL*/const a=yield this.buildQueryString(r).catch(e=>Promise.reject(new Error(`${t}, Error building query string: ${e}`))),c=`${this.baseUrl}/${t}/${e}${a}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(c).then(e=>e).catch(e=>Promise.reject(new Error(`${t}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/GetMakesForVehicleType
   * @category Actions
   * @description GetMakesForVehicleType NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [GetMakesForVehicleType](module-api_actions_GetMakesForVehicleType.GetMakesForVehicleType.html)
   * >
   * > **Types**
   * > - Type: [GetMakesForVehicleTypeResponse](#GetMakesForVehicleTypeResponse)
   * > - Type: [GetMakesForVehicleTypeResults](#GetMakesForVehicleTypeResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class G extends d{constructor(e){super(e)}
/**
       * This returns all the Makes in the vPIC dataset for a specified vehicle type (`typeName`),
       * whose name is LIKE the vehicle type name in vPIC Dataset.
       * - Vehicle `typeName` can be a partial name, or a full name for more specificity
       *   (e.g., "Vehicle", "Moto", "Low Speed Vehicle", etc.).
       *
       * @async
       * @param {string} typeName - A partial or full vehicle type name.
       * @returns {(Promise<GetMakesForVehicleTypeResponse>)} Api Response object.
       */GetMakesForVehicleType(e){return s(this,void 0,void 0,(function*(){const r="GetMakesForVehicleType",t=i(e);
/* Runtime typechecking */if("string"!==t)return Promise.reject(new Error(`GetMakesForVehicleType, "typeName" argument is required and must be of type string, got: <${t}> ${e}`));
/* Build the 'default' query string to be appended to the URL*/const o=yield this.buildQueryString().catch(e=>Promise.reject(new Error(`${r}, Error building query string: ${e}`))),n=`${this.baseUrl}/${r}/${e}${o}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(n).then(e=>e).catch(e=>Promise.reject(new Error(`${r}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/GetManufacturerDetails
   * @category Actions
   * @description GetManufacturerDetails NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [GetManufacturerDetails](module-api_actions_GetManufacturerDetails.GetManufacturerDetails.html)
   * >
   * > **Types**
   * > - Type: [GetManufacturerDetailsResponse](#GetManufacturerDetailsResponse)
   * > - Type: [GetManufacturerDetailsResults](#GetManufacturerDetailsResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class P extends d{constructor(e){super(e)}
/**
       * This provides the details for a specific manufacturer that is requested.
       * - If supplied `manufacturer` is a number - method will do exact match on Manufacturer's Id.
       * - If supplied `manufacturer` is a string - it will look for manufacturers whose name is LIKE the provided name,
       *   (it accepts a partial manufacturer name as an input).
       * - Multiple results are returned in case of multiple matches.
       *
       * @async
       * @param {string|number} manufacturer - Manufacturer Name (string) or Manufacturer ID (number).
       * @returns {(Promise<GetManufacturerDetailsResponse>)} Api Response object.
       */GetManufacturerDetails(e){return s(this,void 0,void 0,(function*(){const r="GetManufacturerDetails",t=i(e);
/* Runtime typechecking */if("string"!==t&&"number"!==t)return Promise.reject(new Error(`GetManufacturerDetails, "manufacturer" argument is required and must be of type string or number, got: <${t}> ${e}`));
/* Build the 'default' query string to be appended to the URL*/const o=yield this.buildQueryString().catch(e=>Promise.reject(new Error(`${r}, Error building query string: ${e}`))),n=`${this.baseUrl}/${r}/${e}${o}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(n).then(e=>e).catch(e=>Promise.reject(new Error(`${r}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/GetModelsForMake
   * @category Actions
   * @description GetModelsForMake NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [GetModelsForMake](module-api_actions_GetModelsForMake.GetModelsForMake.html)
   * >
   * > **Types**
   * > - Type: [GetModelsForMakeResponse](#GetModelsForMakeResponse)
   * > - Type: [GetModelsForMakeResults](#GetModelsForMakeResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class V extends d{constructor(e){super(e)}
/**
       * This returns the Models in the vPIC dataset for a specified `makeName`
       * whose Name is LIKE the Make in vPIC Dataset.
       * - `makeName` can be a partial, or a full for more specificity
       *   (e.g., "Harley", "Harley Davidson", etc.).
       *
       * @async
       * @param {string} makeName - Vehicle make name.
       * @returns {(Promise<GetModelsForMakeResponse>)} Api Response object.
       */GetModelsForMake(e){return s(this,void 0,void 0,(function*(){const r="GetModelsForMake",t=i(e);
/* Runtime typechecking */if("string"!==t)return Promise.reject(new Error(`GetModelsForMake, "makeName" argument is required and must be of type string, got: <${t}> ${e}`));
/* Build the 'default' query string to be appended to the URL*/const o=yield this.buildQueryString().catch(e=>Promise.reject(new Error(`${r}, Error building query string: ${e}`))),n=`${this.baseUrl}/${r}/${e}${o}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(n).then(e=>e).catch(e=>Promise.reject(new Error(`${r}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/GetModelsForMakeId
   * @category Actions
   * @description GetModelsForMakeId NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [GetModelsForMakeId](module-api_actions_GetModelsForMakeId.GetModelsForMakeId.html)
   * >
   * > **Types**
   * > - Type: [GetModelsForMakeIdResponse](#GetModelsForMakeIdResponse)
   * > - Type: [GetModelsForMakeIdResults](#GetModelsForMakeIdResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class w extends d{constructor(e){super(e)}
/**
       * This returns the Models in the vPIC dataset for a specified Make
       * whose Id is equal to the `makeId` in the vPIC Dataset.
       *
       * @async
       * @param {number} makeID - Vehicle make ID (number).
       * @returns {(Promise<GetModelsForMakeIdResponse>)} Api Response object.
       */GetModelsForMakeId(e){return s(this,void 0,void 0,(function*(){const r="GetModelsForMakeId",t=i(e);
/* Runtime typechecking */if("number"!==t)return Promise.reject(new Error(`GetModelsForMakeId, "makeId" argument is required and must be of type number, got: <${t}> ${e}`));
/* Build the 'default' query string to be appended to the URL*/const o=yield this.buildQueryString({}).catch(e=>Promise.reject(new Error(`${r}, Error building query string: ${e}`))),n=`${this.baseUrl}/${r}/${e}${o}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(n).then(e=>e).catch(e=>Promise.reject(new Error(`${r}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/GetModelsForMakeIdYear
   * @category Actions
   * @description GetModelsForMakeIdYear NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [GetModelsForMakeIdYear](module-api_actions_GetModelsForMakeIdYear.GetModelsForMakeIdYear.html)
   * >
   * > **Types**
   * > - Type: [GetModelsForMakeIdYearResponse](#GetModelsForMakeIdYearResponse)
   * > - Type: [GetModelsForMakeIdYearResults](#GetModelsForMakeIdYearResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class F extends d{constructor(e){super(e)}
/**
       * This returns the Models in the vPIC dataset for a specified Model Year
       * and Make whose name is LIKE the Make in the vPIC Dataset.
       *   - `params.makeId` is a number and is a required query parameter.
       *
       * A minimum of one of the following are required (or a combination of both):
       *   - `params.modelYear` is a number (greater than 1995)
       *   - `params.vehicleType` can be a partial name, or a full name for more specificity
       *     (e.g., "Vehicle", "Moto", "Low Speed Vehicle", etc.).
       *
       * @async
       * @param {object} params - Query Search Parameters to append to the URL.
       * @param {number} params.makeId - Make ID to search.
       * @param {number} [params.modelYear] - A number representing the model year to search (greater than 1995).
       * @param {string} [params.vehicleType] - String representing the vehicle type to search.
       * @returns {(Promise<GetModelsForMakeIdYearResponse>)} Api Response object.
       */GetModelsForMakeIdYear(e){return s(this,void 0,void 0,(function*(){const r="GetModelsForMakeIdYear",t=null==e?void 0:e.makeId,o=null==e?void 0:e.modelYear,n=null==e?void 0:e.vehicleType,s=i(e);if("object"!==s)return Promise.reject(new Error(`GetModelsForMakeIdYear, "params" argument must be of type object, got: <${s}> ${e}`));
/* Required makeId param of type number */const a=i(t);if("number"!==a)return Promise.reject(new Error(`GetModelsForMakeIdYear, "params.makeId" argument is required and must be of type number, got: <${a}> ${t}`));
/* At least one of modelYear or vehicleType params is required */if(!o&&!n)return Promise.reject(new Error(`GetModelsForMakeIdYear, either one of "params.modelYear" or "params.vehicleType" is required, got: ${o} | ${n}`));
/* valid modelYear param of type number */const c=i(o);if(o&&"number"!==c)return Promise.reject(new Error(`GetModelsForMakeIdYear, "params.modelYear" must be of type number, got: <${c}> ${o}`));
/* valid vehicleType param of type string */const u=i(n);if(n&&"string"!==u)return Promise.reject(new Error(`GetModelsForMakeIdYear, "params.vehicleType" must be of type string, got: <${u}> ${n}`));
/* Beginning of the the actionUrl */let d=`${r}/makeId/${t}/`
/* Append params.modelYear and params.vehicleType to the actionUrl, at least one is required by the API */;d+=o&&n?`modelYear/${o}/vehicleType/${n}`:o?"modelYear/"+o:"vehicleType/"+n
/* Build the 'default' query string to be appended to the URL*/;const l=yield this.buildQueryString().catch(e=>Promise.reject(new Error(`${r}, Error building query string: ${e}`))),m=`${this.baseUrl}/${d}${l}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(m).then(e=>e).catch(e=>Promise.reject(new Error(`${r}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/GetModelsForMakeYear
   * @category Actions
   * @description GetModelsForMakeYear NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [GetModelsForMakeYear](module-api_actions_GetModelsForMakeYear.GetModelsForMakeYear.html)
   * >
   * > **Types**
   * > - Type: [GetModelsForMakeYearResponse](#GetModelsForMakeYearResponse)
   * > - Type: [GetModelsForMakeYearResults](#GetModelsForMakeYearResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class v extends d{constructor(e){super(e)}
/**
       * This returns the Models in the vPIC dataset for a specified Model Year
       * and Make whose name is LIKE the Make in the vPIC Dataset.
       *   - `params.make` is required. It can be a partial, or a full name for more specificity
       *     (e.g., "Harley", "Harley Davidson", etc.).
       *
       * A minimum of one of the following are required (or a combination of both):
       *   - `params.modelYear` is a number (greater than 1995)
       *   - `params.vehicleType` can be a partial name, or a full name for more specificity
       *     (e.g., "Vehicle", "Moto", "Low Speed Vehicle", etc.).
       *
       * @async
       *
       * @param {object} params - Query Search Parameters to append to the URL.
       * @param {string} params.make - Make name to search.
       * @param {number} [params.modelYear] - A number representing the model year to search (greater than 1995).
       * @param {string} [params.vehicleType] - String representing the vehicle type to search.
       *
       * @returns {(Promise<GetModelsForMakeYearResponse>)} Api Response object.
       */GetModelsForMakeYear(e){return s(this,void 0,void 0,(function*(){const r="GetModelsForMakeYear",t=null==e?void 0:e.make,o=null==e?void 0:e.modelYear,n=null==e?void 0:e.vehicleType,s=i(e);if("object"!==s)return Promise.reject(new Error(`GetModelsForMakeYear, "params" argument must be of type object, got: <${s}> ${e}`));
/* Required make param of type string */const a=i(t);if("string"!==a)return Promise.reject(new Error(`GetModelsForMakeYear, "params.make" argument is required and must be of type string, got: <${a}> ${t}`));
/* At least one of modelYear or vehicleType params is required */if(!o&&!n)return Promise.reject(new Error(`GetModelsForMakeYear, either one of "params.modelYear" or "params.vehicleType" is required, got: ${o} | ${n}`));
/* valid modelYear param of type number */const c=i(o);if(o&&"number"!==c)return Promise.reject(new Error(`GetModelsForMakeYear, "params.modelYear" must be of type number, got: <${c}> ${o}`));
/* valid vehicleType param of type string */const u=i(n);if(n&&"string"!==u)return Promise.reject(new Error(`GetModelsForMakeYear, "params.vehicleType" must be of type string, got: <${u}> ${n}`));
/* Beginning of the the actionUrl */let d=`${r}/make/${e.make}/`
/* Append params.modelYear and params.vehicleType to the actionUrl, at least one is required by the API */;d+=o&&n?`modelYear/${o}/vehicleType/${n}`:o?"modelYear/"+o:"vehicleType/"+n
/* Build the 'default' query string to be appended to the URL*/;const l=yield this.buildQueryString().catch(e=>Promise.reject(new Error(`${r}, Error building query string: ${e}`))),m=`${this.baseUrl}/${d}${l}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(m).then(e=>e).catch(e=>Promise.reject(new Error(`${r}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/GetParts
   * @category Actions
   * @description GetParts NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [GetParts](module-api_actions_GetParts.GetParts.html)
   * >
   * > **Types**
   * > - Type: [GetPartsResponse](#GetPartsResponse)
   * > - Type: [GetPartsResults](#GetPartsResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class k extends d{constructor(e){super(e)}
/**
       * This provides a list of ORGs with letter date in the given range of the dates
       * and with specified Type (`params.type`) of ORG.
       * - Up to 1000 results will be returned at a time.
       * - Get the next page by incrementing the `params.page` query parameter.
       * - All query `params` are optional.
       *
       * @async
       * @param {object} [params] - Query Search Parameters to append to the URL.
       * @param {number} [params.type] - Specified type of ORG to search.
       * @param {string} [params.fromDate] - Start date of search query.
       * @param {string} [params.toDate] - End date of search query.
       * @param {number} [params.page] - Which page number of results to request (100 results per page).
       * @returns {(Promise<GetPartsResponse>)} Api Response object.
       */GetParts(e){return s(this,void 0,void 0,(function*(){const r="GetParts",t=null==e?void 0:e.type,o=null==e?void 0:e.fromDate,n=null==e?void 0:e.toDate,s=null==e?void 0:e.page,a=i(e);if(e&&"object"!==a)return Promise.reject(new Error(`${r}, "params" argument must be of type object, got: <${a}> ${e}`));
/* valid params.type of type number */const c=i(t);if(t&&"number"!==c)return Promise.reject(new Error(`${r}, "params.type" argument must be of type number, got: <${c}> ${t}`));
/* valid params.fromDate of type string */const u=i(o);if(o&&"string"!==u)return Promise.reject(new Error(`${r}, "params.fromDate" argument must be of type string, got: <${u}> ${o}`));
/* valid params.toDate of type number */const d=i(n);if(n&&"string"!==d)return Promise.reject(new Error(`${r}, "params.toDate" argument must be of type string, got: <${d}> ${n}`));
/* valid params.page of type number */const l=i(s);if(s&&"number"!==l)return Promise.reject(new Error(`${r}, "params.page" argument must be of type number, got: <${l}> ${s}`));
/* Build the query string to be appended to the URL*/const m=yield this.buildQueryString(e).catch(e=>Promise.reject(new Error(`${r}, Error building query string: ${e}`))),g=`${this.baseUrl}/${r}${m}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(g).then(e=>e).catch(e=>Promise.reject(new Error(`${r}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/GetVehicleTypesForMake
   * @category Actions
   * @description GetVehicleTypesForMake NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [GetVehicleTypesForMake](module-api_actions_GetVehicleTypesForMake.GetVehicleTypesForMake.html)
   * >
   * > **Types**
   * > - Type: [GetVehicleTypesForMakeResponse](#GetVehicleTypesForMakeResponse)
   * > - Type: [GetVehicleTypesForMakeResults](#GetVehicleTypesForMakeResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class q extends d{constructor(e){super(e)}
/**
       * This returns all the Vehicle Types in the vPIC dataset for a specified Make,
       * whose name is LIKE the make name in the vPIC Dataset.
       * - `makeName` can be a partial name, or a full name for more specificity
       *   (e.g., "Merc", "Mercedes Benz", etc.).
       *
       * @async
       * @param {string} makeName - Name of the vehicle make to search.
       * @returns {(Promise<GetVehicleTypesForMakeResponse>)} Api Response object.
       */GetVehicleTypesForMake(e){return s(this,void 0,void 0,(function*(){const r="GetVehicleTypesForMake",t=i(e);
/* Runtime typechecking */if("string"!==t)return Promise.reject(new Error(`GetVehicleTypesForMake, "makeName" argument is required and must be of type string, got: <${t}> ${e}`));
/* Build the 'default' query string to be appended to the URL*/const o=yield this.buildQueryString().catch(e=>Promise.reject(new Error(`${r}, Error building query string: ${e}`))),n=`${this.baseUrl}/${r}/${e}${o}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(n).then(e=>e).catch(e=>Promise.reject(new Error(`${r}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/GetVehicleTypesForMakeId
   * @category Actions
   * @description GetVehicleTypesForMakeId NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [GetVehicleTypesForMakeId](module-api_actions_GetVehicleTypesForMakeId.GetVehicleTypesForMakeId.html)
   * >
   * > **Types**
   * > - Type: [GetVehicleTypesForMakeIdResponse](#GetVehicleTypesForMakeIdResponse)
   * > - Type: [GetVehicleTypesForMakeIdResults](#GetVehicleTypesForMakeIdResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class D extends d{constructor(e){super(e)}
/**
       * This returns all the Vehicle Types in the vPIC dataset for a specified Make and
       * whose ID equals the make ID in the vPIC Dataset.
       *
       * @async
       * @param {number} makeID - Vehicle make ID.
       * @returns {(Promise<GetVehicleTypesForMakeIdResponse>)} Api Response object.
       */GetVehicleTypesForMakeId(e){return s(this,void 0,void 0,(function*(){const r="GetVehicleTypesForMakeId",t=i(e);
/* Runtime typechecking */if("number"!==t)return Promise.reject(new Error(`GetVehicleTypesForMakeId, "makeId" argument is required and must be of type number, got: <${t}> ${e}`));
/* Build the 'default' query string to be appended to the URL*/const o=yield this.buildQueryString().catch(e=>Promise.reject(new Error(`${r}, Error building query string: ${e}`))),n=`${this.baseUrl}/${r}/${e}${o}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(n).then(e=>e).catch(e=>Promise.reject(new Error(`${r}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/GetVehicleVariableList
   * @category Actions
   * @description GetVehicleVariableList NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [GetVehicleVariableList](module-api_actions_GetVehicleVariableList.GetVehicleVariableList.html)
   * >
   * > **Types**
   * > - Type: [GetVehicleVariableListResponse](#GetVehicleVariableListResponse)
   * > - Type: [GetVehicleVariableListResults](#GetVehicleVariableListResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class Y extends d{constructor(e){super(e)}
/**
       * This provides a list of all the Vehicle related variables that are in the vPIC dataset.
       * - Information on the name, description and the type of the variable is provided.
       *
       * @async
       * @returns {(Promise<GetVehicleVariableListResponse>)} Api Response object.
       */GetVehicleVariableList(){return s(this,void 0,void 0,(function*(){const e="GetVehicleVariableList",r=yield this.buildQueryString().catch(r=>Promise.reject(new Error(`${e}, Error building query string: ${r}`))),t=`${this.baseUrl}/${e}${r}`
/* Return the result */;
/* Build the 'default' query string to be appended to the URL*/return yield this.get(t).then(e=>e).catch(r=>Promise.reject(new Error(`${e}, Fetch.get() error: ${r}`)))}))}}
/**
   * @module api/actions/GetVehicleVariableValuesList
   * @category Actions
   * @description GetVehicleVariableValuesList NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [GetVehicleVariableValuesList](module-api_actions_GetVehicleVariableValuesList.GetVehicleVariableValuesList.html)
   * >
   * > **Types**
   * > - Type: [GetVehicleVariableValuesListResponse](#GetVehicleVariableValuesListResponse)
   * > - Type: [GetVehicleVariableValuesListResults](#GetVehicleVariableValuesListResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class I extends d{constructor(e){super(e)}
/**
       * This provides a list of all the accepted values for a given variable that are stored in the vPIC dataset.
       *
       * This applies to only "Look up" type of variables.
       * - `variableValue` can either be a:
       *   - Variable Name ("battery type" in first example, please use full name, not just part of it),
       *   - or Variable ID (number).
       *
       * @async
       * @param {string|number} variableValue - The variable you want to get a values list of.
       * @returns {(Promise<GetVehicleVariableValuesListResponse>)} Api Response object.
       */GetVehicleVariableValuesList(e){return s(this,void 0,void 0,(function*(){const r="GetVehicleVariableValuesList",t=i(e);
/* Runtime typechecking */if("string"!==t&&"number"!==t)return Promise.reject(new Error(`GetVehicleVariableValuesList, "variableValue" argument is required and must be of type string or number, got: <${t}> ${e}`));
/* Encode to a valid URI string (space chars, etc.) if variableValue is a string*/"string"===t&&(e=encodeURI(e))
/* Build the 'default' query string to be appended to the URL*/;const o=yield this.buildQueryString().catch(e=>Promise.reject(new Error(`${r}, Error building query string: ${e}`))),n=`${this.baseUrl}/${r}/${e}${o}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(n).then(e=>e).catch(e=>Promise.reject(new Error(`${r}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/actions/GetWMIsForManufacturer
   * @category Actions
   * @description GetWMIsForManufacturer NHSTA Api Action.
   *
   * > **Module Exports**:
   * > - Class: [GetWMIsForManufacturer](module-api_actions_GetWMIsForManufacturer.GetWMIsForManufacturer.html)
   * >
   * > **Types**
   * > - Type: [GetWMIsForManufacturerResponse](#GetWMIsForManufacturerResponse)
   * > - Type: [GetWMIsForManufacturerResults](#GetWMIsForManufacturerResults)
   *
   */
/**
   * Implemented by [NHTSA](module-api_NHTSA-NHTSA.html).
   *
   * Extends [api/Fetch.Fetch](module-api_Fetch.Fetch.html).
   *
   * @category Actions
   * @param {FetchConfig} [userConfig] - User configuration options to construct the class with.
   */class x extends d{constructor(e){super(e)}
/**
       * Provides information on the World Manufacturer Identifier (WMI) for a specified `manufacturer`.
       * - Only WMIs registered in vPICList are displayed.
       * - `manufacturer` can be a partial name, or a full name for more specificity
       *   (e.g., "Merc", "Mercedes Benz", etc.).
       *
       * @async
       * @param {string|number} manufacturer - Manufacturer Name.
       * @returns {(Promise<GetWMIsForManufacturerResponse>)} Api Response object.
       */GetWMIsForManufacturer(e){return s(this,void 0,void 0,(function*(){const r="GetWMIsForManufacturer",t=i(e);
/* Runtime typechecking */if("string"!==t)return Promise.reject(new Error(`GetWMIsForManufacturer, "manufacturer" argument is required and must be of type string, got: <${t}> ${e}`));
/* Build the 'default' query string to be appended to the URL*/const o=yield this.buildQueryString().catch(e=>Promise.reject(new Error(`${r}, Error building query string: ${e}`))),n=`${this.baseUrl}/${r}/${e}${o}`
/* Return the result */;
/* Build the final request URL*/return yield this.get(n).then(e=>e).catch(e=>Promise.reject(new Error(`${r}, Fetch.get() error: ${e}`)))}))}}
/**
   * @module api/NHTSA
   * @category API
   * @description Module exporting the main (NHSTA) class for API Actions.
   *
   * > **Module Exports**:
   * > - Class: [NHTSA](NHTSA.html#NHTSA) - Class that implements all NHTSA API Actions
   */
/**
   * @class NHTSA
   * @augments module:api/Fetch.Fetch
   * @category API
   *
   * @param {FetchConfig} [userConfig] - Configuration options to construct the class with.
   *
   * @implements {module:api/actions/DecodeVin.DecodeVin}
   * @implements {module:api/actions/DecodeVinExtended.DecodeVinExtended}
   * @implements {module:api/actions/DecodeVinValues.DecodeVinValues}
   * @implements {module:api/actions/DecodeVinValuesExtended.DecodeVinValuesExtended}
   * @implements {module:api/actions/DecodeWMI.DecodeWMI}
   * @implements {module:api/actions/GetAllMakes.GetAllMakes}
   * @implements {module:api/actions/GetAllManufacturers.GetAllManufacturers}
   * @implements {module:api/actions/GetCanadianVehicleSpecifications.GetCanadianVehicleSpecifications}
   * @implements {module:api/actions/GetEquipmentPlantCodes.GetEquipmentPlantCodes}
   * @implements {module:api/actions/GetMakeForManufacturer.GetMakeForManufacturer}
   * @implements {module:api/actions/GetMakesForManufacturerAndYear.GetMakesForManufacturerAndYear}
   * @implements {module:api/actions/GetMakesForVehicleType.GetMakesForVehicleType}
   * @implements {module:api/actions/GetManufacturerDetails.GetManufacturerDetails}
   * @implements {module:api/actions/GetModelsForMake.GetModelsForMake}
   * @implements {module:api/actions/GetModelsForMakeId.GetModelsForMakeId}
   * @implements {module:api/actions/GetModelsForMakeIdYear.GetModelsForMakeIdYear}
   * @implements {module:api/actions/GetModelsForMakeYear.GetModelsForMakeYear}
   * @implements {module:api/actions/GetParts.GetParts}
   * @implements {module:api/actions/GetVehicleTypesForMake.GetVehicleTypesForMake}
   * @implements {module:api/actions/GetVehicleTypesForMakeId.GetVehicleTypesForMakeId}
   * @implements {module:api/actions/GetVehicleVariableList.GetVehicleVariableList}
   * @implements {module:api/actions/GetVehicleVariableValuesList.GetVehicleVariableValuesList}
   * @implements {module:api/actions/GetWMIsForManufacturer.GetWMIsForManufacturer}
   *
   * @example <caption>Node bundle</caption>
   * const { NHTSA } = require('@shaggytools/nhtsa-api-wrapper');
   *
   * const Wrapper = new NHTSA();
   *
   * // Decode a VIN and return a response of type ApiResponse
   * const response = Wrapper.DecodeVinValues('3VWD07AJ5EM388202').catch(error => error)
   *
   * // or get details about a specific manufacturer, plus 23 other available Actions.
   * const hondaDetails = Wrapper.GetManufacturerDetails('Honda').catch(error => error)
   *
   * @example <caption>Browser bundle</caption>
   *   // Change <version> to specific version number "x.x.xx",
   *   // or remove <version> completely for the most recently published version
   *   <script
   *     type="text/javascript"
   *     src="https://cdn.jsdelivr.net/npm/@shaggytools/nhtsa-api-wrapper/<version>/dist/bundle.min.js"
   *   ><\/script>
   *
   * <script type="text/javascript">
   * // NHSTA is the global browser window exported by this package
   * const Decoder = new NHSTA.NHSTA();
   *
   * const result = await Decoder.DecodeVin('3VWD07AJ5EM388202')
   *   .catch(err => err);
   * </script>
   *
   * @example <caption>Module - Node lazy loading</caption>
   * const { NHTSA } = await import('@shaggytools/nhtsa-api-wrapper/dist/module/index.js')
   *   .catch(err => err);
   *
   * const ApiClient = new NHTSA();
   *
   * const results = await ApiClient.DecodeVin('3VWD07AJ5EM388202')
   *   .catch(err => err)
   *
   * @example <caption>Module - Browser lazy loading</caption>
   * <script type="module">
   *   const { NHSTA } = await import('https://unpkg.com/@shaggytools/nhtsa-api-wrapper/dist/module/index.js')
   *    .catch(err => err);
   *
   *   const ApiClient = new NHSTA();
   *
   *   const { Results } = await ApiClient.DecodeVin('3VWD07AJ5EM388202')
   *    .catch(err => err)
   *
   *   console.log(Results)
   * </script>
   */class T extends d{constructor(e){super(e),this.DecodeVin=l.prototype.DecodeVin,this.DecodeVinExtended=m.prototype.DecodeVinExtended,this.DecodeVinValues=g.prototype.DecodeVinValues,this.DecodeVINValuesBatch=h.prototype.DecodeVINValuesBatch,this.DecodeVinValuesExtended=$.prototype.DecodeVinValuesExtended,this.DecodeWMI=p.prototype.DecodeWMI,this.GetAllMakes=y.prototype.GetAllMakes,this.GetAllManufacturers=b.prototype.GetAllManufacturers,this.GetCanadianVehicleSpecifications=f.prototype.GetCanadianVehicleSpecifications,this.GetEquipmentPlantCodes=E.prototype.GetEquipmentPlantCodes,this.GetMakeForManufacturer=j.prototype.GetMakeForManufacturer,this.GetMakesForManufacturerAndYear=M.prototype.GetMakesForManufacturerAndYear,this.GetMakesForVehicleType=G.prototype.GetMakesForVehicleType,this.GetManufacturerDetails=P.prototype.GetManufacturerDetails,this.GetModelsForMake=V.prototype.GetModelsForMake,this.GetModelsForMakeId=w.prototype.GetModelsForMakeId,this.GetModelsForMakeIdYear=F.prototype.GetModelsForMakeIdYear,this.GetModelsForMakeYear=v.prototype.GetModelsForMakeYear,this.GetParts=k.prototype.GetParts,this.GetVehicleTypesForMake=q.prototype.GetVehicleTypesForMake,this.GetVehicleTypesForMakeId=D.prototype.GetVehicleTypesForMakeId,this.GetVehicleVariableList=Y.prototype.GetVehicleVariableList,this.GetVehicleVariableValuesList=I.prototype.GetVehicleVariableValuesList,this.GetWMIsForManufacturer=x.prototype.GetWMIsForManufacturer}}
/**
   * @module api/Client
   * @category API
   * @description Module exporting an instance of the NHSTA class.
   *
   * > - For more information, see the documentation for the [NHTSA](module-api_NHTSA-NHTSA.html) class.
   */
/**
   * A new instance of the [NHTSA](module-api_NHTSA-NHTSA.html) class.
   *
   * @type {NHTSA}
   *
   * @example <caption>Node bundle</caption>
   * const { Client } = require('@shaggytools/nhtsa-api-wrapper');
   *
   * // Decode a VIN and return get a response of type ApiResponse
   * const response = Client.DecodeVinValues('3VWD07AJ5EM388202').catch(error => error)
   *
   * // or get details about a specific manufacturer, plus 23 other available Actions.
   * const audiDetails = Client.GetManufacturerDetails('Audi').catch(error => error)
   *
   * @example <caption>Browser bundle</caption>
   * // Change <version> to specific version number "x.x.xx",
   * // or remove <version> completely for the most recently published version
   * <script
   *   type="text/javascript"
   *   src="https://cdn.jsdelivr.net/npm/@shaggytools/nhtsa-api-wrapper/<version>/dist/bundle.min.js"
   * ><\/script>
   *
   * <script type="text/javascript">
   * // NHSTA is the global browser window exported by this package
   * const Decoder = NHSTA.Client
   *
   * const result = Decoder.DecodeVin('3VWD07AJ5EM388202')
   *   .catch(err => err);
   * </script>
   *
   * @example <caption>Module - Node lazy loading</caption>
   * const { Client } = await import('@shaggytools/nhtsa-api-wrapper/dist/module/index.js')
   *   .catch(err => err);
   *
   * const results = await Client.DecodeVin('3VWD07AJ5EM388202')
   *   .catch(err => err)
   *
   * @example <caption>Module - Browser lazy loading</caption>
   * <script type="module">
   * const { Client } = await import('https://unpkg.com/@shaggytools/nhtsa-api-wrapper/dist/module/index.js')
   *  .catch(err => err);
   *
   * const { Results } = await Client.DecodeVin('3VWD07AJ5EM388202')
   *    .catch(err => err)
   * </script>
   *
   */const S=new T;return e.ActionTypes=n,e.Client=S,e.DecodeVINValuesBatch=h,e.DecodeVin=l,e.DecodeVinExtended=m,e.DecodeVinValues=g,e.DecodeVinValuesExtended=$,e.DecodeWMI=p,e.Fetch=d,e.GetAllMakes=y,e.GetAllManufacturers=b,e.GetCanadianVehicleSpecifications=f,e.GetEquipmentPlantCodes=E,e.GetMakeForManufacturer=j,e.GetMakesForManufacturerAndYear=M,e.GetMakesForVehicleType=G,e.GetManufacturerDetails=P,e.GetModelsForMake=V,e.GetModelsForMakeId=w,e.GetModelsForMakeIdYear=F,e.GetModelsForMakeYear=v,e.GetParts=k,e.GetVehicleTypesForMake=q,e.GetVehicleTypesForMakeId=D,e.GetVehicleVariableList=Y,e.GetVehicleVariableValuesList=I,e.GetWMIsForManufacturer=x,e.NHTSA=T,e.isValidVin=
/**
   * Provides **offline** validation of Vehicle Identification Numbers (VINs) using the
   * [VIN Check Algorithm](https://en.wikibooks.org/wiki/Vehicle_Identification_Numbers_(VIN_codes)/Check_digit).
   *
   * @param {string} vin - Vehicle Identification Number.
   * @returns {boolean} True for a valid VIN, false for an invalid VIN.
   *
   * @example <caption>When loaded from the browser via html script tags</caption>
   * // <script type="text/javascript" src="https://www.npmjs.com/package/@shaggytools/nhtsa-api-wrapper"><\/script>
   * const isValid = NHTSA.isValidVin('3VWD07AJ5EM388202')
   * console.log(isValid) // true
   *
   * @example <caption>When loaded as a module</caption>
   * import { isValidVin } from '@shaggytools/nhtsa-api-wrapper'
   * const isValid = isValidVin('3VWD07AJ5EM388202')
   * console.log(isValid) // true
   *
   */
function(e){
/* A valid VIN must be a string and is always exactly 17 digits */
if("string"!=typeof e||17!=e.length)return!1;
/* Normalize the vin to all uppercase letters */
/* split the vin digits into an array */
const r=(e=e.toUpperCase()).split(""),t=r[8];
/* checkDigit will be tested against the checkSum later */
/*
       * In a valid VIN, the checkDigit can either be:
       * a number, 0-9 inclusive OR the character 'X'
       */
if(isNaN(parseInt(t))&&"X"!==t)return!1;
/*
       * The checkValue must be a digit and 'X' is the only valid alphabetic check value.
       * As per the algorithm, a checkDigit of 'X' is equal to a checkValue of `10` and needs
       * to be converted as such.
       */const o="X"===t?10:parseInt(t);
/*
       * Maps the vinArray and converts any values (digits) that are alphabetic,
       * into numbers, using the TRANSLITERATION_TABLE.
       * Then these numbers are multiplied against their corresponding weight
       * in the WEIGHTS_ARRAY, matched by index position.
       * All 17 of those digitValues are then added together and divided by 11.
       * The remainder, or % modulo, of that division will be the final 'checksum'.
       */
/*
       * The checksum is compared against the checkValue we set earlier (the 9th digit of the VIN)
       * As per the algorithm, if they are equal to each other, then the VIN must be valid and
       * we return true, otherwise the VIN is invalid and we return false.
       */
return r.map((e,r)=>{let t;
/* Use the transliteration table to convert any Not a Number(NaN) values to numbers */t=isNaN(parseInt(e))?a[e]:parseInt(e);
/* The final step for each digit is to multiply the digit by it's corresponding weight */
return t*c[r]})
/* Finally, get the sum of all digits and divide by 11, the remainder of that operation is the checksum */.reduce((e,r)=>e+r,0)%11===o},e}({},fetch);
//# sourceMappingURL=iife.js.map
