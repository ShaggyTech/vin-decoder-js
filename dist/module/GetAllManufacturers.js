import{F as r,_ as e,g as t}from"./Fetch-d5a8e004.js";class a extends r{constructor(r){super(r)}GetAllManufacturers(r={}){return e(this,void 0,void 0,(function*(){const e="GetAllManufacturers",a=t(r);if("object"!==a)return Promise.reject(new Error(`GetAllManufacturers, "params" argument must be of type object, got: <${a}> ${r}`));const n=t(r.manufacturerType);if(r.manufacturerType&&"string"!==n)return Promise.reject(new Error(`GetAllManufacturers, "params.manufacturerType" argument must be of type string, got: <${n}> ${r.manufacturerType}`));const u=t(r.page);if(r.page&&"number"!==u)return Promise.reject(new Error(`GetAllManufacturers, "params.page" argument must be of type number, got: <${u}> ${r.page}`));const s=yield this.buildQueryString(r).catch(r=>Promise.reject(new Error(`${e}, Error building query string: ${r}`))),o=`${this.baseUrl}/${e}${s}`;return yield this.get(o).then(r=>r).catch(r=>Promise.reject(new Error(`${e}, Fetch.get() error: ${r}`)))}))}}export{a as GetAllManufacturers};
//# sourceMappingURL=GetAllManufacturers.js.map
