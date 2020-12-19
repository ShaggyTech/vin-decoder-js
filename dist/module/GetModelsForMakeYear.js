import{F as e,_ as r,g as t}from"./Fetch-b3914c0a.js";class o extends e{constructor(e){super(e)}GetModelsForMakeYear(e){return r(this,void 0,void 0,(function*(){const r="GetModelsForMakeYear",o=null==e?void 0:e.make,s=null==e?void 0:e.modelYear,a=null==e?void 0:e.vehicleType,i=t(e);if("object"!==i)return Promise.reject(new Error(`GetModelsForMakeYear, "params" argument must be of type object, got: <${i}> ${e}`));const n=t(o);if("string"!==n)return Promise.reject(new Error(`GetModelsForMakeYear, "params.make" argument is required and must be of type string, got: <${n}> ${o}`));if(!s&&!a)return Promise.reject(new Error(`GetModelsForMakeYear, either one of "params.modelYear" or "params.vehicleType" is required, got: ${s} | ${a}`));const m=t(s);if(s&&"number"!==m)return Promise.reject(new Error(`GetModelsForMakeYear, "params.modelYear" must be of type number, got: <${m}> ${s}`));const c=t(a);if(a&&"string"!==c)return Promise.reject(new Error(`GetModelsForMakeYear, "params.vehicleType" must be of type string, got: <${c}> ${a}`));let l=`${r}/make/${e.make}/`;l+=s&&a?`modelYear/${s}/vehicleType/${a}`:s?"modelYear/"+s:"vehicleType/"+a;const u=yield this.buildQueryString().catch(e=>Promise.reject(new Error(`${r}, Error building query string: ${e}`))),d=`${this.baseUrl}/${l}${u}`;return yield this.get(d).then(e=>e).catch(e=>Promise.reject(new Error(`${r}, Fetch.get() error: ${e}`)))}))}}export{o as GetModelsForMakeYear};
//# sourceMappingURL=GetModelsForMakeYear.js.map
