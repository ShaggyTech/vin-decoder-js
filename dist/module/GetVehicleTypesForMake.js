import{_ as e}from"./isValidVin-a63c6e15.js";import{F as r,g as t}from"./Fetch-3b3744ac.js";class i extends r{constructor(e){super(e)}GetVehicleTypesForMake(r){return e(this,void 0,void 0,(function*(){const e="GetVehicleTypesForMake",i=t(r);if("string"!==i)return Promise.reject(new Error(`${e}, "makeName" argument is required and must be of type string, got: `+`<${i}> ${r}`));const s=yield this.buildQueryString().catch(r=>Promise.reject(new Error(`${e}, Error building query string: ${r}`))),o=`${this.baseUrl}/${e}/${r}${s}`;return yield this.get(o).then(e=>e).catch(r=>Promise.reject(new Error(`${e}, Fetch.get() error: ${r}`)))}))}}export{i as GetVehicleTypesForMake};
//# sourceMappingURL=GetVehicleTypesForMake.js.map
