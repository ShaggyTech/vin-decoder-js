const o = async (e) => Promise.reject(Error(e));
function u(e) {
  const t = Object.prototype.toString.call(e).toLowerCase();
  return t.slice(8, t.length - 1);
}
const w = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  P: 7,
  R: 9,
  S: 2,
  T: 3,
  U: 4,
  V: 5,
  W: 6,
  X: 7,
  Y: 8,
  Z: 9
}, Y = [
  8,
  7,
  6,
  5,
  4,
  3,
  2,
  10,
  0,
  9,
  8,
  7,
  6,
  5,
  4,
  3,
  2
];
function V(e) {
  if (typeof e != "string" || e.length != 17)
    return !1;
  e = e.toUpperCase();
  const t = e.split(""), n = t[8];
  if (isNaN(parseInt(n)) && n !== "X")
    return !1;
  const i = n === "X" ? 10 : parseInt(n);
  return t.map((r, s) => {
    let g;
    isNaN(parseInt(r)) ? g = w[r] : g = parseInt(r);
    const $ = Y[s];
    return g * $;
  }).reduce((r, s) => r + s, 0) % 11 === i;
}
const f = "https://vpic.nhtsa.dot.gov/api/vehicles", T = "json";
function l(e, t = !1) {
  const n = { format: T };
  let i = {};
  !e || u(e) !== "object" ? i = { ...n } : i = { ...e, ...n };
  const c = Object.entries(i), r = c.length;
  if (r < 1)
    return Promise.resolve("");
  let s = !1;
  const g = c.map(([$, y], h) => {
    let b = "", a = "";
    const q = u(y);
    if (y && q === "number" && (y = y.toString()), (y || t) && (q === "string" || q === "number"))
      return s || (b = "?", s = !0), h < r - 1 && (a = "&"), `${b}${$}=${y}${a}`;
  });
  return Promise.resolve(encodeURI(g.join("")));
}
const d = () => ({
  get: async (t, n = {}) => await fetch(t, n).then(async (c) => {
    var g;
    const s = ((g = c.headers.get("content-type")) == null ? void 0 : g.includes("application/json")) ? await c.json() : null;
    if (!c.ok) {
      const $ = s && s.Message || c.status;
      return Promise.reject($);
    }
    return s;
  }).catch(
    (c) => Promise.reject(Error(`Error fetching data: ${c}`))
  )
}), m = async (e, t) => {
  const n = "DecodeVin", i = u(e);
  if (!e || i !== "string")
    return o(
      `${n}, "vin" argument is required and must be of type string, got: <${i}> ${e}`
    );
  const c = u(t);
  if (t && c !== "object")
    return o(
      `${n}, "params" argument must be of type object, got: <${c}> ${t}`
    );
  const r = u(t == null ? void 0 : t.modelYear);
  if (t != null && t.modelYear && r !== "number")
    return o(
      `${n}, "params.modelYear" must be of type string or number, got: <${r}> ${t.modelYear}`
    );
  const s = await l(t).catch(
    ($) => o(`${n}, error building query string: ${$}`)
  ), g = `${f}/${n}/${e}${s}`;
  return await d().get(g).then(($) => $).catch(($) => o(`${n}, error fetching data: ${$}`));
}, k = async (e, t) => {
  const n = "DecodeVinExtended", i = u(e);
  if (!e || i !== "string")
    return o(
      `${n}, "vin" argument is required and must be of type string, got: <${i}> ${e}`
    );
  const c = u(t);
  if (t && c !== "object")
    return o(
      `${n}, "params" argument must be of type object, got: <${c}> ${t}`
    );
  const r = u(t == null ? void 0 : t.modelYear);
  if (t != null && t.modelYear && r !== "number")
    return o(
      `${n}, "params.modelYear" must be of type number or string, got: <${r}> ${t.modelYear}`
    );
  const s = await l(t).catch(
    ($) => o(`${n}, error building query string: ${$}`)
  ), g = `${f}/${n}/${e}${s}`;
  return await d().get(g).then(($) => $).catch(($) => o(`${n}, error fetching data: ${$}`));
}, S = async (e, t) => {
  const n = "DecodeVinValues", i = u(e);
  if (!e || i !== "string")
    return o(
      `${n}, "vin" argument is required and must be of type string, got: <${i}> ${e}`
    );
  const c = u(t);
  if (t && c !== "object")
    return o(
      `${n}, "params" argument must be of type object, got: <${c}> ${t}`
    );
  const r = u(t == null ? void 0 : t.modelYear);
  if (t != null && t.modelYear && r !== "number")
    return o(
      `${n}, "params.modelYear" must be of type number or string, got: <${r}> ${t.modelYear}`
    );
  const s = await l(t).catch(
    ($) => o(`${n}, error building query string: ${$}`)
  ), g = `${f}/${n}/${e}${s}`;
  return await d().get(g).then(($) => $).catch(($) => o(`${n}, error fetching data: ${$}`));
}, G = async (e) => {
  const t = "DecodeVinValuesBatch", n = u(e);
  if (!e || n !== "string")
    return o(
      `${t}, "inputString" argument is required and must be of type string, got: <${n}> ${e}`
    );
  const i = `${f}/${t}/`, c = encodeURI(`DATA=${e}&format=${T}`);
  return await d().get(i, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: c
  }).then((r) => r).catch((r) => o(`${t}, error fetching data: ${r}`));
}, j = async (e, t) => {
  const n = "DecodeVinValuesExtended", i = u(e);
  if (!e || i !== "string")
    return o(
      `${n}, "vin" argument is required and must be of type string, got: <${i}> ${e}`
    );
  const c = u(t);
  if (t && c !== "object")
    return o(
      `${n}, "params" argument must be of type object, got: <${c}> ${t}`
    );
  const r = u(t == null ? void 0 : t.modelYear);
  if (t != null && t.modelYear && r !== "number")
    return o(
      `${n}, "params.modelYear" must be of type number or string, got: <${r}> ${t.modelYear}`
    );
  const s = await l(t).catch(
    ($) => o(`${n}, error building query string: ${$}`)
  ), g = `${f}/${n}/${e}${s}`;
  return await d().get(g).then(($) => $).catch(($) => o(`${n}, error fetching data: ${$}`));
}, p = async (e) => {
  const t = "DecodeWMI", n = u(e);
  if (n !== "string")
    return o(
      `${t}, "WMI" argument is required and must be of type string, got <${n}> ${e}`
    );
  const i = await l().catch(
    (r) => o(`${t}, error building query string: ${r}`)
  ), c = `${f}/${t}/${e}${i}`;
  return await d().get(c).then((r) => r).catch((r) => o(`${t}, error fetching data: ${r}`));
}, P = async () => {
  const e = "GetAllMakes", t = await l().catch(
    (i) => o(`${e}, error building query string: ${i}`)
  ), n = `${f}/${e}${t}`;
  return await d().get(n).then((i) => i).catch((i) => o(`${e}, error fetching data: ${i}`));
}, D = async (e) => {
  const t = "GetAllManufacturers", n = u(e);
  if (e && n !== "object")
    return o(
      `${t}, "params" argument must be of type object, got: <${n}> ${e}`
    );
  const i = u(e == null ? void 0 : e.manufacturerType);
  if (e != null && e.manufacturerType && i !== "string")
    return o(
      `${t}, params.manufacturerType" argument must be of type string, got: <${i}> ${e.manufacturerType}`
    );
  const c = u(e == null ? void 0 : e.page);
  if (e != null && e.page && c !== "number | string")
    return o(
      `${t}, "params.page" argument must be of type number or string, got: <${c}> ${e.page}`
    );
  const r = await l(e).catch(
    (g) => o(`${t}, error building query string: ${g}`)
  ), s = `${f}/${t}${r}`;
  return await d().get(s).then((g) => g).catch((g) => o(`${t}, error fetching data: ${g}`));
}, I = async (e) => {
  const t = "GetCanadianVehicleSpecifications", n = u(e);
  if (!e || e && n !== "object")
    return o(
      `${t}, "params" argument is required and must be of type object, got: <${n}> ${e}`
    );
  const i = u(e == null ? void 0 : e.year);
  if (!(e != null && e.year) || i !== "number")
    return o(
      `${t}, "params.year" argument is required and must be of type number or string, got: <${i}> ${e.year}`
    );
  const c = u(e.make);
  if (e != null && e.make && c !== "string")
    return o(
      `${t}, "params.make" argument must be of type string, got: <${c}> ${e.make}`
    );
  const r = u(e.model);
  if (e.model && r !== "string")
    return o(
      `${t}, "params.model" argument must be of type string, got: <${r}> ${e.model}`
    );
  const s = u(e.units);
  if (e.units && s !== "string")
    return o(
      `${t}, "params.units" argument must be of type string, got: <${s}> ${e.units}`
    );
  const g = e.make || "", $ = e.model || "", y = e.units || "", h = {
    year: e.year,
    make: g,
    model: $,
    units: y
  }, b = await l(h, !0).catch(
    (M) => o(`${t}, error building query string: ${M}`)
  ), a = `${f}/${t}/${b}`;
  return await d().get(a).then((M) => M).catch((M) => o(`${t}, error fetching data: ${M}`));
}, F = async (e) => {
  const t = "GetEquipmentPlantCodes", n = u(e);
  if (!e || n !== "object")
    return o(
      `${t}, "params" argument must be of type object, got: <${n}> ${e}`
    );
  const i = u(e.year);
  if (i !== "number")
    return o(
      `${t}, "params.year" argument is required and must be of type number or string, got: <${i}> ${e.year}`
    );
  const c = u(e.equipmentType);
  if (c !== "number")
    return o(
      `${t}, "params.equipmentType" argument is required and must be of type number or string, got: <${c}> ${e.equipmentType}`
    );
  const r = u(e.reportType);
  if (r !== "string")
    return o(
      `${t}, "params.reportType" argument is required and must be of type string, got: <${r}> ${e.reportType}`
    );
  const s = await l(e).catch(
    ($) => o(`${t}, error building query string: ${$}`)
  ), g = `${f}/${t}${s}`;
  return await d().get(g).then(($) => $).catch(($) => o(`${t}, error fetching data: ${$}`));
}, A = async (e) => {
  const t = "GetMakeForManufacturer", n = u(e);
  if (!e || n !== "number")
    return o(
      `${t}, "manufacturer" argument is required and must be of type number or string, got <${n}> ${e}`
    );
  const i = await l().catch(
    (r) => o(`${t}, error building query string: ${r}`)
  ), c = `${f}/${t}/${e}${i}`;
  return await d().get(c).then((r) => r).catch((r) => o(`${t}, error fetching data: ${r}`));
}, E = async (e, t) => {
  const n = "GetMakesForManufacturerAndYear", i = u(e);
  if (!e || i !== "number")
    return o(
      `${n}, "manufacturer" argument is required and must be of type number or string, got <${i}> ${e}`
    );
  const c = u(t);
  if (!t || t && c !== "object")
    return o(
      `${n}, "params" argument is required and must be of type object, got: <${c}> ${t}`
    );
  const r = u(t.year);
  if (!t.year || r !== "number")
    return o(
      `${n}, "params.year" is required and must be of type number or string, got: <${r}> ${t.year}`
    );
  const s = await l(t).catch(
    ($) => o(`${n}, error building query string: ${$}`)
  ), g = `${f}/${n}/${e}${s}`;
  return await d().get(g).then(($) => $).catch(($) => o(`${n}, error fetching data: ${$}`));
}, R = async (e) => {
  const t = "GetMakesForVehicleType", n = u(e);
  if (n !== "string")
    return o(
      `${t}, "typeName" argument is required and must be of type string, got <${n}> ${e}`
    );
  const i = await l().catch(
    (r) => o(`${t}, error building query string: ${r}`)
  ), c = `${f}/${t}/${e}${i}`;
  return await d().get(c).then((r) => r).catch((r) => o(`${t}, error fetching data: ${r}`));
}, L = async (e) => {
  const t = "GetManufacturerDetails", n = u(e);
  if (!e || n !== "number")
    return o(
      `${t}, "manufacturer" argument is required and must be of type number or string, got <${n}> ${e}`
    );
  const i = await l().catch(
    (r) => o(`${t}, error building query string: ${r}`)
  ), c = `${f}/${t}/${e}${i}`;
  return await d().get(c).then((r) => r).catch((r) => o(`${t}, error fetching data: ${r}`));
}, v = async (e) => {
  const t = "GetModelsForMake", n = u(e);
  if (n !== "string")
    return o(
      `${t}, "makeName" argument is required and must be of type string, got <${n}> ${e}`
    );
  const i = await l().catch(
    (r) => o(`${t}, error building query string: ${r}`)
  ), c = `${f}/${t}/${e}${i}`;
  return await d().get(c).then((r) => r).catch((r) => o(`${t}, error fetching data: ${r}`));
}, N = async (e) => {
  const t = "GetModelsForMakeId", n = u(e);
  if (!e || n !== "number")
    return o(
      `${t}, "makeId" argument is required and must be of type number or string, got <${n}> ${e}`
    );
  const i = await l().catch(
    (r) => o(`${t}, error building query string: ${r}`)
  ), c = `${f}/${t}/${e}${i}`;
  return await d().get(c).then((r) => r).catch((r) => o(`${t}, error fetching data: ${r}`));
}, U = async (e) => {
  const t = "GetModelsForMakeIdYear", n = e == null ? void 0 : e.makeId, i = e == null ? void 0 : e.modelYear, c = e == null ? void 0 : e.vehicleType, r = u(e);
  if (!e || e && r !== "object")
    return o(
      `${t}, "params" argument is required and must be of type object, got: <${r}> ${e}`
    );
  const s = u(n);
  if (!n || s !== "number")
    return o(
      `${t}, "params.makeId" is required and must be of type number or string, got: <${s}> ${n}`
    );
  if (!i && !c)
    return o(
      `${t}, must provide either "params.modelYear" or "params.vehicleType", got: { modelYear: ${i}, vehicleType: ${c} }`
    );
  const g = u(i);
  if (e != null && e.modelYear && g !== "number")
    return o(
      `${t}, "params.modelYear" must be of type number or string, got: <${g}> ${i}`
    );
  const $ = u(c);
  if (c && $ !== "string")
    return o(
      `${t}, "params.vehicleType" must be of type string, got: <${$}> ${c}`
    );
  let y = `${t}/makeId/${n}/`;
  i && c ? y += `modelYear/${i}/vehicleType/${c}` : i ? y += `modelYear/${i}` : y += `vehicleType/${c}`;
  const h = await l().catch(
    (a) => o(`${t}, error building query string: ${a}`)
  ), b = `${f}/${y}${h}`;
  return await d().get(b).then((a) => a).catch((a) => o(`${t}, error fetching data: ${a}`));
}, _ = async (e) => {
  const t = "GetModelsForMakeYear", n = e == null ? void 0 : e.make, i = e == null ? void 0 : e.modelYear, c = e == null ? void 0 : e.vehicleType, r = u(e);
  if (!e || e && r !== "object")
    return o(
      `${t}, "params" argument is required and must be of type object, got: <${r}> ${e}`
    );
  const s = u(n);
  if (!n || s !== "string")
    return o(
      `${t}, "params.make" is required and must be of type string, got: <${s}> ${n}`
    );
  if (!i && !c)
    return o(
      `${t}, must provide either "params.modelYear" or "params.vehicleType" or both, got: { modelYear: ${i}, vehicleType: ${c} }`
    );
  const g = u(i);
  if (e != null && e.modelYear && g !== "number")
    return o(
      `${t}, "params.modelYear" must be of type number or string, got: <${g}> ${i}`
    );
  const $ = u(c);
  if (c && $ !== "string")
    return o(
      `${t}, "params.vehicleType" must be of type string, got: <${$}> ${c}`
    );
  let y = `${t}/make/${n}/`;
  i && c ? y += `modelYear/${i}/vehicleType/${c}` : i ? y += `modelYear/${i}` : y += `vehicleType/${c}`;
  const h = await l().catch(
    (a) => o(`${t}, error building query string: ${a}`)
  ), b = `${f}/${y}${h}`;
  return await d().get(b).then((a) => a).catch((a) => o(`${t}, error fetching data: ${a}`));
}, C = async (e) => {
  const t = "GetParts", n = e == null ? void 0 : e.type, i = e == null ? void 0 : e.fromDate, c = e == null ? void 0 : e.toDate, r = e == null ? void 0 : e.page, s = u(e);
  if (e && s !== "object")
    return o(
      `${t}, "params" argument must be of type object, got: <${s}> ${e}`
    );
  const g = u(n);
  if (n && g !== "number")
    return o(
      `${t}, "params.type" argument must be of type number or string, got: <${g}> ${n}`
    );
  const $ = u(i);
  if (i && $ !== "string")
    return o(
      `${t}, "params.fromDate" argument must be of type string, got: <${$}> ${i}`
    );
  const y = u(c);
  if (c && y !== "string")
    return o(
      `${t}, "params.toDate" argument must be of type string, got: <${y}> ${c}`
    );
  const h = u(r);
  if (r && h !== "number")
    return o(
      `${t}, "params.page" argument must be of type number or string, got: <${h}> ${r}`
    );
  const b = await l(e).catch(
    (q) => o(`${t}, error building query string: ${q}`)
  ), a = `${f}/${t}${b}`;
  return await d().get(a).then((q) => q).catch((q) => o(`${t}, error fetching data: ${q}`));
}, W = async (e) => {
  const t = "GetVehicleTypesForMake", n = u(e);
  if (!e || n !== "string")
    return o(
      `${t}, "makeName" argument is required and must be of type string, got <${n}> ${e}`
    );
  const i = await l().catch(
    (r) => o(`${t}, error building query string: ${r}`)
  ), c = `${f}/${t}/${e}${i}`;
  return await d().get(c).then((r) => r).catch((r) => o(`${t}, error fetching data: ${r}`));
}, x = async (e) => {
  const t = "GetVehicleTypesForMakeId", n = u(e);
  if (!e || n !== "number")
    return o(
      `${t}, "makeId" argument is required and must be of type number or string, got <${n}> ${e}`
    );
  const i = await l().catch(
    (r) => o(`${t}, error building query string: ${r}`)
  ), c = `${f}/${t}/${e}${i}`;
  return await d().get(c).then((r) => r).catch((r) => o(`${t}, error fetching data: ${r}`));
}, O = async () => {
  const e = "GetVehicleVariableList", t = await l().catch(
    (i) => o(`${e}, error building query string: ${i}`)
  ), n = `${f}/${e}${t}`;
  return await d().get(n).then((i) => i).catch((i) => o(`${e}, error fetching data: ${i}`));
}, B = async (e) => {
  const t = "GetVehicleVariableValuesList", n = u(e);
  if (!e || !["number", "string"].includes(n))
    return o(
      `${t}, "variableValue" argument is required and must be of type number or string, got <${n}> ${e}`
    );
  e = encodeURI(String(e));
  const i = await l().catch(
    (r) => o(`${t}, error building query string: ${r}`)
  ), c = `${f}/${t}/${e}${i}`;
  return await d().get(c).then((r) => r).catch((r) => o(`${t}, error fetching data: ${r}`));
}, H = async (e, t) => {
  const n = "GetWMIsForManufacturer", i = t == null ? void 0 : t.vehicleType;
  if (!e && !i)
    return o(
      `${n}, "manufacturer" and "params.vehicleType" arguments are optional but at least 1 is required, got: manufacturer: ${e} and vehicleType: ${i}`
    );
  const c = u(e);
  if (e && !["number", "string"].includes(c))
    return o(
      `${n}, "manufacturer" must be of type number or string, got <${c}> ${e}`
    );
  const r = u(t);
  if (t && r !== "object")
    return o(
      `${n}, "params" must be of type object, got: <${r}> ${t}`
    );
  const s = u(t == null ? void 0 : t.vehicleType);
  if (t != null && t.vehicleType && !["number", "string"].includes(s))
    return o(
      `${n}, "params.vehicleType" must be of type number or string, got: <${s}> ${t.vehicleType}`
    );
  const g = await l(t).catch(
    (y) => o(`${n}, error building query string: ${y}`)
  ), $ = `${f}/${n}/${e || ""}${g}`;
  return await d().get($).then((y) => y).catch((y) => o(`${n}, error fetching data: ${y}`));
};
export {
  m as DecodeVin,
  k as DecodeVinExtended,
  S as DecodeVinValues,
  G as DecodeVinValuesBatch,
  j as DecodeVinValuesExtended,
  p as DecodeWMI,
  P as GetAllMakes,
  D as GetAllManufacturers,
  I as GetCanadianVehicleSpecifications,
  F as GetEquipmentPlantCodes,
  A as GetMakeForManufacturer,
  E as GetMakesForManufacturerAndYear,
  R as GetMakesForVehicleType,
  L as GetManufacturerDetails,
  v as GetModelsForMake,
  N as GetModelsForMakeId,
  U as GetModelsForMakeIdYear,
  _ as GetModelsForMakeYear,
  C as GetParts,
  W as GetVehicleTypesForMake,
  x as GetVehicleTypesForMakeId,
  O as GetVehicleVariableList,
  B as GetVehicleVariableValuesList,
  H as GetWMIsForManufacturer,
  V as isValidVin
};
//# sourceMappingURL=nhtsa-api-wrapper.mjs.map
