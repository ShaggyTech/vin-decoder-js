import type { NhtsaResponse } from '@/types';
/**
 * `GetManufacturerDetails` provides the details for a specific manufacturer that is requested.
 * Multiple results are returned in case of multiple matches.
 *
 * `manufacturer` name can be a partial name, or a full name for more specificity, e.g. "988",
 * "honda", "HONDA OF CANADA MFG., INC.", etc.
 *
 * - If supplied `manufacturer` is a number - method will do exact match on Manufacturer's Id.
 * - If supplied `manufacturer` is a string - it will look for manufacturers whose name is LIKE the
 *   provided name. It accepts a partial manufacturer name as an input.
 *
 * @param {(string|number)} manufacturer - Manufacturer Name or ID
 * @param {boolean} [doFetch=true] - Whether to fetch the data or just return the URL
 * (default: `true`)
 * @returns {(Promise<NhtsaResponse<GetManufacturerDetailsResults> | string>)} - Api Response
 * `object` -or- url `string` if `doFetch = false`
 */
export declare const GetManufacturerDetails: (manufacturer: string | number, doFetch?: boolean) => Promise<NhtsaResponse<GetManufacturerDetailsResults> | string>;
/**
 * Objects found in the NhtsaResponse 'Results' array of GetManufacturerDetails endpoint
 *
 * @alias GetManufacturerDetailsResults
 */
export declare type GetManufacturerDetailsResults = {
    Address: string | null;
    Address2: string | null;
    City: string | null;
    ContactEmail: string | null;
    ContactFax: string | null;
    ContactPhone: string | null;
    Country: string | null;
    DBAs: string | null;
    EquipmentItems: Array<unknown>;
    LastUpdated: string;
    ManufacturerTypes: Array<{
        Name: string;
    }>;
    Mfr_CommonName: string | null;
    Mfr_ID: number | null;
    Mfr_Name: string | null;
    OtherManufacturerDetails: string | null;
    PostalCode: string | null;
    PrimaryProduct: string | null;
    PrincipalFirstName: string | null;
    PrincipalLastName: string | null;
    PrincipalPosition: string | null;
    StateProvince: string | null;
    SubmittedName: string | null;
    SubmittedOn: string;
    SubmittedPosition: string | null;
    VehicleTypes: Array<{
        GVWRFrom: string;
        GVWRTo: string;
        IsPrimary: boolean;
        Name: string;
    }>;
};
//# sourceMappingURL=GetManufacturerDetails.d.ts.map