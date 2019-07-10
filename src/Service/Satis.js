import axios from 'react-native-axios';
import serviceUrl from './Url';

function getSatis(search) {   
    return axios.get(`${serviceUrl}param=Invoice&search=${search}&timestamp=${new Date().getTime()}`);
}

export default getSatis;