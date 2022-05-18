import { useState, useEffect } from "react"
import axios from "axios"
import { Modal, Toast } from "bootstrap"

export default function Mobil() {
    let [mobil, setMobil] = useState([])

    let [idMobil, setIdMobil] = useState(0)
    let [nomorMobil, setNomorMobil] = useState("")
    let [merk, setMerk] = useState("")
    let [jenis, setjenis] = useState("")
    let [warna, setWarna] = useState("")
    let [tahunPembuatan, setTahunPembuatan] = useState("")
    let [biayaSewa, setBiayaSewa] = useState(0)
    let [image, setImage] = useState(null)

    let [action, setAction] = useState("")
    let [message, setMessage] = useState("")
    let [modal, setModal] = useState("")
    let [uploadImage, setUploadImage] = useState(true)

    let token = localStorage.getItem(`token-rent`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    /** create function to show Toast */
    let showToast = message => {
        let myToast = new Toast(
            document.getElementById(`myToast`),
            {
                autohide: true
            }
        )
        /** perintah untuk mengisi state 'message' */
        setMessage(message)
        /** tampilkan toast */
        myToast.show()
    }

    let getMobil = () => {
        let endpoint = `http://localhost:8000/mobil`

        // send data
        axios.get(endpoint, authorization)
            .then(response => {
                setMobil(response.data)
                // showToast(`Test`)
            })
            .catch(error => console.log(error))
    }

    let addMobil = () => {
        modal.show()
        
        setIdMobil(0)
        setNomorMobil("")
        setMerk("")
        setjenis("")
        setWarna("")
        setTahunPembuatan("")
        setBiayaSewa("")
        setImage(null)
        setAction(`insert`)
        setUploadImage(true)
    }

    let editMobil = item => {
        modal.show()
        
        setIdMobil(item.id_mobil)
        setNomorMobil(item.nomor_mobil)
        setMerk(item.merk)
        setjenis(item.jenis)
        setWarna(item.warna)
        setTahunPembuatan(item.tahun_pembuatan)
        setBiayaSewa(item.biaya_sewa)
        setImage(null)
        setAction(`edit`)
        setUploadImage(false)
    }

    useEffect(() => {
        let myModal = new Modal(
            document.getElementById("modal_mobil")
        )
        setModal(myModal)
        getMobil()
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
                <div className="card-header" style={{ background: `darkblue` }}>
                    <h3 className="fw-light" style={{ color: `lightcyan` }}>
                        Daftar Mobil
                    </h3>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {mobil.map(item => (
                            <li className="list-group-item"
                                key={`key-${item.id_mobil}`}>
                                <div className="row">
                                    {/* gambar */}
                                    <div className="col-lg-3">
                                        <img src={`http://localhost:8000/image/${item.image}`}
                                            alt="Pict"
                                            style={{ width: `200px`, height: `150px` }} />
                                    </div>

                                    {/* deskripsi */}
                                    < div className="col-lg-3 p-2">
                                        <h4 className="fw-light">ID : {item.id_mobil}</h4>
                                        <small>Merk : {item.merk}</small> <br />
                                        <small>Jenis : {item.jenis}</small> <br />
                                        <small>Warna : {item.warna}</small> <br />
                                        <small>Tahun Pembuatan : {item.tahun_pembuatan}</small> <br />
                                    </div>

                                    <div className="col-lg-3 p-2" >
                                        <div className="p-1 m-2" style={{ border: `1px solid blue`, background: `lightcyan` }}>
                                            <small>Nomor Mobil</small>
                                            <h6>{item.nomor_mobil}</h6>
                                        </div>
                                        <div className="p-1 m-2" style={{ border: `1px solid blue`, background: `lightskyblue` }}>
                                            <small>Biaya Sewa /hari</small>
                                            <h6>{item.biaya_sewa}</h6>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 p-2">
                                        <div className="d-grid gap-2">
                                            <small className="text-center" style={{ color: `darkblue` }}>
                                                Option
                                            </small>
                                            <button className="btn btn-info btn-sm m-1"
                                            onClick={() => editMobil(item)}>
                                                <span className="fa fa-edit"></span> Edit
                                            </button>
                                            <button className="btn btn-danger btn-sm m-1">
                                                <span className="fa fa-trash"></span> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {/* button add data */}
                    <button className="btn btn-success btn-sm m-2"
                        onClick={() => addMobil()}>
                        <span className="fa fa-plus"></span> Tambah Data
                    </button>

                    {/* modal */}
                    <div className="modal" id="modal_mobil">
                        <div className="modal-dialog modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header" style={{ background: `blueviolet` }}>
                                    <h4 className="text-light fw-light">
                                        Form Mobil
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        Nomor Mobil
                                        <input type="text" className="form-control mb-2" required 
                                        value={nomorMobil} onChange={ev => setNomorMobil(ev.target.value)}/>

                                        Merk
                                        <input type="text" className="form-control mb-2" required 
                                        value={merk} onChange={ev => setMerk(ev.target.value)}/>

                                        Jenis
                                        <input type="text" className="form-control mb-2" required 
                                        value={jenis} onChange={ev => setjenis(ev.target.value)}/>

                                        Warna
                                        <input type="text" className="form-control mb-2" required 
                                        value={warna} onChange={ev => setWarna(ev.target.value)}/>

                                        Tahun Pembuatan
                                        <input type="text" className="form-control mb-2" required
                                        value={tahunPembuatan} onChange={ev => setTahunPembuatan(ev.target.value)} />

                                        Biaya Sewa
                                        <input type="number" className="form-control mb-2" required 
                                        value={biayaSewa} onChange={ev => setBiayaSewa(ev.target.value)}/>

                                        Gambar
                                        <input type="file" 
                                        className={`form-control mb-2 ${uploadImage ? `` : `d-none`}`} 
                                        required={uploadImage}
                                        accept="image/*"
                                        onChange={ev => setImage(ev.target.value[0])} />

                                        <br/>
                                        <button className={`btn btn-sm my-2 ${uploadImage ? `d-none` : ``}`}
                                        type="button"
                                        style={{background: `lightskyblue`}}>
                                            Click to re-upload image 
                                        </button>
                                        <br/>

                                        {/* button  */}
                                        <button className="btn btn-success mx-1" type="submit">
                                            <span className="fa fa-check"></span> Save
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
            </div>
        </div>
    )
}