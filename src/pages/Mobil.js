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
    let [modalSewa, setModalSewa] = useState("")
    let [uploadImage, setUploadImage] = useState(true)

    // sewa 
    let [pelanggan, setPelanggan] = useState([])
    let [selectedPelanggan, setSelectedPelanggan] = useState("")
    let [selectedDate, setSelectedDate] = useState("")
    let [selectedBack, setSelectedBack] = useState("")
    // sewa


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

    let saveMobil = ev => {
        ev.preventDefault()
        modal.hide()

        if (action === `insert`) {
            let endpoint = `http://localhost:8000/mobil`
            let request = new FormData()
            request.append(`nomor_mobil`, nomorMobil)
            request.append(`merk`, merk)
            request.append(`jenis`, jenis)
            request.append(`warna`, warna)
            request.append(`tahun_pembuatan`, tahunPembuatan)
            request.append(`biaya_sewa`, biayaSewa)
            request.append(`image`, image)

            axios.post(endpoint, request, authorization)
                .then(response => {
                    showToast(response.data.message)
                    getMobil()
                })
                .catch(error => console.log(error))
        } else if (action === `edit`) {
            let endpoint = `http://localhost:8000/mobil/${idMobil}`
            let request = new FormData()
            request.append(`nomor_mobil`, nomorMobil)
            request.append(`merk`, merk)
            request.append(`jenis`, jenis)
            request.append(`warna`, warna)
            request.append(`tahun_pembuatan`, tahunPembuatan)
            request.append(`biaya_sewa`, biayaSewa)

            if (uploadImage === true) {
                request.append(`image`, image)
            }

            axios.put(endpoint, request, authorization)
                .then(response => {
                    showToast(response.data.message)
                    getMobil()
                })
                .catch(error => console.log(error))
        }
    }

    let deleteMobil = item => {
        if (window.confirm(`Are you sure?`)) {
            let endpoint = `http://localhost:8000/mobil/${item.id_mobil}`

            axios.delete(endpoint, authorization)
                .then(response => {
                    showToast(response.data.message)
                    getMobil()
                })
                .catch(error => console.log(error))
        }
    }

    let getPelanggan = () => {
        let endpoint = "http://localhost:8000/pelanggan"
        axios.get(endpoint, authorization)
            .then(response => {
                setPelanggan(response.data)
            })
            .catch(error => console.log(error))
    }

    let addSewa = item => {
        modalSewa.show()
        setIdMobil(item.id_mobil)
        setMerk(item.merk)
        setBiayaSewa(item.biaya_sewa)
    }

    let saveSewa = () => {
        if (window.confirm(`Sure to save this data?`)) {
            let karyawan = JSON.parse(localStorage.getItem(`karyawan-rent`))
            let id = karyawan.id_karyawan

            let endpoint = `http://localhost:8000/sewa`
            let request = {
                id_mobil: idMobil,
                id_karyawan: id,
                id_pelanggan: selectedPelanggan,
                tgl_sewa: selectedDate,
                tgl_kembali: selectedBack
            }

            axios.post(endpoint, request, authorization)
                .then(response => {
                    alert(response.data.message)
                    getMobil()
                })
                .catch(error => console.log(error))
        }
    }

    useEffect(() => {
        let myModal = new Modal(
            document.getElementById("modal_mobil")
        )
        setModal(myModal)

        let sewa = new Modal(
            document.getElementById("modal_sewa")
        )
        setModalSewa(sewa)
        getMobil()
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
                                    <div className="col-lg-3 text-center">
                                        <img src={`http://localhost:8000/image/${item.image}`}
                                            alt="Pict"
                                            style={{ width: `200px`, height: `150px` }} />
                                    </div>

                                    {/* deskripsi */}
                                    < div className="col-lg-3">
                                        <small className="fst-italic" style={{ color: `darkblue` }}>Merk</small>
                                        <h5 className="fw-bold">{item.merk}</h5>
                                        <small>Biaya Sewa</small>
                                        <h5 className="fw-bold">{item.biaya_sewa} / hari</h5>
                                    </div>

                                    <div className="col-lg-3 p-2" >
                                        <h4 className="fw-light">ID : {item.id_mobil}</h4>
                                        <small>Nomor Mobil : {item.nomor_mobil}</small> <br />
                                        <small>Jenis : {item.jenis}</small> <br />
                                        <small>Warna : {item.warna}</small> <br />
                                        <small>Tahun Pembuatan : {item.tahun_pembuatan}</small> <br />
                                    </div>

                                    <div className="col-lg-1 p-2">
                                        <div className="d-grid gap-2">
                                            <small className="text-center" style={{ color: `darkblue` }}>
                                                Option
                                            </small>
                                            <button className="btn btn-info btn-sm m-1"
                                                onClick={() => editMobil(item)}>
                                                <span className="fa fa-edit"></span>
                                            </button>
                                            <button className="btn btn-danger btn-sm m-1"
                                                onClick={() => deleteMobil(item)}>
                                                <span className="fa fa-trash"></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 p-2">
                                        <div className="d-grid gap-2">
                                            <small className="text-center" style={{ color: `darkblue` }}>
                                                Sewa
                                            </small>
                                            <button className="btn btn-warning btn-sm m-1"
                                                onClick={() => addSewa(item)}>
                                                <span className="fa fa-shopping-basket"></span> Sewa
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
                        <span className="fa fa-plus"></span> Tambah Mobil
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
                                    <form onSubmit={(ev) => saveMobil(ev)}>
                                        Nomor Mobil
                                        <input type="text" className="form-control mb-2" required
                                            value={nomorMobil} onChange={ev => setNomorMobil(ev.target.value)} />

                                        Merk
                                        <input type="text" className="form-control mb-2" required
                                            value={merk} onChange={ev => setMerk(ev.target.value)} />

                                        Jenis
                                        <input type="text" className="form-control mb-2" required
                                            value={jenis} onChange={ev => setjenis(ev.target.value)} />

                                        Warna
                                        <input type="text" className="form-control mb-2" required
                                            value={warna} onChange={ev => setWarna(ev.target.value)} />

                                        Tahun Pembuatan
                                        <input type="text" className="form-control mb-2" required
                                            value={tahunPembuatan} onChange={ev => setTahunPembuatan(ev.target.value)} />

                                        Biaya Sewa
                                        <input type="number" className="form-control mb-2" required
                                            value={biayaSewa} onChange={ev => setBiayaSewa(ev.target.value)} />

                                        Gambar
                                        <input type="file"
                                            className={`form-control mb-2 ${uploadImage ? `` : `d-none`}`}
                                            required={uploadImage}
                                            accept="image/*"
                                            onChange={ev => setImage(ev.target.files[0])} />

                                        <br />
                                        <button className={`btn btn-sm my-2 ${uploadImage ? `d-none` : ``}`}
                                            type="button"
                                            style={{ background: `lightskyblue` }}
                                            onClick={() => setUploadImage(true)}>
                                            Click to re-upload image
                                        </button>
                                        <br />

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

                    {/* modal sewa */}
                    <div className="modal" id="modal_sewa">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header" style={{ background: `#1974D2` }}>
                                    <h4 className="fw-light text-white">Form Sewa</h4>
                                </div>
                                <div className="modal-body">
                                    <h6 className="fw-bold">Deskripsi Mobil yang disewa :</h6>
                                    <div className="row p-2">
                                        <div className="col-3">
                                            ID Mobil
                                        </div>
                                        <div className="col-9">
                                            <input type="text" className="form-control mb-2" required
                                                value={idMobil} onChange={ev => setIdMobil(ev.target.value)} />
                                        </div>

                                        <div className="col-3">
                                            Merk
                                        </div>
                                        <div className="col-9">
                                            <input type="text" className="form-control mb-2" required
                                                value={merk} onChange={ev => setMerk(ev.target.value)} />
                                        </div>

                                        <div className="col-3">
                                            Biaya Sewa
                                        </div>
                                        <div className="col-9">
                                            <input type="number" className="form-control mb-2" required
                                                value={biayaSewa} onChange={ev => setBiayaSewa(ev.target.value)} />
                                        </div>
                                    </div>

                                    <br />
                                    <h6 className="fw-bold">Form Penyewaan :</h6>
                                    <div className="row p-2">
                                        <div className="col-4">
                                            Pilih Pelanggan :
                                        </div>
                                        <div className="col-8">
                                            <select className="form-control"
                                            onChange={ev => setSelectedPelanggan(ev.target.value)}
                                            value={selectedPelanggan}>
                                                <option value="">
                                                    --- List Pelanggan ---
                                                </option>
                                                {pelanggan.map(item => (
                                                    <option value={item.id_pelanggan}
                                                        key={`key${item.id_pelanggan}`}>
                                                        {item.nama_pelanggan}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-4 my-2">
                                            Tanggal Sewa :
                                        </div>
                                        <div className="col-8 my-2">
                                            <input type="date"
                                                className="form-control"
                                                onChange={ev => setSelectedDate(ev.target.value)}
                                                value={selectedDate} />
                                        </div>

                                        <div className="col-4 my-2">
                                            Tanggal Kembali :
                                        </div>
                                        <div className="col-8 my-2">
                                            <input type="date"
                                                className="form-control"
                                                onChange={ev => setSelectedBack(ev.target.value)}
                                                value={selectedBack} />
                                        </div>
                                    </div>

                                    <button className="btn btn-success mx-1" 
                                    onClick={() => saveSewa()}>
                                        <span className="fa fa-check"></span> Save
                                    </button>
                                    <button type="button" className="btn btn-secondary mx-1" data-bs-dismiss="modal">
                                        <span className="fa fa-times"></span> Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end modal sewa */}
                </div>
            </div>
        </div>
    )
}