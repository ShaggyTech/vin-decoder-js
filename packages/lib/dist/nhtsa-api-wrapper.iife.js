var NHTSA=function(u){"use strict";const l=({args:e,mode:t="default"})=>{if(f(e)!=="array"&&!e.length)throw Error('catchInvalidArguments requires "args" that must be an array of IArgToValidate objects');if(t==="default")e.forEach(n=>{b(n)});else if(t==="atLeast"&&!e.find(r=>!!r.value))throw Error(`must provide at least one of the following arguments: ${e.map(r=>r.name).join(", ")}`)},b=({name:e,value:t,required:n,types:r,errorMode:c="error"})=>{if(f(e)!=="string")throw Error("'name', is required and must be of type string");let o="";const a=f(t),s=`error validating argument named "${e}",`,i=`received value: ${t} - of type: <${a}>`;if(r&&f(r)!=="array"&&!r.length)throw Error(`${s} 'types' must be an array of strings`);const h=r?`<${r.join(" | ")}>`:"";if(n&&!r?t||(o=`${s} is required, ${i}`):r&&!n?t!==void 0&&!r.includes(a)&&(o=`${s} must be of type(s) ${h}, ${i}`):n&&r&&(!t||!r.includes(a))&&(o=`${s} is required and must be of type(s) ${h}, ${i}`),o.length){if(c==="boolean")return!1;throw Error(o)}return!0},p=e=>f(e)==="error",T=e=>{let t="an unknown error occurred.";return p(e)?e:(f(e)==="string"&&(t=e),Error(t))},d=async e=>(p(e)||(e=T(e)),Promise.reject(e)),f=e=>{const t=Object.prototype.toString.call(e).toLowerCase();return t.slice(8,t.length-1)},q={A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,J:1,K:2,L:3,M:4,N:5,P:7,R:9,S:2,T:3,U:4,V:5,W:6,X:7,Y:8,Z:9},$=[8,7,6,5,4,3,2,10,0,9,8,7,6,5,4,3,2];function A(e){if(typeof e!="string"||e.length!=17)return!1;e=e.toUpperCase();const t=e.split(""),n=t[8];if(isNaN(parseInt(n))&&n!=="X")return!1;const r=n==="X"?10:parseInt(n);return t.map((o,a)=>{let s;isNaN(parseInt(o))?s=q[o]:s=parseInt(o);const i=$[a];return s*i}).reduce((o,a)=>o+a,0)%11===r}const C="https://vpic.nhtsa.dot.gov/api/vehicles",V="json",N=(e={},t=!1)=>{b({name:"params",value:e,types:["object"]});const n=U({...e,format:V});return"?"+Object.entries(n).map(([r,c],o,a)=>c.length||t&&c===""?`${r}=${c}${o<a.length-1?"&":""}`:"").join("")},U=e=>Object.entries(e).filter(([n,r])=>b({name:n,types:["string","number","boolean"],value:r,errorMode:"boolean"})).reduce((n,[r,c])=>(n[r]=encodeURIComponent(c),n),{});async function I(e,t,n=!0){const r="DecodeVin";try{typeof t=="boolean"&&(n=t,t=void 0);const c=[{name:"vin",value:e,required:!0,types:["string"]},{name:"params",value:t,types:["object"]},{name:"modelYear",value:t==null?void 0:t.modelYear,types:["string","number"]}];l({args:c});const{get:o,cacheUrl:a,getCachedUrl:s}=g();return a({endpointName:r,path:e,params:t}),n?o():s()}catch(c){return d(c)}}async function j(e,t,n=!0){const r="DecodeVinExtended";typeof t=="boolean"&&(n=t,t=void 0);try{const c=[{name:"vin",value:e,required:!0,types:["string"]},{name:"params",value:t,types:["object"]},{name:"modelYear",value:t==null?void 0:t.modelYear,types:["string","number"]}];l({args:c});const{get:o,cacheUrl:a,getCachedUrl:s}=g();return a({endpointName:r,path:e,params:t}),n?o():s()}catch(c){return d(c)}}const E=async(e,t,n=!0)=>{const r="DecodeVinValues";typeof t=="boolean"&&(n=t,t=void 0);try{const c=[{name:"vin",value:e,required:!0,types:["string"]},{name:"params",value:t,types:["object"]},{name:"modelYear",value:t==null?void 0:t.modelYear,types:["string","number"]}];l({args:c});const{get:o,cacheUrl:a,getCachedUrl:s}=g();return a({endpointName:r,path:e,params:t}),n?o():s()}catch(c){return d(c)}},S=async(e,t=!0)=>{const n="DecodeVinValuesBatch";try{l({args:[{name:"inputString",value:e,required:!0,types:["string"]}]});const{post:c,cacheUrl:o,getCachedUrl:a}=g();return o({endpointName:n,includeQueryString:!1}),t?c(a(),{body:e}):a()}catch(r){return d(r)}},D=async(e,t,n=!0)=>{const r="DecodeVinValuesExtended";typeof t=="boolean"&&(n=t,t=void 0);try{const c=[{name:"vin",value:e,required:!0,types:["string"]},{name:"params",value:t,types:["object"]},{name:"modelYear",value:t==null?void 0:t.modelYear,types:["string","number"]}];l({args:c});const{get:o,cacheUrl:a,getCachedUrl:s}=g();return a({endpointName:r,path:e,params:t}),n?o():s()}catch(c){return d(c)}},Y=async(e,t=!0)=>{const n="DecodeWMI";try{l({args:[{name:"WMI",value:e,required:!0,types:["string"]}]});const{get:c,cacheUrl:o,getCachedUrl:a}=g();return o({endpointName:n,path:e}),t?c():a()}catch(r){return d(r)}},F=async(e=!1)=>{const t="GetAllMakes";try{const{get:n,cacheUrl:r,getCachedUrl:c}=g();return r({endpointName:t}),e?n():c()}catch(n){return d(n)}},w=async(e,t=!0)=>{const n="GetAllManufacturers";typeof e=="boolean"&&(t=e,e=void 0);try{const r=[{name:"params",value:e,types:["object"]},{name:"manufacturerType",value:e==null?void 0:e.manufacturerType,types:["string"]},{name:"page",value:e==null?void 0:e.page,types:["string","number"]}];l({args:r});const{get:c,cacheUrl:o,getCachedUrl:a}=g();return o({endpointName:n,params:e}),t?c():a()}catch(r){return d(r)}},P=async(e,t=!0)=>{const n="GetCanadianVehicleSpecifications";try{const r=[{name:"params",value:e,required:!0,types:["object"]},{name:"year",value:e.year,required:!0,types:["string","number"]},{name:"make",value:e.make,types:["string"]},{name:"model",value:e.model,types:["string"]},{name:"units",value:e.units,types:["string"]}];l({args:r});const{get:c,cacheUrl:o,getCachedUrl:a}=g();return o({endpointName:n,params:{make:"",model:"",units:"",...e},allowEmptyParams:!0}),t?c():a()}catch(r){return d(r)}},L=async(e,t=!0)=>{const n="GetEquipmentPlantCodes";try{const r=[{name:"params",value:e,required:!0,types:["object"]},{name:"year",value:e.year,required:!0,types:["string","number"]},{name:"equipmentType",value:e.equipmentType,required:!0,types:["string","number"]},{name:"reportType",value:e.reportType,required:!0,types:["string"]}];l({args:r});const{get:c,cacheUrl:o,getCachedUrl:a}=g();return o({endpointName:n,params:e}),t?c():a()}catch(r){return d(r)}},R=async(e,t=!0)=>{const n="GetMakeForManufacturer";try{l({args:[{name:"manufacturer",value:e,required:!0,types:["string","number"]}]});const{get:c,cacheUrl:o,getCachedUrl:a}=g();return o({endpointName:n,path:e.toString()}),t?c():a()}catch(r){return d(r)}},O=async(e,t,n=!0)=>{const r="GetMakesForManufacturerAndYear";try{const c=[{name:"manufacturer",value:e,required:!0,types:["string","number"]},{name:"params",value:t,required:!0,types:["object"]},{name:"year",value:t.year,required:!0,types:["string","number"]}];l({args:c});const{get:o,cacheUrl:a,getCachedUrl:s}=g();return a({endpointName:r,path:e.toString(),params:t}),n?o():s()}catch(c){return d(c)}},_=async(e,t=!0)=>{const n="GetMakesForVehicleType";try{l({args:[{name:"typeName",value:e,required:!0,types:["string"]}]});const{get:c,cacheUrl:o,getCachedUrl:a}=g();return o({endpointName:n,path:e}),t?c():a()}catch(r){return d(r)}},W=async(e,t=!0)=>{const n="GetManufacturerDetails";try{l({args:[{name:"manufacturer",value:e,required:!0,types:["string","number"]}]});const{get:c,cacheUrl:o,getCachedUrl:a}=g();return o({endpointName:n,path:e.toString()}),t?c():a()}catch(r){return d(r)}},B=async(e,t=!0)=>{const n="GetModelsForMake";try{l({args:[{name:"makeName",value:e,required:!0,types:["string"]}]});const{get:c,cacheUrl:o,getCachedUrl:a}=g();return o({endpointName:n,path:e}),t?c():a()}catch(r){return d(r)}},H=async(e,t=!0)=>{const n="GetModelsForMakeId";try{l({args:[{name:"makeId",value:e,required:!0,types:["string","number"]}]});const{get:c,cacheUrl:o,getCachedUrl:a}=g();return o({endpointName:n,path:e.toString()}),t?c():a()}catch(r){return d(r)}},J=async(e,t=!0)=>{const n="GetModelsForMakeIdYear";try{const r=[{name:"modelYear",value:e.modelYear,types:["string","number"]},{name:"vehicleType",value:e.vehicleType,types:["string"]}],c=[{name:"params",value:e,required:!0,types:["object"]},{name:"makeId",value:e.makeId,required:!0,types:["string"]},...r];l({args:c}),l({args:r,mode:"atLeast"});const{makeId:o,modelYear:a,vehicleType:s}=U(e);let i=`/make/${o}/`;i+=a?`modelYear/${a}`:"",i+=s?`${a?"/":""}vehicleType/${s}/`:"";const{get:h,cacheUrl:y,getCachedUrl:v}=g();return y({endpointName:n,path:i}),t?h():v()}catch(r){return d(r)}},Q=async(e,t=!0)=>{const n="GetModelsForMakeYear";try{const r=[{name:"modelYear",value:e.modelYear,types:["string","number"]},{name:"vehicleType",value:e.vehicleType,types:["string"]}],c=[{name:"params",value:e,required:!0,types:["object"]},{name:"make",value:e.make,required:!0,types:["string"]},...r];l({args:c}),l({args:r,mode:"atLeast"});const{make:o,modelYear:a,vehicleType:s}=U(e);let i=`/make/${o}/`;i+=a?`modelYear/${a}`:"",i+=s?`${a?"/":""}vehicleType/${s}/`:"";const{get:h,cacheUrl:y,getCachedUrl:v}=g();return y({endpointName:n,path:i}),t?h():v()}catch(r){return d(r)}},X=async(e,t=!0)=>{const n="GetParts";typeof e=="boolean"&&(t=e,e=void 0);try{const r=[{name:"params",value:e,types:["object"]},{name:"type",value:e==null?void 0:e.type,types:["string","number"]},{name:"fromDate",value:e==null?void 0:e.fromDate,types:["string"]},{name:"toDate",value:e==null?void 0:e.toDate,types:["string"]},{name:"page",value:e==null?void 0:e.page,types:["string","number"]}];l({args:r});const{get:c,cacheUrl:o,getCachedUrl:a}=g();return o({endpointName:n,params:e}),t?c():a()}catch(r){return d(r)}},K=async(e,t=!0)=>{const n="GetVehicleTypesForMake";try{l({args:[{name:"makeName",value:e,required:!0,types:["string"]}]});const{get:c,cacheUrl:o,getCachedUrl:a}=g();return o({endpointName:n,path:e}),t?c():a()}catch(r){return d(r)}},Z=async(e,t=!0)=>{const n="GetVehicleTypesForMakeId";try{l({args:[{name:"makeId",value:e,required:!0,types:["string","number"]}]});const{get:c,cacheUrl:o,getCachedUrl:a}=g();return o({endpointName:n,path:e.toString()}),t?c():a()}catch(r){return d(r)}},z=async(e=!0)=>{const t="GetVehicleVariableList";try{const{get:n,cacheUrl:r,getCachedUrl:c}=g();return r({endpointName:t}),e?n():c()}catch(n){return d(n)}},x=async(e,t=!0)=>{const n="GetVehicleVariableValuesList";try{l({args:[{name:"variableValue",value:e,required:!0,types:["string","number"]}]});const{get:c,cacheUrl:o,getCachedUrl:a}=g();return o({endpointName:n,path:e.toString()}),t?c():a()}catch(r){return d(r)}},ee=async(e,t=!0)=>{const n="GetWMIsForManufacturer";try{const r=[{name:"manufacturer",value:e==null?void 0:e.manufacturer,types:["string","number"]},{name:"vehicleType",value:e==null?void 0:e.vehicleType,types:["string","number"]}],c=[{name:"params",value:e,required:!0,types:["object"]},...r];l({args:c}),l({args:r,mode:"atLeast"});const o=e!=null&&e.manufacturer?encodeURIComponent(e.manufacturer):"",a=(e==null?void 0:e.vehicleType)||"",{get:s,cacheUrl:i,getCachedUrl:h}=g();return i({endpointName:n,path:o,params:{vehicleType:a}}),t?s():h()}catch(r){return d(r)}},g=()=>{let e;const t=()=>e,n=s=>encodeURI(`DATA=${s}&format=${V}`),r=({endpointName:s,allowEmptyParams:i=!1,includeQueryString:h=!0,path:y="",params:v,saveUrl:m=!0})=>{if(!s)throw Error("Endpoint name is required to create a VPIC URL string");const G=h?N(v,i):"",M=encodeURI(`${C}/${s}/${y}${G}`);return m&&(e=M),M},c=s=>r({...s,saveUrl:!1}),o=async(s,i={saveUrl:!0})=>(s&&f(s)==="object"&&(s=r({...s,saveUrl:i.saveUrl})),s=f(s)==="string"?s:t(),l({args:[{name:"url",value:s,required:!0,types:["string"]},{name:"options",value:i,types:["object"]}]}),i.saveUrl&&(e=s),await fetch(s,i).then(async y=>{if(!y)throw Error("APi responded with an error, no response object returned");const v=y.headers.get("content-type"),m=`content-type: ${v},responseStatus: ${y.status},responseUrl: ${y.url}`;if(!y.ok)throw Error(`APi responded with an error, got ${m}`);if(!["application/json","text/json"].some(te=>v==null?void 0:v.includes(te)))throw Error(`API response is not in JSON format, got ${m}`);const k=await y.json();if(k)return k;throw Error(`API response OK but returned no data, got ${m}`)}).catch(y=>(y.message=`There was an error fetching API data: ${y.message}`,d(y))));return{getCachedUrl:t,cacheUrl:r,createUrl:c,createPostBody:n,get:o,post:async(s,i={saveUrl:!0})=>(s&&f(s)==="object"&&(s=r({...s,saveUrl:i.saveUrl,includeQueryString:!1})),s=f(s)==="string"?s:t(),l({args:[{name:"url",value:s,required:!0,types:["string"]},{name:"options",value:i,types:["object"]},{name:"options.body",value:i.body,types:["string"]}]}),await o(s,{...i,method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:n(i.body)}))}};return u.DecodeVin=I,u.DecodeVinExtended=j,u.DecodeVinValues=E,u.DecodeVinValuesBatch=S,u.DecodeVinValuesExtended=D,u.DecodeWMI=Y,u.GetAllMakes=F,u.GetAllManufacturers=w,u.GetCanadianVehicleSpecifications=P,u.GetEquipmentPlantCodes=L,u.GetMakeForManufacturer=R,u.GetMakesForManufacturerAndYear=O,u.GetMakesForVehicleType=_,u.GetManufacturerDetails=W,u.GetModelsForMake=B,u.GetModelsForMakeId=H,u.GetModelsForMakeIdYear=J,u.GetModelsForMakeYear=Q,u.GetParts=X,u.GetVehicleTypesForMake=K,u.GetVehicleTypesForMakeId=Z,u.GetVehicleVariableList=z,u.GetVehicleVariableValuesList=x,u.GetWMIsForManufacturer=ee,u.isValidVin=A,u.useNHTSA=g,Object.defineProperty(u,Symbol.toStringTag,{value:"Module"}),u}({});
//# sourceMappingURL=nhtsa-api-wrapper.iife.js.map
