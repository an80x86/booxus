import axios from 'react-native-axios';
import serviceUrl from './Url';

function userCheck(email,pass) {   
    return axios.get(`${serviceUrl}param=User&email=${email}&pass=${pass}&timestamp=${new Date().getTime()}`);
}

export default userCheck;