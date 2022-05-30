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
            <div className="row">
            <div className="col-lg-6 col-md-6">
                <img src="https://i.pinimg.com/564x/81/8f/48/818f48a8dcdf8764a5b955c4f3b41e67.jpg" alt="pict" 
                style={{ width: `500px`, height: `400px` }} className="p-3" />
            </div>
            <div className="col-lg-5 col-md-5 my-5">
                {/* <h3 className="fw-bold">Zauva Car</h3> */}
                <div className="card">
                    <div className="card-header" style={{background: `#488AC7`}}>
                        <h4 className="text-light fw-light">
                            Log In Karyawan
                        </h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={ev => loginProcess(ev)}>
                            <h6 className="fw-light">Username</h6>
                            <input type={`text`} className="form-control mb-2" required
                            value={username} onChange={(ev) => setUsername(ev.target.value)} />

                            <h6 className="fw-light">Password</h6>
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
        </div>
    )
}