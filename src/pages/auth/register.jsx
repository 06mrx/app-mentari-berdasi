import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AsyncSelect from "react-select/async"
import { storageService } from "@/services/storage.service";
function Create() {
    let token = 'Bearer ';
    const router = useRouter();
    const [maritalStatuses, setMaritalStatuses] = useState();
    const [religions, setReligions] = useState();
    const [ranks, setRanks] = useState();
    const [positions, setPositions] = useState();
    const [statuses, setStatuses] = useState();
    const [educations, setEducations] = useState();
    const [villages, setVillages] = useState();
    const [workUnits, setWorkUnits] = useState();
    const [errors, setErrors] = useState([]);
    const [validated, setValidated] = useState(false)
    const [tempData, setTempData] = useState()
    const formData = {
        name: useRef(),
        registration_number: useRef(),
        id_number: useRef(),
        birth_place: useRef(),
        birth_date: useRef(),
        village_address_id: useRef(''),
        village_id: useRef(''),
        address: useRef(''),
        zip_code: useRef(''),
        gender: useRef(''),
        reference_marital_status_id: useRef(''),
        reference_religion_id: useRef(''),
        reference_education_id: useRef(''),
        email: useRef(''),
        password: useRef(''),
        password_verification: useRef(''),
        role_id: '397d5ca4-c888-4114-b8fe-3ebe4098898d', //guru
        phone_number: useRef()
    }

    const formDataValidate = {
        id_number : useRef(),
        phone_number : useRef()
    }

    function detectMob() {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ];

        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });
    }
    if (router.isReady) {
        fetch('https://api-mentari.death-code.site/api/get-ip', {
            method: 'GET'
        }).then((res) => res.json()).then((data) => {
            // let isp = data.isp.toLowerCase();
            if(!(storageService.get('secret')?.toString() == 'true')) {
        
                if(!data.success && detectMob()) {
                  router.push('/warn')
                }
            }
            // if(!data.success) {
            //   router.push('/warn')
            // }
        })
    }

    useEffect(() => {
        fetch(process.env.API + '/api/reference/marital-status/index', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        }).then((res) => res.json()).then((data) => setMaritalStatuses(data.data))

        fetch(process.env.API + '/api/reference/religion/index', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        }).then((res) => res.json()).then((data) => setReligions(data.data))

        fetch(process.env.API + '/api/reference/rank/index', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        }).then((res) => res.json()).then((data) => setRanks(data.data))

        fetch(process.env.API + '/api/reference/position/index', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        }).then((res) => res.json()).then((data) => setPositions(data.data))

        fetch(process.env.API + '/api/reference/status/index', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        }).then((res) => res.json()).then((data) => setStatuses(data.data))

        fetch(process.env.API + '/api/reference/work_unit/list', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        }).then((res) => res.json()).then((data) => setWorkUnits(data.data))

        fetch(process.env.API + '/api/reference/education/index', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        }).then((res) => res.json()).then((data) => setEducations(data.data))

        fetch(process.env.API + '/api/reference/village/search', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        }).then((res) => res.json()).then((data) => setVillages(data.data))

    }, [])

    const handleVillageChange = (e) => {
        formData.village_id.current = e;
        // console.log(formData.reference_location_villages_id.current)
    }

    const handleVillageAddressChange = (e) => {
        formData.village_address_id.current = e;
        // console.log(formData.reference_location_villages_id.current)
    }

    const getVillageOptions = (searchTerm, callback) => {
        fetch(process.env.API + '/api/reference/village/search?terms=' + searchTerm, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        }).then((res) => res.json()).then((data) => callback(data.data))
    }

    const getVillageByCityOptions = (searchTerm, callback) => {
        fetch(process.env.API + '/api/reference/village/searchByCity?terms=' + searchTerm, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        }).then((res) => res.json()).then((data) => callback(data.data))
    }


    function handleSubmitValidate(event) {
        event.preventDefault();
        fetch(process.env.API + '/api/auth/data-validation', {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                id_number : formDataValidate.id_number.current.value,
                phone_number : formDataValidate.phone_number.current.value
            })
        }).then((res) => res.json()).then((data) => {
            if(data.data) {
                setValidated(true)
                setTempData(data.data)
                
            } else {
                setValidated(false)
                toast.error('Data tidak ditemukan!', {
                    position: 'top-right'
                })
            }
        })
    }
    function handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.API + '/api/administrator/personal-data/store', {
            method: 'post',
            headers: {
                'Authorization': token,
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                name: formData.name.current.value,
                registration_number: formData.registration_number.current.value,
                phone_number: formData.phone_number.current.value,
                id_number: formData.id_number.current.value,
                birth_place: formData.birth_place.current.value,
                birth_date: formData.birth_date.current.value,
                village_address_id: formData.village_address_id.current.value,
                village_id: formData.village_id.current.value,
                address: formData.address.current.value,
                zip_code: formData.zip_code.current?.value,
                gender: formData.gender.current.value,
                reference_marital_status_id: formData.reference_marital_status_id.current.value,
                reference_religion_id: formData.reference_religion_id.current.value,
                reference_education_id: formData.reference_education_id.current.value,
                email: formData.email.current.value,
                password: formData.password.current.value,
                password_verification: formData.password_verification.current.value,
                role_id: '397d5ca4-c888-4114-b8fe-3ebe4098898d', //guru
                profession_id: tempData?.reference_profession_id
            })
        }).then((res) => res.json()).then((data) => {

            if (!data?.success) {
                setErrors(data.data)
                toast.error('Terjadi Kesalahan, Periksa kembali form inputan !', {
                    position: 'bottom-right'
                })
            } else if (data?.success) {
                router.push('/auth/login')
            }

        })
    }



    if (!maritalStatuses || !religions || !ranks || !positions || !statuses || !educations || !villages || !workUnits) {
        return <>
            <PageLayout title={'Registrasi TPK'} hasBackUrl={false}>

                <div role="status" class="space-y-2.5 animate-pulse max-w-3xl mx-auto bg-base-100 p-3 ">
                    <div class="flex items-center justify-between w-full space-x-5">
                        <div class="h-9 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                        <div class="h-9 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    </div>
                    <br />
                    <div class="h-9 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <br />
                    <div class="flex items-center justify-between w-full space-x-5">
                        <div class="h-9 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                        <div class="h-9 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    </div>
                    <br />
                    <div class="flex items-center justify-between w-full space-x-5">
                        <div class="h-9 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                        <div class="h-9 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    </div>
                    <br />
                    <div class="flex items-center justify-between w-full space-x-5">
                        <div class="h-9 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                        <div class="h-9 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    </div>
                    <br />
                    <div class="h-9 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <br />
                    <div class="h-9 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <span class="sr-only">Loading...</span>
                    <div className="flex justify-end w-full gap-3">
                        <div class="h-9 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                        <div class="h-9 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                    </div>
                </div>

            </PageLayout>
        </>
    }
    return <>
        <PageLayout title={'Registrasi TPK'} hasBackUrl={true} backUrl="/">
            <ToastContainer />
            <div className="max-w-3xl mx-auto bg-base-100 rounded-lg shadow-lg p-3">
                <form onSubmit={handleSubmitValidate} className="mb-10">
                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">NIK</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="text" placeholder="Contoh: 370***************" className="input input-sm w-full input-bordered" ref={formDataValidate.id_number} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("id_number")) ? errors.id_number[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">No. Hp Pembagian (Indosat)</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="text" placeholder="Contoh: 0815********" className="input input-sm w-full input-bordered" ref={formDataValidate.phone_number} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("phone_number")) ? errors.phone_number[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>
                    <div className="flex w-full justify-end">
                        <button className="btn btn-info btn-sm normal-case">
                            Cari Data
                        </button>
                    </div>
                </form>
                <form onSubmit={handleSubmit} className={validated ? '' : 'hidden'}>
                    <div className="flex gap-3 w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Nama Lengkap</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="text" placeholder="Contoh: Ahmad Sulaiman" defaultValue={tempData?.name} disabled className="input input-sm w-full input-bordered" ref={formData.name} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("name")) ? errors.name[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">NIP / No. Anggota</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="text" placeholder="Contoh: 1997xxxxxx" className="input input-sm w-full input-bordered" defaultValue={tempData?.registration_number
                            } disabled ref={formData.registration_number} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("registration_number")) ? errors.registration_number[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">NIK</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="number" maxLength="1" placeholder="Contoh: 73020106xxxxxxxx" disabled defaultValue={tempData?.id_number} className="input input-sm w-full input-bordered" ref={formData.id_number} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("id_number")) ? errors.id_number[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">No HP</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="number" maxLength="1" placeholder="Contoh: 0822" className="input input-sm w-full input-bordered" disabled defaultValue={tempData?.phone_number} ref={formData.phone_number} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("phone_number")) ? errors.phone_number[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Tempat Lahir</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="text" placeholder="Contoh: Makassar" className="input input-sm w-full input-bordered" ref={formData.birth_place} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("birth_place")) ? errors.birth_place[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Tanggal Lahir</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="date" placeholder="Contoh: 1234xxxxxx" className="input x-date input-sm w-full input-bordered" ref={formData.birth_date} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("birth_date")) ? errors.birth_date[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Kelurahan / Desa Tempat Tinggal</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <AsyncSelect
                            cacheOptions
                            onChange={handleVillageAddressChange}
                            loadOptions={getVillageOptions}
                            placeholder={"Pilih Kecamatan (Cari Kecamatan)"}
                            defaultOptions
                        />
                        <label className="label">
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("village_id")) ? errors.village_id[0] : ''}</span>
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Kelurahan / Desa TPK</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <AsyncSelect
                            
                            onChange={handleVillageChange}
                            loadOptions={getVillageByCityOptions}
                            placeholder={"Pilih Kecamatan (Cari Kecamatan)"}
                         
                        />
                        <label className="label">
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("village_id")) ? errors.village_id[0] : ''}</span>
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    <div className="flex gap-3 w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Alamat</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="text" placeholder="Masukkan Alamat" className="input input-sm w-full input-bordered" ref={formData.address} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("address")) ? errors.address[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Kode Pos</span>
                                {/* <span className="label-text-alt text-red-500 font-semibold">* Wajib</span> */}
                            </label>
                            <input type="number" placeholder="Masukkan kdoe pos" className="input input-sm w-full input-bordered" ref={formData.zip_code} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("zip_code")) ? errors.zip_code[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Jenis Kelamin</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <select className="select select-sm w-full select-bordered font-normal" defaultValue={''} ref={formData.gender}>
                                <option disabled value={''}>Pilih jenis kelamin</option>
                                <option value={'Laki-laki'}>Laki-laki</option>
                                <option value={'Perempuan'}>Perempuan</option>
                            </select>
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("gender")) ? errors.gender[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Status Perkawinan</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <select className="select select-sm select-bordered w-full font-normal" defaultValue={''} ref={formData.reference_marital_status_id}>
                                <option disabled value={''}>Pilih status perkawinan</option>
                                {
                                    maritalStatuses.map((reference, index) => {
                                        return <>
                                            <option value={reference.id} key={index}>{reference.name}</option>
                                        </>
                                    })
                                }
                            </select>
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("reference_marital_status_id")) ? errors.reference_marital_status_id[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Agama</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <select className="select select-sm w-full select-bordered font-normal" defaultValue={''} ref={formData.reference_religion_id}>
                                <option disabled value={''}>Pilih agama</option>
                                {
                                    religions.map((reference, index) => {
                                        return <>
                                            <option value={reference.id} key={index}>{reference.name}</option>
                                        </>
                                    })
                                }
                            </select>
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("reference_religion_id")) ? errors.reference_religion_id[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Pendidikan</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <select className="select select-sm select-bordered w-full font-normal" defaultValue={''} ref={formData.reference_education_id}>
                                <option disabled value={''}>Pilih pendidikan</option>
                                {
                                    educations.map((reference, index) => {
                                        return <>
                                            <option value={reference.id} key={index}>{reference.name}</option>
                                        </>
                                    })
                                }
                            </select>
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("reference_education_id")) ? errors.reference_education_id[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>



                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input type="text" placeholder="Contoh : contoh@gmail.com" className="input input-sm w-full input-bordered" ref={formData.email} />
                        <label className="label">
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("email")) ? errors.email[0] : ''}</span>
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    <div className="flex gap-3 w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="password" placeholder="**********" className="input input-sm w-full input-bordered" ref={formData.password} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("password")) ? errors.password[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Konfirmasi Passowrd</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="password" placeholder="Masukkan kembali password" className="input input-sm w-full input-bordered" ref={formData.password_verification} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("password_verification")) ? errors.password_verification[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>
                    {/* <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Role</span>
                        <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                    </label>
                    <select className="select select-sm select-bordered w-full font-normal">
                        <option disabled selected>Pilih Role</option>
                        <option>Belum Kawin</option>
                    </select>
                    <label className="label">

                    </label>
                </div> */}
                    <div className="flex w-full justify-end gap-3">
                        <Link href={'/'}>
                            <span className="btn btn-sm btn-info btn-outline">Kembali</span>
                        </Link>
                        <button type="submit" className="btn btn-sm btn-info">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </PageLayout>
    </>
}

export default Create