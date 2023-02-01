(function(c,s){typeof exports=="object"&&typeof module<"u"?s(exports):typeof define=="function"&&define.amd?define(["exports"],s):(c=typeof globalThis<"u"?globalThis:c||self,s(c.NHTSA={}))})(this,function(c){"use strict";const s=({args:e,mode:r="default"})=>{if(h(e)!=="array"&&!e.length)throw Error('catchInvalidArguments requires "args" that must be an array of IArgToValidate objects');if(r==="default")e.forEach(t=>{v(t)});else if(r==="atLeast"&&!e.find(n=>!!n.value))throw Error(`must provide at least one of the following arguments: ${e.map(n=>n.name).join(", ")}`)},v=({name:e,value:r,required:t,types:n,mode:o="error"})=>{if(h(e)!=="string")throw Error("'name', is required and must be of type string");const a=h(r);let g="";const u=`error validating argument named "${e}",`,$=`received value: ${r} - of type: <${a}>`;if(n&&h(n)!=="array"&&!n.length)throw Error(`${u} 'types' must be an array of strings`);const m=n?`<${n.join(" | ")}>`:"";if(t&&!n?r||(g=`${u} is required, ${$}`):n&&!t?r&&!n.includes(a)&&(g=`${u} must be of type(s) ${m}, ${$}`):t&&n&&(!r||!n.includes(a))&&(g=`${u} is required and must be of type(s) ${m}, ${$}`),g.length){if(o==="boolean")return!1;if(o==="error")throw Error(g)}return!0},M=e=>h(e)==="error",b=e=>{let r="an unknown error occurred.";return M(e)?e:(h(e)==="string"&&(r=e),Error(r))},i=async e=>(M(e)||(e=b(e)),Promise.reject(e)),h=e=>{const r=Object.prototype.toString.call(e).toLowerCase();return r.slice(8,r.length-1)},q={A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,J:1,K:2,L:3,M:4,N:5,P:7,R:9,S:2,T:3,U:4,V:5,W:6,X:7,Y:8,Z:9},G=[8,7,6,5,4,3,2,10,0,9,8,7,6,5,4,3,2];function p(e){if(typeof e!="string"||e.length!=17)return!1;e=e.toUpperCase();const r=e.split(""),t=r[8];if(isNaN(parseInt(t))&&t!=="X")return!1;const n=t==="X"?10:parseInt(t);return r.map((a,g)=>{let u;isNaN(parseInt(a))?u=q[a]:u=parseInt(a);const $=G[g];return u*$}).reduce((a,g)=>a+g,0)%11===n}const l=()=>{const e=async(t,n={})=>await fetch(t,n).then(async a=>{if(!a.ok)throw Error(`${a.status} ${a.url}`);const g=["application/json","text/json"],u=a.headers.get("content-type");if(!g.some(Q=>u==null?void 0:u.includes(Q)))throw Error(`API response is not in JSON format; got content-type: ${u}, responseStatus: ${a.status}}, responseUrl: ${a.url}`);const m=await a.json();if(!m)throw Error(`API responded but returned no data; got content-type: ${u}, responseStatus: ${a.status}}, responseUrl: ${a.url}`);return m}).catch(a=>(a.message=`API error fetching data: ${a.message}`,i(a)));return{get:e,post:async(t,n={})=>await e(t,{...n,method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"}})}},d="https://vpic.nhtsa.dot.gov/api/vehicles",V="json",y=(e,r=!1)=>{const t={format:V},n=h(e)==="object"?{...e,...t}:t;return"?"+Object.entries(f(n)).map(([a,g],u,$)=>g.length||r&&g===""?`${a}=${g}${u<$.length-1?"&":""}`:"").join("")},f=e=>Object.entries(e).filter(([r,t])=>v({name:r,types:["string","number","boolean"],value:t,mode:"boolean"})).reduce((r,[t,n])=>(r[t]=encodeURIComponent(n),r),{}),k=async(e,r)=>{const t="DecodeVin";try{const n=[{name:"vin",value:e,required:!0,types:["string"]},{name:"params",value:r,types:["object"]},{name:"modelYear",value:r==null?void 0:r.modelYear,types:["string","number"]}];s({args:n});const o=y(r),a=`${d}/${t}/${e}${o}`;return await l().get(a)}catch(n){return i(n)}},S=async(e,r)=>{const t="DecodeVinExtended";try{const n=[{name:"vin",value:e,required:!0,types:["string"]},{name:"params",value:r,types:["object"]},{name:"modelYear",value:r==null?void 0:r.modelYear,types:["string","number"]}];s({args:n});const o=y(r),a=`${d}/${t}/${e}${o}`;return await l().get(a)}catch(n){return i(n)}},T=async(e,r)=>{const t="DecodeVinValues";try{const n=[{name:"vin",value:e,required:!0,types:["string"]},{name:"params",value:r,types:["object"]},{name:"modelYear",value:r==null?void 0:r.modelYear,types:["string","number"]}];s({args:n});const o=y(r),a=`${d}/${t}/${e}${o}`;return await l().get(a)}catch(n){return i(n)}},w=async e=>{const r="DecodeVinValuesBatch";try{s({args:[{name:"inputString",value:e,required:!0,types:["string"]}]});const n=`${d}/${r}/`,o=encodeURI(`DATA=${e}&format=${V}`);return await l().post(n,{body:o})}catch(t){return i(t)}},N=async(e,r)=>{const t="DecodeVinValuesExtended";try{const n=[{name:"vin",value:e,required:!0,types:["string"]},{name:"params",value:r,types:["object"]},{name:"modelYear",value:r==null?void 0:r.modelYear,types:["string","number"]}];s({args:n});const o=y(r),a=`${d}/${t}/${e}${o}`;return await l().get(a)}catch(n){return i(n)}},I=async e=>{const r="DecodeWMI";try{s({args:[{name:"WMI",value:e,required:!0,types:["string"]}]});const n=y(),o=`${d}/${r}/${e}${n}`;return await l().get(o)}catch(t){return i(t)}},A=async()=>{const e="GetAllMakes";try{const r=y(),t=`${d}/${e}${r}`;return await l().get(t)}catch(r){return i(r)}},F=async e=>{const r="GetAllManufacturers";try{const t=[{name:"params",value:e,types:["object"]},{name:"manufacturerType",value:e==null?void 0:e.manufacturerType,types:["string"]},{name:"page",value:e==null?void 0:e.page,types:["string","number"]}];s({args:t});const n=y(e),o=`${d}/${r}${n}`;return await l().get(o)}catch(t){return i(t)}},j=async e=>{const r="GetCanadianVehicleSpecifications";try{const t=[{name:"params",value:e,required:!0,types:["object"]},{name:"year",value:e.year,required:!0,types:["string","number"]},{name:"make",value:e.make,types:["string"]},{name:"model",value:e.model,types:["string"]},{name:"units",value:e.units,types:["string"]}];s({args:t});const n=y({make:"",model:"",units:"",...e},!0),o=`${d}/${r}/${n}`;return await l().get(o)}catch(t){return i(t)}},E=async e=>{const r="GetEquipmentPlantCodes";try{const t=[{name:"params",value:e,required:!0,types:["object"]},{name:"year",value:e.year,required:!0,types:["string","number"]},{name:"equipmentType",value:e.equipmentType,required:!0,types:["string","number"]},{name:"reportType",value:e.reportType,required:!0,types:["string"]}];s({args:t});const n=y(e),o=`${d}/${r}${n}`;return await l().get(o)}catch(t){return i(t)}},D=async e=>{const r="GetMakeForManufacturer";try{s({args:[{name:"manufacturer",value:e,required:!0,types:["string","number"]}]});const n=y(),o=`${d}/${r}/${e}${n}`;return await l().get(o)}catch(t){return i(t)}},Y=async(e,r)=>{const t="GetMakesForManufacturerAndYear";try{const n=[{name:"manufacturer",value:e,required:!0,types:["string","number"]},{name:"params",value:r,required:!0,types:["object"]},{name:"year",value:r.year,required:!0,types:["string","number"]}];s({args:n});const o=y(r),a=`${d}/${t}/${e}${o}`;return await l().get(a)}catch(n){return i(n)}},L=async e=>{const r="GetMakesForVehicleType";try{s({args:[{name:"typeName",value:e,required:!0,types:["string"]}]});const n=y(),o=`${d}/${r}/${e}${n}`;return await l().get(o)}catch(t){return i(t)}},P=async e=>{const r="GetManufacturerDetails";try{s({args:[{name:"manufacturer",value:e,required:!0,types:["string","number"]}]});const n=y(),o=`${d}/${r}/${e}${n}`;return await l().get(o)}catch(t){return i(t)}},R=async e=>{const r="GetModelsForMake";try{s({args:[{name:"makeName",value:e,required:!0,types:["string"]}]});const n=y(),o=`${d}/${r}/${e}${n}`;return await l().get(o)}catch(t){return i(t)}},O=async e=>{const r="GetModelsForMakeId";try{s({args:[{name:"makeId",value:e,required:!0,types:["string","number"]}]});const n=y(),o=`${d}/${r}/${e}${n}`;return await l().get(o)}catch(t){return i(t)}},C=async e=>{const r="GetModelsForMakeIdYear";try{const t=[{name:"modelYear",value:e.modelYear,types:["string","number"]},{name:"vehicleType",value:e.vehicleType,types:["string"]}],n=[{name:"params",value:e,required:!0,types:["object"]},{name:"makeId",value:e.makeId,required:!0,types:["string"]},...t];s({args:n}),s({args:t,mode:"atLeast"});const{makeId:o,modelYear:a,vehicleType:g}=f(e);let u=`${d}/${r}/make/${o}/`;return a&&(u+=`modelYear/${a}`),g&&(u+=`${a?"/":""}vehicleType/${g}`),u+=y(),await l().get(u)}catch(t){return i(t)}},W=async e=>{const r="GetModelsForMakeYear";try{const t=[{name:"modelYear",value:e.modelYear,types:["string","number"]},{name:"vehicleType",value:e.vehicleType,types:["string"]}],n=[{name:"params",value:e,required:!0,types:["object"]},{name:"make",value:e.make,required:!0,types:["string"]},...t];s({args:n}),s({args:t,mode:"atLeast"});const{make:o,modelYear:a,vehicleType:g}=f(e);let u=`${d}/${r}/make/${o}/`;return a&&(u+=`modelYear/${a}`),g&&(u+=`${a?"/":""}vehicleType/${g}`),u+=y(),await l().get(u)}catch(t){return i(t)}},U=async e=>{const r="GetParts";try{const t=[{name:"params",value:e,types:["object"]},{name:"type",value:e==null?void 0:e.type,types:["string","number"]},{name:"fromDate",value:e==null?void 0:e.fromDate,types:["string"]},{name:"toDate",value:e==null?void 0:e.toDate,types:["string"]},{name:"page",value:e==null?void 0:e.page,types:["string","number"]}];s({args:t});const n=y(e),o=`${d}/${r}${n}`;return await l().get(o)}catch(t){return i(t)}},_=async e=>{const r="GetVehicleTypesForMake";try{s({args:[{name:"makeName",value:e,required:!0,types:["string"]}]});const n=y(),o=`${d}/${r}/${e}${n}`;return await l().get(o)}catch(t){return i(t)}},B=async e=>{const r="GetVehicleTypesForMakeId";try{s({args:[{name:"makeId",value:e,required:!0,types:["string","number"]}]});const n=y(),o=`${d}/${r}/${e}${n}`;return await l().get(o)}catch(t){return i(t)}},H=async()=>{const e="GetVehicleVariableList";try{const r=y(),t=`${d}/${e}${r}`;return await l().get(t)}catch(r){return i(r)}},J=async e=>{const r="GetVehicleVariableValuesList";try{s({args:[{name:"variableValue",value:e,required:!0,types:["string","number"]}]});const n=y(),o=`${d}/${r}/${e}${n}`;return await l().get(o)}catch(t){return i(t)}},X=async e=>{const r="GetWMIsForManufacturer";try{const t=[{name:"manufacturer",value:e==null?void 0:e.manufacturer,types:["string","number"]},{name:"vehicleType",value:e==null?void 0:e.vehicleType,types:["string","number"]}],n=[{name:"params",value:e,types:["object"]},...t];s({args:n}),s({args:t,mode:"atLeast"});const o=e!=null&&e.manufacturer?encodeURIComponent(e.manufacturer):"",a=(e==null?void 0:e.vehicleType)||"",g=y({vehicleType:a}),u=`${d}/${r}/${o}${g}`;return await l().get(u)}catch(t){return i(t)}};c.DecodeVin=k,c.DecodeVinExtended=S,c.DecodeVinValues=T,c.DecodeVinValuesBatch=w,c.DecodeVinValuesExtended=N,c.DecodeWMI=I,c.GetAllMakes=A,c.GetAllManufacturers=F,c.GetCanadianVehicleSpecifications=j,c.GetEquipmentPlantCodes=E,c.GetMakeForManufacturer=D,c.GetMakesForManufacturerAndYear=Y,c.GetMakesForVehicleType=L,c.GetManufacturerDetails=P,c.GetModelsForMake=R,c.GetModelsForMakeId=O,c.GetModelsForMakeIdYear=C,c.GetModelsForMakeYear=W,c.GetParts=U,c.GetVehicleTypesForMake=_,c.GetVehicleTypesForMakeId=B,c.GetVehicleVariableList=H,c.GetVehicleVariableValuesList=J,c.GetWMIsForManufacturer=X,c.isValidVin=p,Object.defineProperty(c,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=nhtsa-api-wrapper.umd.js.map
