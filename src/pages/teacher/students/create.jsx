import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AsyncSelect from "react-select/async"
import { storageService } from "@/services/storage.service";
function Create() {
    let token = 'Bearer ' + storageService.getToken()
    const router = useRouter();
    const [educations, setEducations] = useState();
    const [incomes, setIncomes] = useState();
    const [parentTypes, setParentTypes] = useState();
    const [jobs, setJobs] = useState();
    const [religions, setReligions] = useState();
    const [residenceTypes, setResidenceTypes] = useState();
    const [transportationTypes, setTransportationTypes] = useState();
    const [reasonReceiveIndonesiaSmartPrograms, setReasonReceiveIndonesiaSmartPrograms] = useState();
    const [villages, setVillages] = useState();
    const [errors, setErrors] = useState([]);
    const [showReason, setShowReason] = useState(false);
    const formData = {
        name: useRef(),
        family_card_number: useRef(),
        id_number: useRef(),
        birth_certificate_registration_number: useRef(),
        birth_place: useRef(),
        birth_date: useRef(),
        gender: useRef(''),
        reference_religion_id: useRef(''),
        reference_work_unit_id: useRef(''),
        mother_name: useRef(''),
        village_id: useRef(''),
        address: useRef(''),
        zip_code: useRef(''),
        is_disabled: useRef(''),
        reference_residence_type_id: useRef(''),
        reference_transportation_type_id: useRef(''),
        child_number: useRef(''),
        is_social_assistance_recipient: useRef(''),
        is_indonesia_smart_card_recipient: useRef(''),
        is_worth_receiving_indonesia_smart_program: useRef(''),
        reference_reason_receive_indonesia_smart_program_id: useRef(''),
    }

    const formDataParent = {
        name: useRef(),
        id_number: useRef(),
        birth_place: useRef(),
        birth_date: useRef(),
        gender: useRef(),
        reference_religion_id: useRef(),
        reference_education_id: useRef(),
        reference_job_id: useRef(),
        reference_income_id: useRef(),
        reference_parent_type_id: useRef(),
        village_id: useRef(),
        zip_code: useRef(),
        is_disabled: useRef(),
        address: useRef(),
    }

    const fetcher = (url, setter) => fetch(process.env.API + url, {
        method: 'GET',
            headers: {
                'Authorization': token
            }
    }).then((res) => res.json()).then((data) => setter(data.data))
  
    
    useEffect(() => {
        fetcher('/api/reference/religion/index', setReligions);
        fetcher('/api/reference/village/search', setVillages);
        fetcher('/api/reference/residence-type/index', setResidenceTypes);
        fetcher('/api/reference/transportation-type/index', setTransportationTypes);
        fetcher('/api/reference/transportation-type/index', setTransportationTypes);
        fetcher('/api/reference/education/index', setEducations);
        fetcher('/api/reference/job/index', setJobs);
        fetcher('/api/reference/income/index', setIncomes);
        fetcher('/api/reference/reason-receive-indonesia-smart-program/index', setReasonReceiveIndonesiaSmartPrograms);
        fetcher('/api/reference/parent-type/index', setParentTypes);
    }, [])

    const handleVillageChange = (e) => {
        formData.village_id.current = e;
    }

    const handleParentVillageChange = (e) => {
        formDataParent.village_id.current = e;
    }
    let filterTimeout;
    const getVillageOptions = (searchTerm, callback) => {
        clearTimeout(filterTimeout)
        filterTimeout = setTimeout(() => {
            fetch(process.env.API + '/api/reference/village/search?terms=' + searchTerm, {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            }).then((res) => res.json()).then((data) => callback(data.data))
        }, 1000)
        
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.API + '/api/headmaster/student-personal-data/store', {
            method: 'post',
            headers: {
                'Authorization': token,
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                name: formData.name.current.value,
                family_card_number: formData.family_card_number.current.value,
                id_number: formData.id_number.current.value,
                birth_certificate_registration_number: formData.birth_certificate_registration_number.current.value,
                birth_place: formData.birth_place.current.value,
                birth_date: formData.birth_date.current.value,
                gender: formData.gender.current.value,
                reference_religion_id: formData.reference_religion_id.current.value,
                // reference_work_unit_id: formData.reference_work_unit_id.current.value,
                mother_name: formData.mother_name.current.value,
                village_id: formData.village_id.current?.value,
                address: formData.address.current.value,
                zip_code: formData.zip_code.current.value,
                is_disabled: formData.is_disabled.current.checked,
                reference_residence_type_id: formData.reference_residence_type_id.current.value,
                reference_transportation_type_id: formData.reference_residence_type_id.current.value,
                child_number: formData.child_number.current.value,
                is_social_assistance_recipient: formData.is_social_assistance_recipient.current.checked,
                is_indonesia_smart_card_recipient: formData.is_indonesia_smart_card_recipient.current.checked,
                is_worth_receiving_indonesia_smart_program: formData.is_worth_receiving_indonesia_smart_program.current.checked,
                reference_reason_receive_indonesia_smart_program_id: formData.reference_reason_receive_indonesia_smart_program_id.current?.value,

                parent_name: formDataParent.name.current.value,
                parent_id_number: formDataParent.id_number.current.value,
                parent_birth_place: formDataParent.birth_place.current.value,
                parent_birth_date: formDataParent.birth_date.current.value,
                parent_gender: formDataParent.gender.current.value,
                parent_address: formDataParent.address.current.value,
                parent_reference_religion_id: formDataParent.reference_religion_id.current.value,
                parent_reference_education_id: formDataParent.reference_education_id.current.value,
                parent_reference_job_id: formDataParent.reference_job_id.current.value,
                parent_reference_income_id: formDataParent.reference_income_id.current.value,
                parent_reference_parent_type_id: formDataParent.reference_parent_type_id.current.value,
                parent_village_id: formDataParent.village_id?.current?.value,
                parent_zip_code: formDataParent.zip_code.current.value,
                parent_is_disabled: formDataParent.is_disabled.current.checked,
            })
        }).then((res) => res.json()).then((data) => {

            if (!data?.success) {
                toast.error('Terjadi Kesalahan, Periksa kembali form isian!', {
                    position: 'bottom-right'
                })
                setErrors(data.data)
            } else if (data?.success) {
                router.push('/teacher/students')
            }

        })
    }

    const toggleReason = checked => {
        setShowReason(checked)
    }

    if (!religions || !villages || !residenceTypes || !transportationTypes || !educations || !jobs || !incomes || !reasonReceiveIndonesiaSmartPrograms || !parentTypes) {
        return <>
            <PageLayout title={'Tambah Peserta Didik'} hasBackUrl={true} backUrl="/headmaster/students">

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
        <PageLayout title={'Tambah Peserta Didik'} hasBackUrl={true} backUrl="/headmaster/students">
            <ToastContainer/>
            <div className="max-w-3xl mx-auto bg-base-100 rounded-lg shadow-lg p-3">
                <form onSubmit={handleSubmit}>
                    <h1 className="font-semibold text-xl text-center mt-3">Data Peserta Didik</h1>
                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Nama Lengkap</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="text" placeholder="Contoh: Ahmad Sulaiman" className="input input-sm w-full input-bordered" ref={formData.name} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("name")) ? errors.name[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Nama Ibu</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="text" placeholder="Contoh: Nur Ahmad" className="input input-sm w-full input-bordered" ref={formData.mother_name} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("mother_name")) ? errors.mother_name[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">NIK</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="number" maxLength="1" placeholder="Contoh: 73020106xxxxxxxx" className="input input-sm w-full input-bordered" ref={formData.id_number} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("id_number")) ? errors.id_number[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Nomor KK</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="number" placeholder="Contoh: 1234xxxxxx" className="input input-sm w-full input-bordered" ref={formData.family_card_number} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("family_card_number")) ? errors.family_card_number[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Nomor Akte Kelahiran</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="number" placeholder="Contoh: 1234xxxxxx" className="input input-sm w-full input-bordered" ref={formData.birth_certificate_registration_number} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("birth_certificate_registration_number")) ? errors.birth_certificate_registration_number[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Anak Ke</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="number" placeholder="Contoh: 1" className="input input-sm w-full input-bordered" ref={formData.child_number} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("child_number")) ? errors.child_number[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 w-full">
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
                            <span className="label-text font-semibold">Kelurahan / Desa</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <AsyncSelect
                            cacheOptions
                            onChange={handleVillageChange}
                            loadOptions={getVillageOptions}
                            placeholder={"Pilih Kecamatan (Cari Kecamatan)"}
                            defaultOptions
                        />
                        <label className="label">
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("village_id")) ? errors.village_id[0] : ''}</span>
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 w-full">
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
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="number" placeholder="Masukkan kdoe pos" className="input input-sm w-full input-bordered" ref={formData.zip_code} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("zip_code")) ? errors.zip_code[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 w-full">
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
                                <span className="label-text font-semibold">Jenis Tempat Tinggal</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <select className="select select-sm select-bordered w-full font-normal" defaultValue={''} ref={formData.reference_residence_type_id}>
                                <option disabled value={''}>Pilih jenis tempat tinggal</option>
                                {
                                    residenceTypes.map((reference, index) => {
                                        return (
                                            <option value={reference.id} key={index}>{reference.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("reference_residence_type_id")) ? errors.reference_residence_type_id[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Agama</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <select className="select select-sm w-full select-bordered font-normal" defaultValue={''} ref={formData.reference_religion_id}>
                                <option disabled value={''}>Pilih agama</option>
                                {
                                    religions.map((reference, index) => {
                                        return (
                                            <option value={reference.id} key={index}>{reference.name}</option>
                                        )
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
                                <span className="label-text font-semibold">Jenis Transportasi</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <select className="select select-sm select-bordered w-full font-normal" defaultValue={''} ref={formData.reference_transportation_type_id}>
                                <option disabled value={''}>Pilih jenis transportasi</option>
                                {
                                    transportationTypes.map((reference, index) => {
                                        return (
                                            <option value={reference.id} key={index}>{reference.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("reference_transportation_type_id")) ? errors.reference_transportation_type_id[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-6 lg:gap-6 w-full">
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">Penerima Bantuan Sosial</span> &nbsp;
                                <input type="checkbox" className="checkbox checkbox-info" ref={formData.is_social_assistance_recipient}/>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">Penerima Kartu Indonesia Pintar</span> &nbsp;
                                <input type="checkbox" className="checkbox checkbox-info" ref={formData.is_indonesia_smart_card_recipient}/>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">Kebutuhan khusus</span> &nbsp;
                                <input type="checkbox" className="checkbox checkbox-info" ref={formData.is_disabled}/>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-6 lg:gap-6 w-full">
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">Layak Menerima Program Indonesia Pintar</span> &nbsp;
                                <input type="checkbox" className="checkbox checkbox-info" onClick={(event) => toggleReason(event.target.checked)} ref={formData.is_worth_receiving_indonesia_smart_program}/>
                            </label>
                        </div>

                    </div>
                    <div className={`${showReason ? '' : 'hidden'} form-control w-full`}>
                        <label className="label">
                            <span className="label-text font-semibold">Alasan Kelayakan</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <select className="select select-sm select-bordered w-full font-normal" defaultValue={''} ref={formData.reference_reason_receive_indonesia_smart_program_id}>
                            <option disabled value={''}>Pilih Alasan</option>
                            {
                                    reasonReceiveIndonesiaSmartPrograms.map((reference, index) => {
                                        return <>
                                            <option value={reference.id} key={index}>{reference.name}</option>
                                        </>
                                    })
                                }
                        </select>
                        <label className="label">

                        </label>
                    </div>

                    <h1 className="font-semibold text-xl text-center mt-6">Data Orangtua / Wali</h1>

                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Nama Lengkap Ibu / Ayah</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="text" placeholder="Contoh: Ahmad Sulaiman" className="input input-sm w-full input-bordered" ref={formDataParent.name} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("parent_name")) ? errors.parent_name[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">NIK</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="number" placeholder="Contoh: 1234567xxx" className="input input-sm w-full input-bordered" ref={formDataParent.id_number} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("parent_id_number")) ? errors.parent_id_number[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Tempat Lahir</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="text" placeholder="Contoh: Makassar" className="input input-sm w-full input-bordered" ref={formDataParent.birth_place} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("parent_birth_place")) ? errors.parent_birth_place[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Tanggal Lahir</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="date" placeholder="Contoh: 1234xxxxxx" className="input x-date input-sm w-full input-bordered" ref={formDataParent.birth_date} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("parent_birth_date")) ? errors.parent_birth_date[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Jenis Kelamin</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <select className="select select-sm w-full select-bordered font-normal" defaultValue={''} ref={formDataParent.gender}>
                                <option disabled value={''}>Pilih jenis kelamin</option>
                                <option value={'Laki-laki'}>Laki-laki</option>
                                <option value={'Perempuan'}>Perempuan</option>
                            </select>
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("parent_gender")) ? errors.parent_gender[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Agama</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <select className="select select-sm w-full select-bordered font-normal" defaultValue={''} ref={formDataParent.reference_religion_id}>
                                <option disabled value={''}>Pilih agama</option>
                                {
                                    religions.map((reference, index) => {
                                        return (
                                            <option value={reference.id} key={index}>{reference.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("parent_reference_religion_id")) ? errors.parent_reference_religion_id[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Pendidikan Terakhir</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <select className="select select-sm w-full select-bordered font-normal" defaultValue={''} ref={formDataParent.reference_education_id}>
                                <option disabled value={''}>Pilih pendidikan terakhir</option>
                                {
                                    educations.map((reference, index) => {
                                        return (
                                            <option value={reference.id} key={index}>{reference.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("parent_reference_education_id")) ? errors.parent_reference_education_id[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Pekerjaan</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <select className="select select-sm w-full select-bordered font-normal" defaultValue={''} ref={formDataParent.reference_job_id}>
                                <option disabled value={''}>Pilih pekerjaan</option>
                                {
                                    jobs.map((reference, index) => {
                                        return (
                                            <option value={reference.id} key={index}>{reference.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("parent_reference_job_id")) ? errors.parent_reference_job_id[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Pemasukan</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <select className="select select-sm w-full select-bordered font-normal" defaultValue={''} ref={formDataParent.reference_income_id}>
                                <option disabled value={''}>Pilih pemasukan</option>
                                {
                                    incomes.map((reference, index) => {
                                        return (
                                            <option value={reference.id} key={index}>{reference.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("parent_reference_income_id")) ? errors.parent_reference_income_id[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Hubungan</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <select className="select select-sm w-full select-bordered font-normal" defaultValue={''} ref={formDataParent.reference_parent_type_id}>
                                <option disabled value={''}>Pilih hubungan</option>
                                {
                                    parentTypes.map((reference, index) => {
                                        return (
                                            <option value={reference.id} key={index}>{reference.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("parent_reference_parent_type_id")) ? errors.parent_reference_parent_type_id[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Kelurahan / Desa</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <AsyncSelect
                            cacheOptions
                            onChange={handleParentVillageChange}
                            loadOptions={getVillageOptions}
                            placeholder={"Pilih Kecamatan (Cari Kecamatan)"}
                            defaultOptions
                        />
                        <label className="label">
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("parent_village_id")) ? errors.parent_village_id[0] : ''}</span>
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 w-full">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Alamat</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="text" placeholder="Masukkan Alamat" className="input input-sm w-full input-bordered" ref={formDataParent.address} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("parent_address")) ? errors.parent_address[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Kode Pos</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="number" placeholder="Masukkan kdoe pos" className="input input-sm w-full input-bordered" ref={formDataParent.zip_code} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("parent_zip_code")) ? errors.parent_zip_code[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">Kebutuhan khusus</span> &nbsp;
                                <input type="checkbox" className="checkbox checkbox-info" ref={formDataParent.is_disabled}/>
                            </label>
                        </div>
                    </div>
                    <div className="flex w-full justify-end gap-3">
                        <Link href={'/administrator/students'}>
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