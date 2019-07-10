import axios from 'react-native-axios';
import serviceUrl from './Url';

function getTahsilat(search) {   
    return axios.get(`${serviceUrl}param=checkAccountTransaction&search=${search}&timestamp=${new Date().getTime()}`);
}

export default getTahsilat;