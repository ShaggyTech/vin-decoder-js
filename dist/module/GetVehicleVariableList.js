import{F as e,_ as r}from"./Fetch-b3914c0a.js";class t extends e{constructor(e){super(e)}GetVehicleVariableList(){return r(this,void 0,void 0,(function*(){const e="GetVehicleVariableList",r=yield this.buildQueryString().catch(r=>Promise.reject(new Error(`${e}, Error building query string: ${r}`))),t=`${this.baseUrl}/${e}${r}`;return yield this.get(t).then(e=>e).catch(r=>Promise.reject(new Error(`${e}, Fetch.get() error: ${r}`)))}))}}export{t as GetVehicleVariableList};
//# sourceMappingURL=GetVehicleVariableList.js.map
