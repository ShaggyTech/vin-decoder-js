/* Utility Functions */
import { catchInvalidArguments, rejectWithError, useFetch } from '../../utils'
/* Types */
import type { AtLeastOne, IArgToValidate, NhtsaResponse } from '../../types'

/**
 * `GetWMIsForManufacturer` provides information on the World Manufacturer Identifier (WMI) for a
 * specified `manufacturer`. Only WMIs registered in vPICList are displayed. Multiple results are
 * returned in case of multiple matches.
 *
 * Both `params.manufacturer` and `params.vehicleType` are optional but at least one must be
 * provided.
 *
 * `manufacturer` can be a partial name, or a full name for more specificity, or WMI ID number,
 *  e.g., "Merc", "Mercedes Benz", 987, etc.
 * - If `manufacturer` is a number - method will do exact match on Manufacturer's Id
 * - If `manufacturer` is a string - it will look for manufacturers whose name is LIKE the provided
 *   name (it accepts a partial Manufacturer name as an input)
 *
 * `vehicleType` can be a string or number, e.g., "car", 1, etc.
 * - If `vehicleType` is a number - method will do exact match on VehicleType's Id
 * - If `vehicleType` is a string - it will look for VehicleType whose name is LIKE the provided
 *   name (it accepts a partial VehicleType name as an input).
 *
 * @async
 * @param {Object} params - Query Search Parameters to append to the URL.
 * @param {(string|number)} [params.manufacturer] - Manufacturer Name, or Manufacturer ID, or WMI ID
 * (required if !vehicleType)
 * @param {(string|number)} [params.vehicleType] - Optional Vehicle Type search parameter
 * (required if !manufacturer)
 * @returns {(Promise<NhtsaResponse<GetWMIsForManufacturerResults>>)} - Api Response object
 */
export const GetWMIsForManufacturer = async (
  params: AtLeastOne<{
    manufacturer?: string | number
    vehicleType?: string | number
  }>
): Promise<NhtsaResponse<GetWMIsForManufacturerResults>> => {
  const endpointName = 'GetWMIsForManufacturer'

  try {
    /* Validate the arguments */
    const atLeastOne: IArgToValidate[] = [
      {
        name: 'manufacturer',
        value: params?.manufacturer,
        types: ['string', 'number'],
      },
      {
        name: 'vehicleType',
        value: params?.vehicleType,
        types: ['string', 'number'],
      },
    ]
    const args: IArgToValidate[] = [
      { name: 'params', value: params, required: true, types: ['object'] },
      ...atLeastOne,
    ]
    catchInvalidArguments({ args })
    catchInvalidArguments({ args: atLeastOne, mode: 'atLeast' })

    /*
     * manufacturer and vehicleType are optional but at least one must be provided.
     * `manufacturer` is actually part of the path for this endpoint and not a query param.
     * We include `manufacturer` in params as it's easier to type the function using 'AtLeastOne'
     * type if they are placed in the same object.
     */
    const manufacturer = params?.manufacturer
      ? encodeURIComponent(params.manufacturer)
      : ''
    const vehicleType = params?.vehicleType || ''

    const { createUrl, get } = useFetch()
    createUrl({
      endpointName,
      path: manufacturer,
      params: { vehicleType },
    })

    return get()
  } catch (error) {
    return rejectWithError(error)
  }
}

/**
 * Objects found in the NhtsaResponse 'Results' array of GetWMIsForManufacturer endpoint
 *
 * @alias GetWMIsForManufacturerResults
 */
export type GetWMIsForManufacturerResults = {
  Country: string | null
  CreatedOn: string
  DateAvailableToPublic: string
  Id: number
  Name: string
  UpdatedOn: string
  VehicleType: string
  WMI: string
}
