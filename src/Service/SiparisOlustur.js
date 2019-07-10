import axios from 'react-native-axios';
import serviceUrl from './Url';

function setSiparisOlustur(id) {   
    return axios.get(`${serviceUrl}param=postOrder&id=${id}&timestamp=${new Date().getTime()}`);
}

export default setSiparisOlustur;