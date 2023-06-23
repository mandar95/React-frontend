import axios from "axios";
import SecureLS from "secure-ls";

const defaultOption = {
    headers: {},
    queryParams: null
}
const restClient = axios.create();

restClient.interceptors.response.use(function (res) {
    return res
}, function (error) {
    const err = error.response;
    const ls = new SecureLS();
    //remove token and logout
    if (err.status === 401) {
        ls.remove('token');
        window.location.replace('sign-in')
    }
    return Promise.reject(error)
})

const httpClient = async (url = '', option = defaultOption, noBaseUrl) => {
    const ls = new SecureLS();
    const customeURL = '';
    const baseURL = ''
    let fullPath = noBaseUrl ? (`${url}`) : (`${baseURL}${url}`)

    if (option.queryParams) {
        const queryString = JSON.stringify(option.queryParams)
        fullPath = `${fullPath}?${queryString}`;
    }
    const token = ls.get('token')
    if (token) {
        restClient.defaults.headers.common['Authorizarion'] = `Bearer ${token}`
    }
    const requestData = option;
    return await restClient({
        url: `${fullPath}`,
        method: requestData.method || 'GET',
        cancelToken: option.cancelToken,
        data: JSON.stringify(requestData.data),
        headers: { 'Content-Type': 'application/json' },
        // withCredentials: true
    }).then(response => ({
        data: response?.data || {},
        errors: response?.data?.errors,
        error: response?.data?.error,
        message: response?.data?.message,
        success: (response?.status === 200
            || response?.status === 201)
            && response?.data?.status
    }
    ))
        .catch(err => axios.isCancel(err) ?
            ({
                data: null,
                success: true,
                cancelToken: true
            })
            :
            ({
                data: err,
                success: false,
                cancelToken: err?.response?.data?.message
            })
        )
}

export default httpClient