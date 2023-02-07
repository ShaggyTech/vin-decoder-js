import { useNHTSA } from '@/api'
import { catchInvalidArguments, rejectWithError } from '@/utils'
import type { IArgToValidate, NhtsaResponse } from '@/types'

/**
 * `GetMakeForManufacturer` returns all the Makes in the vPIC dataset for a specified manufacturer
 * that is requested. Multiple results are returned in case of multiple matches.
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
 * @returns {(Promise<NhtsaResponse<GetMakeForManufacturerResults> | string>)} - Api Response
 * `object` -or- url `string` if `doFetch = false`
 */
export const GetMakeForManufacturer = async (
  manufacturer: string | number,
  doFetch = true
): Promise<NhtsaResponse<GetMakeForManufacturerResults> | string> => {
  const endpointName = 'GetMakeForManufacturer'

  try {
    const args: IArgToValidate[] = [
      {
        name: 'manufacturer',
        value: manufacturer,
        required: true,
        types: ['string', 'number'],
      },
    ]
    catchInvalidArguments({ args })

    const { get, cacheUrl, getCachedUrl } = useNHTSA()

    cacheUrl({ endpointName, path: manufacturer.toString() })

    if (!doFetch) {
      return getCachedUrl()
    } else {
      return get()
    }
  } catch (error) {
    return rejectWithError(error)
  }
}

/**
 * Objects found in the NhtsaResponse 'Results' array of GetMakeForManufacturer endpoint
 *
 * @alias GetMakeForManufacturerResults
 */
export type GetMakeForManufacturerResults = {
  Make_ID: number
  Make_Name: string
  Mfr_Name: string
}
