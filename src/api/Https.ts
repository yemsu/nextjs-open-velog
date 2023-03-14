import axios, { AxiosInstance } from 'axios'

const createAxios = (service: string) => {
  return axios.create({
    baseURL: `http://test-api.sparta99.shop/api/${service}`,
    timeout: 5000
  })
}

const getHeader = () => ({
  Authorization: Https.prototype.jToken
})

class Https {
  service: string
  _axios: AxiosInstance
  jToken?: string

  constructor(service: string) {
    this.service = service 
    this._axios = createAxios(service)
  }

  get(url = '', params = {}) {
    return this._axios.get(url, { 
      params: { ...params },
      headers: getHeader()
    })
      .then(({ data }) => data)
      .catch(error => errorHandler(url, error))
  }
  post<T>(url = '', payload: T) {
    console.log('postApi', url, payload)
    return this._axios.post(url, payload, { headers: getHeader() })
      .then(({ data }) => data)
      .catch(error => errorHandler('url', error))
  }
  delete(url = '') {
    // console.log('deleteApi', url)
    return this._axios.delete(url, { headers: getHeader() })
      .then(({ data }) => data)
      .catch(error => errorHandler('url', error))
  }
  patch<T>(url = '', payload: T) {
    // console.log('patchApi', payload)
    return this._axios.patch(url, payload, { headers: getHeader() })
      .then((res) => res)
      .catch(error => errorHandler('url', error))
  }
  put<T>(url = '', payload: T) {
    // console.log('putApi', payload)
    return this._axios.put(url, payload, { headers: getHeader() })
      .then((res) => res)
      .catch(error => errorHandler('url', error))
  }
}

const errorHandler = (actionName: string, error: any) => {
  const { response, request, message, config } = error
  if (response) {
    const { data, status, headers } = response
    // if(status !== 200) {
    //   window.$nuxt.$router.push(getErrorPageRouteData(status))
    // }
    // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답
    console.log(`${actionName} : data`, data);
    console.log(`${actionName} : status`, status);
    console.log(`${actionName} : headers`, headers);
    return { error: { msg: data.result, status } }
  } else if (request) {
    // 요청이 전송되었지만, 응답이 수신되지 않음
    // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스
    console.log(`${actionName} : request`, request);
  } else {
    // 오류가 발생한 요청을 설정하는 동안 문제 발생
    console.log(`${actionName} : Error`, message);
  }
  console.log(`${actionName} : config`, config);

}

export default Https