import { useState, useEffect } from "react"
import axios from "axios"

export default function Sewa(){
    let [sewa, setSewa] = useState([])
    let [pelanggan, setPelanggan] = useState([])
    let [karyawan, setKaryawan] = useState([])
    let [mobil, setMobil] = useState([])

    let token = localStorage.getItem(`token-rent`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getData = () => {
        let endpoint = "http://localhost:8000/sewa"

        axios.get(endpoint, authorization)
            .then(result => {
                setSewa(result.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getData()
    })

    return(
        <div className="container-fluid">
            <div className="card m-3">
                <div className="card-header" style={{ background: `darkblue` }}>
                    <h3 className="fw-light" style={{ color: `lightcyan` }}>
                        Daftar Sewa
                    </h3>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {sewa.map(item => (
                            <li className="list-group-item"
                            key={`key-${item.id_sewa}`}>
                                <div className="row m-2">
                                    <div className="col-lg-3">
                                        <small className="fst-italic" style={{ color: `darkblue` }}>
                                            ID Penyewa
                                        </small>
                                        <h5 className="fw-bold">
                                            {item.id_pelanggan}
                                        </h5>
                                        <small className="fst-italic" style={{ color: `darkblue` }}>
                                            Nama Penyewa
                                        </small>
                                        <h5 className="fw-bold">
                                            {item.pelanggan.nama_pelanggan}
                                        </h5>
                                    </div>
                                    <div className="col-lg-3">
                                        <small className="fst-italic" style={{ color: `darkblue` }}>
                                            Mobil yang disewa :
                                        </small>
                                        <h5 className="fw-bold p-2"> 
                                            {item.mobil.id_mobil}
                                        </h5>
                                        <h5 className="fw-bold p-2"> 
                                            {item.mobil.merk}, {item.mobil.jenis}
                                        </h5>
                                        <h5 className="fw-bold p-2">
                                            {item.mobil.biaya_sewa} / hari
                                        </h5>
                                    </div>
                                    <div className="col-lg-2"></div>
                                    <div class="card col-lg-3" style={{ background: `lightblue` }}>
                                        <div class="card-header fw-bold">
                                            Karyawan yang melayani :
                                        </div>
                                        <div class="card-body">
                                            <ul>
                                                <li>
                                                    ID : {item.karyawan.id_karyawan}
                                                </li>
                                                <li>
                                                    Nama : {item.karyawan.nama_karyawan}
                                                </li>
                                                <li>
                                                    Username : {item.karyawan.username}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}