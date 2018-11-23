import Axios from 'react-native-axios'

const Obj = {}
Obj.protocol = "http"
Obj.server = "여행해.한국"
Obj.port = "80"

Obj.url = Obj.protocol + "://" + Obj.server // + ":" + Obj.port

Obj.axios = Axios.create({
    baseURL: Obj.url,
    withCredentials: true
})

Obj.userInfo = Obj.url + "/accounts"
Obj.regist = Obj.url + "/accounts/create"
Obj.login = Obj.url + "/accounts/login"

module.exports = Obj
