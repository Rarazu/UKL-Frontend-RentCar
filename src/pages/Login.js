import { useState } from "react"
import axios from "axios"

export default function Login(){
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")

    let loginProcess = ev => {
        ev.preventDefault()

        let request = {
            username: username,
            password: password
        } 

        let endpoint = `http://localhost:8000/karyawan/auth`

        // sending data
        axios.post(endpoint, request)
        .then(response => {
            if (response.data.logged == true) {
                let token = response.data.token
                localStorage.setItem(`token-rent`, token)
                
                let dataKaryawan = JSON.stringify(response.data.dataKaryawan)
                localStorage.setItem(`karyawan-rent`, dataKaryawan)
                alert(`Login Berhasil`)
            } else {
                alert(response.data.message)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    return(
        <div className="container">
            <div className="col-lg-5 mx-auto my-5">
                <div className="card">
                    <div className="card-header" style={{background: `blueviolet`}}>
                        <h3 className="text-light fw-light">
                            Log In Karyawan
                        </h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={ev => loginProcess(ev)}>
                            <h5 className="fw-light">Username</h5>
                            <input type={`text`} className="form-control mb-2" required
                            value={username} onChange={(ev) => setUsername(ev.target.value)} />

                            <h5  className="fw-light">Password</h5>
                            <input type={`password`} className="form-control mb-2" required
                            value={password} onChange={(ev) => setPassword(ev.target.value)} />

                            <button type="submit" className="btn btn-dark">
                                Log In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}