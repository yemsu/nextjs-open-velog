import axios, { AxiosInstance, AxiosResponse } from 'axios'

const createAxios = (service: string) => {
  return axios.create({
    baseURL: `http://test-api.sparta99.shop/api/${service}`,
    timeout: 5000
  })
}

const getHeader = () => ({
  Authorization: Axios.prototype.authToken
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
  ): Promise<AxiosResponse<ResponseType>> {
    return this._axios.get(url, { 
      params: { ...params },
      headers: getHeader()
    }).then((res) => res)
  }
  post<PayloadType, ResponseType>(
    url: string,
    payload: PayloadType
  ): Promise<AxiosResponse<ResponseType>> {
    return this._axios.post(url, payload, { 
      headers: getHeader()
    }).then((res) => res)
  }
  delete<ResponseType>(
    url: string
  ): Promise<AxiosResponse<ResponseType>> {
    // console.log('deleteApi', url)
    return this._axios.delete(url, { 
      headers: getHeader()
    }).then((res) => res)
  }
  patch<PayloadType, ResponseType>(
    url: string,
    payload: PayloadType
  ): Promise<AxiosResponse<ResponseType>> {
    // console.log('patchApi', payload)
    return this._axios.patch(url, payload, { 
      headers: getHeader()
    }).then((res) => res)
  }
  put<PayloadType, ResponseType>(
    url: string, payload: PayloadType
  ): Promise<AxiosResponse<ResponseType>> {
    // console.log('putApi', payload)
    return this._axios.put(url, payload, { 
      headers: getHeader() 
    }).then((res) => res)
  }
}

export default Axios