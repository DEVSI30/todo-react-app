import {API_BASE_URL} from '../app-config';
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
    const headers = new Headers({
        "Content-Type": "application/json",
    });

    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    const options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };

    if (request) {
        //Get method
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options).then((response) =>
        response.json()
            .then((json)=>{
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
            .catch((error) => {
                console.log(error.status)
                if (error.status === 403) {
                    window.location.href = "/login"
                }

                return Promise.reject(error);
            })
    );

}

export function signIn(userDTO) {
    return call("/auth/signin", "POST", userDTO)
        .then((response) => {
            if(response.token){
                localStorage.setItem(ACCESS_TOKEN, response.token);
                // token이 존재하는 경우 메인 화면으로 리디렉트
                window.location.href = "/";
            }
        })
}

export function signOut() {
    localStorage.removeItem(ACCESS_TOKEN);
    window.location.href = "/login";
}

export function signUp(userDTO) {
    return call("/auth/signup", "POST", userDTO);
}








