import { beforeEach, describe, expect, it } from 'vitest'
import { DecodeVinValues } from '../'

// Mocks
import { createMockResponse } from '.vitest/helpers'
import { mockResults } from '.vitest/data'

describe('api/endpoints/DecodeVinValues.ts', () => {
  it('exports DecodeVinValues function', () => {
    expect(DecodeVinValues).toBeDefined()
    expect(DecodeVinValues).toBeInstanceOf(Function)
  })
})

describe('DecodeVinValues', () => {
  const endpointName = 'DecodeVinValues'
  const vin = 'WA1A4AFY2J2008189'
  const params = { modelYear: 2018 }
  const mockUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/${endpointName}/${vin}?format=json`
  const mockUrlWithParams = `https://vpic.nhtsa.dot.gov/api/vehicles/${endpointName}/${vin}?modelYear=2018&format=json`

  const expectedFetchOptions = {
    saveUrl: true,
    method: 'GET',
  }

  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockResolvedValue(createMockResponse(mockResults))
  })

  it('returns a Promise', () => {
    const response = DecodeVinValues('test')
    expect(response).toBeInstanceOf(Promise)
  })

  /*****************************
   * doFetch = true (default)
   ****************************/
  it('fetches data when provided VIN only', async () => {
    const results = await DecodeVinValues(vin)

    expect(results).toEqual(mockResults)
    expect(fetchMock).toHaveBeenCalledWith(mockUrl, expectedFetchOptions)
    expect(fetchMock.requests().length).toEqual(1)
    expect(fetchMock.requests()[0].url).toEqual(mockUrl)
    expect(fetchMock.requests()[0].method).toEqual('GET')
  })

  it('fetches data when provided VIN and doFetch = true', async () => {
    const results = await DecodeVinValues(vin, true)

    expect(results).toEqual(mockResults)
    expect(fetchMock).toHaveBeenCalledWith(mockUrl, expectedFetchOptions)
    expect(fetchMock.requests().length).toEqual(1)
    expect(fetchMock.requests()[0].url).toEqual(mockUrl)
    expect(fetchMock.requests()[0].method).toEqual('GET')
  })

  it('fetches data when provided VIN and params', async () => {
    const results = await DecodeVinValues(vin, { ...params })

    expect(results).toEqual(mockResults)
    expect(fetchMock).toHaveBeenCalledWith(
      mockUrlWithParams,
      expectedFetchOptions
    )
    expect(fetchMock.requests().length).toEqual(1)
    expect(fetchMock.requests()[0].url).toEqual(mockUrlWithParams)
    expect(fetchMock.requests()[0].method).toEqual('GET')
  })

  it('fetches data when provided VIN, params, and doFetch = true', async () => {
    const results = await DecodeVinValues(vin, { ...params }, true)

    expect(results).toEqual(mockResults)
    expect(fetchMock).toHaveBeenCalledWith(
      mockUrlWithParams,
      expectedFetchOptions
    )
    expect(fetchMock.requests().length).toEqual(1)
    expect(fetchMock.requests()[0].url).toEqual(mockUrlWithParams)
    expect(fetchMock.requests()[0].method).toEqual('GET')
  })

  it('accepts params.modelYear as string', async () => {
    const results = await DecodeVinValues(vin, { modelYear: '2018' }, true)

    expect(results).toEqual(mockResults)
    expect(fetchMock).toHaveBeenCalledWith(
      mockUrlWithParams,
      expectedFetchOptions
    )
    expect(fetchMock.requests().length).toEqual(1)
    expect(fetchMock.requests()[0].url).toEqual(mockUrlWithParams)
    expect(fetchMock.requests()[0].method).toEqual('GET')
  })

  it('accepts params.modelYear as number', async () => {
    const results = await DecodeVinValues(vin, { modelYear: 2018 }, true)

    expect(results).toEqual(mockResults)
    expect(fetchMock).toHaveBeenCalledWith(
      mockUrlWithParams,
      expectedFetchOptions
    )
    expect(fetchMock.requests().length).toEqual(1)
    expect(fetchMock.requests()[0].url).toEqual(mockUrlWithParams)
    expect(fetchMock.requests()[0].method).toEqual('GET')
  })

  /*****************************
   * doFetch = false
   ****************************/
  it('returns url string when provided VIN and doFetch = false', async () => {
    const results = await DecodeVinValues(vin, false)

    expect(results).toEqual(mockUrl)
    expect(fetchMock.requests().length).toEqual(0)
  })

  it('returns url string when provided VIN, params, and doFetch = false', async () => {
    const results = await DecodeVinValues(vin, { ...params }, false)

    expect(results).toEqual(mockUrlWithParams)
    expect(fetchMock.requests().length).toEqual(0)
  })

  /*****************************
   * rejects with error
   ***************************/
  it('rejects with error if vin is undefined', async () => {
    await expect(() =>
      DecodeVinValues(undefined as unknown as string)
    ).rejects.toThrowError(/error validating argument named "vin"/)

    expect(fetchMock.requests().length).toEqual(0)
  })

  it.each([1234, ['a', 'b'], { a: 'b' }, null])(
    'rejects with error if VIN is not a string, %#',
    async (arg) => {
      await expect(() =>
        DecodeVinValues(arg as unknown as string)
      ).rejects.toThrowError(/error validating argument named "vin"/)

      expect(fetchMock.requests().length).toEqual(0)
    }
  )

  it.each([1234, ['a', 'b'], null])(
    'rejects with error if params is neither an object nor boolean, %#',
    async (arg) => {
      await expect(() =>
        DecodeVinValues(vin, arg as unknown as object)
      ).rejects.toThrowError(/error validating argument named "params"/)

      expect(fetchMock.requests().length).toEqual(0)
    }
  )

  it.each([
    { modelYear: true },
    { modelYear: ['a', 'b'] },
    { modelYear: { a: 'b' } },
    { modelYear: null },
  ])(
    'rejects with error if params.modelYear is neither a string nor number, %#',
    async (arg) => {
      await expect(() =>
        DecodeVinValues(vin, arg as unknown as object)
      ).rejects.toThrowError(/error validating argument named "modelYear"/)

      expect(fetchMock.requests().length).toEqual(0)
    }
  )
})
