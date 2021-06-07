import{F as e,_ as r,g as t}from"./Fetch-44aa28fd.js";class i extends e{constructor(e){super(e)}GetCanadianVehicleSpecifications(e){return r(this,void 0,void 0,(function*(){const r="GetCanadianVehicleSpecifications",i=t(e);if("object"!==i)return Promise.reject(new Error(`GetCanadianVehicleSpecifications, "params" argument must be of type object, got: <${i}> ${e}`));const n=t(e.year);if("number"!==n)return Promise.reject(new Error(`GetCanadianVehicleSpecifications, "params.year" argument is required and must be of type number, got: <${n}> ${e.year}`));const a=t(e.make);if(e.make&&"string"!==a)return Promise.reject(new Error(`GetCanadianVehicleSpecifications, "params.make" argument must be of type string, got: <${a}> ${e.make}`));const s=t(e.model);if(e.model&&"string"!==s)return Promise.reject(new Error(`GetCanadianVehicleSpecifications, "params.model" argument must be of type string, got: <${s}> ${e.model}`));const o=t(e.units);if(e.units&&"string"!==o)return Promise.reject(new Error(`GetCanadianVehicleSpecifications, "params.units" argument must be of type string, got: <${o}> ${e.units}`));const c=e.make||"",m=e.model||"",u=e.units||"",d={year:e.year,make:c,model:m,units:u},g=yield this.buildQueryString(d,!0).catch(e=>Promise.reject(new Error(`${r}, Error building query string: ${e}`))),f=`${this.baseUrl}/${r}${g}`;return yield this.get(f).then(e=>e).catch(e=>Promise.reject(new Error(`${r}, Fetch.get() error: ${e}`)))}))}}export{i as GetCanadianVehicleSpecifications};
//# sourceMappingURL=GetCanadianVehicleSpecifications.js.map
