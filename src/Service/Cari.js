import axios from 'react-native-axios';
import serviceUrl from './Url';

function getCaris(search) {   
    return axios.get(`${serviceUrl}param=Contact&search=${search}&timestamp=${new Date().getTime()}`);
}

export default getCaris;