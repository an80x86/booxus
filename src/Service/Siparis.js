import axios from 'react-native-axios';
import serviceUrl from './Url';

function getSiparis(search) {   
    return axios.get(`${serviceUrl}param=Order&search=${search}&timestamp=${new Date().getTime()}`);
}

export default getSiparis;