import axios from 'axios'

const VerifyToken = (ip) => {

    return new Promise( async (result) => {
        await axios.get('http://' + ip + ':8080/api/auth/tokenVerification/' + globalThis.token, { withCredentials: true }).then((res) => {

            if (res.status === 200) {
                return result(res.data)
            } else {
                return result(false)
            }
        }).catch((error) => {
            console.log('Try again later, Connexion.');
        })
    })
}

export default VerifyToken