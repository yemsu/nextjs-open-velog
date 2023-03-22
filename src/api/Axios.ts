import axios, { AxiosInstance, AxiosResponse } from 'axios'

const createAxios = (service: string) => {
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  return axios.create({
    baseURL: `${protocol}://test-api.sparta99.shop/api/${service}`,
    // timeout: 5000
  })
}

const getHeader = () => ({
  Authorization: `Bearer ${Axios.prototype.authToken}`
})

class Axios {
  service: string
  _axios: AxiosInstance
  authToken?: string | null

  constructor(service: string) {
    this.service = service 
    this._axios = createAxios(service)
  }

  get<ParamsType, ResponseType>(
    url: string,
    params?: ParamsType
  ): Promise<ResponseType> {
    return this._axios.get(url, { 
      params: { ...params },
      headers: getHeader()
    }).then(({data}) => data.data)
  }

  postFullRes<PayloadType, ResponseType>(
    url: string,
    payload: PayloadType
  ): Promise<AxiosResponse<ResponseType>> {
    return this._axios.post(url, payload, { 
      headers: getHeader()
    }).then((res) => res)
  }

  post<PayloadType, ResponseType>(
    url: string,
    payload: PayloadType
  ): Promise<ResponseType> {
    return this._axios.post(url, payload, { 
      headers: getHeader()
    }).then(({data}) => data.data)
  }
  delete<ResponseType>(
    url: string
  ): Promise<ResponseType> {
    // console.log('deleteApi', url)
    return this._axios.delete(url, { 
      headers: getHeader()
    }).then(({data}) => data.data)
  }
  patch<PayloadType, ResponseType>(
    url: string,
    payload: PayloadType
  ): Promise<ResponseType> {
    // console.log('patchApi', payload)
    return this._axios.patch(url, payload, { 
      headers: getHeader()
    }).then(({data}) => data.data)
  }
  put<PayloadType, ResponseType>(
    url: string, payload: PayloadType
  ): Promise<ResponseType> {
    // console.log('putApi', payload)
    return this._axios.put(url, payload, { 
      headers: getHeader() 
    }).then(({data}) => data.data)
  }
}

export default Axios