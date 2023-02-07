import { useNHTSA } from '@/api'
import { catchInvalidArguments, rejectWithError } from '@/utils'
import type { IArgToValidate, NhtsaResponse } from '@/types'

/**
 * `GetModelsForMake` returns the Models in the vPIC dataset for a specified `makeName`
 * whose Name is LIKE the Make in vPIC Dataset.
 *
 * `makeName` can be a partial, or a full for more specificity, e.g., "Harley",
 * "Harley Davidson", etc.
 *
 * @param {string} makeName - Vehicle make name
 * @returns {(Promise<NhtsaResponse<GetModelsForMakeResults>>)} - Api Response object
 * @param {boolean} [doFetch=true] - Whether to fetch the data or just return the URL
 * (default: `true`)
 * @returns {(Promise<NhtsaResponse<GetModelsForMakeResults> | string>)} - Api Response `object`
 * -or- url `string` if `doFetch = false`
 */
export const GetModelsForMake = async (
  makeName: string,
  doFetch = true
): Promise<NhtsaResponse<GetModelsForMakeResults> | string> => {
  const endpointName = 'GetModelsForMake'

  try {
    const args: IArgToValidate[] = [
      {
        name: 'makeName',
        value: makeName,
        required: true,
        types: ['string'],
      },
    ]
    catchInvalidArguments({ args })

    const { get, cacheUrl, getCachedUrl } = useNHTSA()

    cacheUrl({ endpointName, path: makeName })

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
 * Objects found in the NhtsaResponse 'Results' array of GetModelsForMake endpoint
 *
 * @alias GetModelsForMakeResults
 */
export type GetModelsForMakeResults = {
  Make_ID: number
  Make_Name: string
  Model_ID: number
  Model_Name: string
}
