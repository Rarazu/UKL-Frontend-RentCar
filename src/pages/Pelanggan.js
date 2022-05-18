import { useState, useEffect } from "react";
import axios from "axios";

import { Modal } from "bootstrap";
import { Toast } from "bootstrap";

export default function Pelanggan() {
    let [pelanggan, setPelanggan] = useState([])
    let [message, setMessage] = useState("")
    let [modal, setModal] = useState(null)

    let [idPelanggan, setIdPelanggan] = useState(0)
    let [namaPelanggan, setNamaPelanggan] = useState("")
    let [alamatPelanggan, setAlamatPelanggan] = useState("")
    let [kontak, setKontak] = useState("")
    let [action, setAction] = useState("")

    let token = localStorage.getItem(`token-rent`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let showToast = message => {
        let myToast = new Toast(
            document.getElementById(`myToast`),
            {
                autohide: true
            }
        )
        
        // perintah mengisi state 'message'
        setMessage(message)
        // tampilkan toast
        myToast.show()
    }

    let getPelanggan = () => {
        let endpoint = `http://localhost:8000/pelanggan`

        axios.get(endpoint, authorization)
            .then(response => {
                setPelanggan(response.data)
                // showToast(`Test`)
            })
            .catch(error => console.log(error))
    }

    let addPelanggan = () => {
        modal.show()

        setIdPelanggan(0)
        setNamaPelanggan("")
        setAlamatPelanggan("")
        setKontak("")
        setAction(`insert`)
    }

    let editPelanggan = item => {
        modal.show()

        setIdPelanggan(item.id_pelanggan)
        setNamaPelanggan(item.nama_pelanggan)
        setAlamatPelanggan(item.alamat_pelanggan)
        setKontak(item.kontak)
        setAction(`edit`)
    }

    let savePelanggan = event => {
        event.preventDefault()

        modal.hide()
        if (action === 'insert'){
            let endpoint = `http://localhost:8000/pelanggan`
            let request = {
                nama_pelanggan : namaPelanggan,
                alamat_pelanggan : alamatPelanggan,
                kontak : kontak
            }

            // send data
            axios.post(endpoint, request, authorization)
            .then(response => {
                showToast(response.data.message)
                getPelanggan()
            })
            .catch(error => console.log(error))
        } else if (action === 'edit') {
            let endpoint = `http://localhost:8000/pelanggan/${idPelanggan}`
            let request = {
                nama_pelanggan : namaPelanggan,
                alamat_pelanggan : alamatPelanggan,
                kontak : kontak
            }

            // send data
            axios.put(endpoint, request, authorization)
            .then(response => {
                showToast(response.data.message)
                getPelanggan()
            })
            .catch(error => console.log(error))
        }
    }

    let deletePelanggan = item => {
        if (window.confirm(`Are you sure?`)) {
            let endpoint = `http://localhost:8000/pelanggan/${item.id_pelanggan}`

            // send data
            axios.delete(endpoint, authorization)
            .then(response => {
                showToast(response.data.message)
                getPelanggan()
            })
            .catch(error => console.log(error))
        }
    }

    useEffect(() => {
        let modal = new Modal(document.getElementById(`modal_pelanggan`))
        setModal(modal)
        getPelanggan()
    }, [])

    return (
        <div className="container-fluid">

            {/* Start Toast Component */}
            <div className="position-fixed top-0 end-0 p-3"
                style={{ zIndex: 11 }}>
                <div className="toast bg-light" id="myToast">
                    <div className="toast-header text-white" style={{ background: `blueviolet` }}>
                        <strong>Message</strong>
                    </div>
                    <div className="toast-body">
                        {message}
                    </div>
                </div>
            </div>
            {/* End Toast Component */}

            <div className="card m-3">
                <div className="card-header bg-info">
                    <h3 className="fw-light" style={{ color: `darkblue` }}>
                        Daftar Pelanggan
                    </h3>
                </div>
                {/* card body */}
                <div className="card-body">
                    <ul className="list-group">
                        {pelanggan.map(item => (
                            <li className="list-group-item" style={{background: `lightcyan`}}
                                key={`key-${item.id_pelanggan}`}>
                                <div className="row">
                                    {/* < div className="col-lg-4 p-2" >
                                        <div className="p-2" style={{ border: `1px solid gray` }}>
                                            <small style={{ color: `darkblue` }}>
                                                ID
                                            </small>
                                            <h5 className="fw-light">{item.id_pelanggan}</h5>
                                            <small style={{ color: `darkblue` }}>
                                                Nama Pelanggan
                                            </small>
                                            <h5 className="fw-light">{item.nama_pelanggan}</h5>
                                        </div>
                                    </div> */}
                                    <div className="col-lg-3">
                                        <small style={{ color: `darkblue` }}>
                                            ID
                                        </small>
                                        <h5 className="fw-light">{item.id_pelanggan}</h5>
                                        <small style={{ color: `darkblue` }}>
                                            Nama Pelanggan
                                        </small>
                                        <h5 className="fw-light">{item.nama_pelanggan}</h5>
                                    </div>
                                    <div className="col-lg-6">
                                        <small style={{ color: `darkblue` }}>
                                            Alamat Pelanggan
                                        </small>
                                        <h5 className="fw-light">{item.alamat_pelanggan}</h5>
                                        <small style={{ color: `darkblue` }}>
                                            Kontak Pelanggan
                                        </small>
                                        <h5 className="fw-light">{item.kontak}</h5>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="d-grid gap-2">
                                            <small className="text-center" style={{ color: `darkblue` }}>
                                                Option
                                            </small>
                                            <button className="btn btn-info btn-sm m-2"
                                            onClick={() => editPelanggan(item)}>
                                                <span className="fa fa-edit"></span> Edit
                                            </button>
                                            <button className="btn btn-danger btn-sm m-2"
                                            onClick={() => deletePelanggan(item)}>
                                                <span className="fa fa-trash"></span> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {/* button add data */}
                    <button className="btn btn-sm btn-success my-3"
                        onClick={() => addPelanggan()}>
                        <span className="fa fa-plus"></span>
                        Tambah Data
                    </button>

                    {/* modal */}
                    <div className="modal" id="modal_pelanggan">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header" style={{ background: `blueviolet` }}>
                                    <h3 className="fw-light text-light">
                                        Tambah Pelanggan
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={ev => savePelanggan(ev)}>
                                        Nama :
                                        <input type="text" className="form-control mb-2" required 
                                        onChange={e => setNamaPelanggan(e.target.value)}
                                        value={namaPelanggan}/>
                                        Alamat :
                                        <input type="text" className="form-control mb-2" required
                                        onChange={e => setAlamatPelanggan(e.target.value)} 
                                        value={alamatPelanggan}/>
                                        Kontak :
                                        <input type="text" className="form-control mb-2" required 
                                        onChange={e => setKontak(e.target.value)}
                                        value={kontak}/>

                                        <button className="btn btn-success text-white mx-1" type="submit">
                                            <span className="fa fa-check mx-1"></span> Submit
                                        </button>
                                        <button type="button" className="btn btn-secondary mx-1" data-bs-dismiss="modal">
                                            <span className="fa fa-times"></span> Cancel
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end of modal */}
                </div>
                {/* end card body */}
            </div>
        </div>
    )
}