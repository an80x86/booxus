import axios from 'react-native-axios';
import serviceUrl from './Url';

function getSatisDetay(id) {   
    return axios.get(`${serviceUrl}param=getInvoicePositions&id=${id}&timestamp=${new Date().getTime()}`);
}

export default getSatisDetay;