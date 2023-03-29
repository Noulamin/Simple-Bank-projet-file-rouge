import axios from 'axios'

const VerifyToken = () => {
    return new Promise( async (result) => {
        await axios.get('http://172.16.9.172:8080/api/auth/tokenVerification/' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTljMTk4YmUxM2U5ZTE0YWU5ODQ0OSIsImlhdCI6MTY4MDAwMDM1NX0.IHeYJILgD3uuux2aSvrZtw0B5OIY0L02d7tzsqqWlRw', { withCredentials: true }).then((res) => {

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