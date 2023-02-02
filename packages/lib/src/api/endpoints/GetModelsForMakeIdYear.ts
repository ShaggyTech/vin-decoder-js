/* Utility Functions */
import {
  catchInvalidArguments,
  encodeQueryStringParams,
  rejectWithError,
  useFetch,
} from '../../utils'
/* Types */
import type { IArgToValidate, NhtsaResponse, AtLeastOne } from '../../types'

/**
 * `GetModelsForMakeIdYear` returns the Models in the vPIC dataset for a specified Model Year
 * and Make whose name is LIKE the Make in the vPIC Dataset.
 *
 * `params.makeId` is required
 *
 * A minimum of one of the following are also required (or a combination of both):
 * - `params.modelYear` year you want to search for (years >= 1995 are supported according to NHTSA
 *   docs)
 * - `params.vehicleType` can be a partial name, or a full name for more specificity, e.g.,
 *   "Vehicle", "Moto", "Low Speed Vehicle", etc.
 *
 * You can get `makeID`s via `MAKE_ID` key in Results objects of the following endpoints:
 * - `GetAllMakes` endpoint
 * - `GetMakeForManufacturer` endpoint
 * - `GetModelsForMake` endpoint
 * - `GetModelsForMakeYear` endpoint
 *
 * You can get `makeID`s via `MakeID` key in Results objects of the following endpoints:
 * - `DecodeVinValues`
 * - `DecodeVinValuesBatch`
 *
 * You can get `makeID`s via `ValueId` key in Results objects of the following endpoints.
 * One of the objects in the `Results` array will contain both `Variable: "Make"` and
 * `VariableId: 26`. The `ValueId` key in that same object is the `makeID` for use in this
 * endpoint.
 * - `DecodeVin`
 * - `DecodeVinExtended`
 *
 * _NOTE:_ This endpoint requires special handling of the params object, such that none of the
 * params are used in the query string and are instead used as part of the URL path for the
 * endpoint. To account for this, we pass the params object to the `createUrl` function as the
 * `path`, after encoding the params object key:values into a url path string.
 *
 * @async
 * @param {Object} params - Query Search Parameters to append to the URL
 * @param {(string|number)} params.makeId - Make ID to search
 * @param {(string|number)} [params.modelYear] - A number representing the model year to search
 * @param {string} [params.vehicleType] - String representing the vehicle type to search
 * @returns {(Promise<NhtsaResponse<GetModelsForMakeIdYearResults>>)} Api Response object
 */
export const GetModelsForMakeIdYear = async (
  params: {
    makeId: string | number
  } & AtLeastOne<{
    modelYear?: string | number
    vehicleType?: string
  }>
): Promise<NhtsaResponse<GetModelsForMakeIdYearResults>> => {
  const endpointName = 'GetModelsForMakeIdYear'

  try {
    /* Validate the arguments */
    const atLeastOne: IArgToValidate[] = [
      {
        name: 'modelYear',
        value: params.modelYear,
        types: ['string', 'number'],
      },
      {
        name: 'vehicleType',
        value: params.vehicleType,
        types: ['string'],
      },
    ]
    const args: IArgToValidate[] = [
      { name: 'params', value: params, required: true, types: ['object'] },
      {
        name: 'makeId',
        value: params.makeId,
        required: true,
        types: ['string'],
      },
      ...atLeastOne,
    ]
    catchInvalidArguments({ args })
    catchInvalidArguments({ args: atLeastOne, mode: 'atLeast' })

    /*
     * Params for this endpoint are not part of the query string, instead they are part of the URL
     * path. This means params are never run through createQueryString() and won't be URI component
     * encoded without this.
     */
    const { makeId, modelYear, vehicleType } = encodeQueryStringParams(params)

    /* Build the URL */
    let path = `/make/${makeId}/`
    path += modelYear ? `modelYear/${modelYear}` : ''
    path += vehicleType
      ? `${modelYear ? '/' : ''}vehicleType/${vehicleType}/`
      : ''

    const { createUrl, get } = useFetch()
    createUrl({
      endpointName,
      path,
    })

    return get()
  } catch (error) {
    return rejectWithError(error)
  }
}

/**
 * Objects found in the NhtsaResponse 'Results' array of GetModelsForMakeIdYear endpoint
 *
 * @alias GetModelsForMakeIdYearResults
 */
export type GetModelsForMakeIdYearResults = {
  Make_ID: number
  Make_Name: string
  Model_ID: number
  Model_Name: string
}
