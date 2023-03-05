import axios from 'axios'
import Cookies from 'js-cookie';


const VerifyToken = () => {
    const token = Cookies.get('token')
    return new Promise((result) => {
        axios.get('http://localhost:8080/api/auth/tokenVerification/' + token, { withCredentials: true }).then((res) => {

        if (res.status === 200) {
            return result(res.data)
        } else {
            return result(false)
        }
    }).catch((error) => {
        console.log('Try again later, Connexion.');
    })
    })

    // const verifyToken = async () => {
    
    // }
}

export default VerifyToken