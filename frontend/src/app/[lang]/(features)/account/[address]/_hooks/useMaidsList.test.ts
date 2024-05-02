/// <reference lib="dom" />

import { renderHook } from '@testing-library/react'
import { useMaidsList } from '@/app/[lang]/(features)/account/[address]/_hooks/useMaidsList'

jest.mock('fetch')

describe('useMaidsList', () => {
  test('初期値確認', () => {
    const { result } = renderHook(() => useMaidsList('0x12Cfb7E1Cf4fcCBdcA0dCE58F34e1c0AFDA23FCd'))
    expect(result.current.maidsList).toEqual([])
  })

  // test('loadMore', async () => {
  //     const mock = {
  //         assets: [{
  //             image_uri: '',
  //             name: '',
  //             owner: 'string',
  //             token_id: '',
  //             token_uri: ''
  //         }],
  //         next_page: 2
  //     };
  //     (fetch as jest.Mock).mockResolvedValue({ data: mock})
  //     const { result } = renderHook(() => useMaidsList('0x12Cfb7E1Cf4fcCBdcA0dCE58F34e1c0AFDA23FCd'))
  //     await act(async () => {
  //         const data = (await result.current.loadMore(1))
  //         expect(data).toBe(mock)
  //     })
  // })
})
