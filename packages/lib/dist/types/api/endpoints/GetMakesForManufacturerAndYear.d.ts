import type { NhtsaResponse } from '@/types';
/**
 * `GetMakesForManufacturerAndYear` returns all the Makes in the vPIC dataset for a specified
 * `manufacturer`, and whose "Year From" and "Year To" range cover the specified `year`. Multiple
 * results are returned in case of multiple matches.
 *
 * Both `manufacturer` and `params.year` are required.
 *
 * `manufacturer` name can be a partial name, or a full name for more specificity, e.g. "988",
 * "honda", "HONDA OF CANADA MFG., INC.", etc.
 *
 * - If supplied `manufacturer` is a number - method will do exact match on Manufacturer's Id.
 * - If supplied `manufacturer` is a string - it will look for manufacturers whose name is LIKE the
 *   provided name. It accepts a partial manufacturer name as an input.
 *
 * `params.year` must be a number > 2016, years prior to 2016 are not supported according to the
 * NHTSA API.
 *
 * @param {(string|number)} manufacturer - Manufacturer Name (string) or Manufacturer ID (number)
 * @param params - Object of Query Search names and values to append to the URL as a query string
 * @param {(string|number)} params.year - Model year of the vehicle - Number, >= 2016
 * @returns {(Promise<NhtsaResponse<GetMakesForManufacturerAndYearResults>>)} - Api Response object
 */
export declare const GetMakesForManufacturerAndYear: (manufacturer: string, params: {
    year: string | number;
}) => Promise<NhtsaResponse<GetMakesForManufacturerAndYearResults>>;
/**
 * Objects found in the NhtsaResponse 'Results' array of GetMakesForManufacturerAndYear endpoint
 *
 * @alias GetMakesForManufacturerAndYearResults
 */
export declare type GetMakesForManufacturerAndYearResults = {
    MakeId: number;
    MakeName: string;
    MfrId: number;
    MfrName: string;
};
//# sourceMappingURL=GetMakesForManufacturerAndYear.d.ts.map