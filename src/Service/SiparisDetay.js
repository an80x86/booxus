import axios from 'react-native-axios';
import serviceUrl from './Url';

function getSiparisDetay(id) {   
    return axios.get(`${serviceUrl}param=getOrderPositions&id=${id}&timestamp=${new Date().getTime()}`);
}

export default getSiparisDetay;