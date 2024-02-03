import PageLayout from "@/components/PageLayout";
import { storageService } from "@/services/storage.service";
import useSWR from 'swr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState } from "react";
import Link from "next/link";
import AsyncSelect from "react-select/async"
import { useRouter } from "next/router";
export default function Create() {
    let token = 'Bearer ' + storageService.getToken();
    const router = useRouter();
    let id = router.query.id;
    const fetcher = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then((res) => res.json())
    const { data: villages } = useSWR(process.env.API + '/api/reference/village/search', fetcher)
    const { data: workUnit } = useSWR(process.env.API + '/api/reference/work_unit/show/' + id, id ? fetcher : null)
    const [errors, setErrors] = useState([])
    const formData = {
        name: useRef(),
        registration_number: useRef(),
        address: useRef(),
        zip_code: useRef(),
        village_id: useRef(),
        unit_form: useRef(),
        accreditation: useRef(),
        email: useRef(),
        website: useRef(),
        phone_number: useRef()
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(process.env.API + '/api/reference/work_unit/update/' + id, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name.current.value,
                registration_number: formData.registration_number.current.value,
                address: formData.address.current.value,
                unit_form: formData.unit_form.current.value,
                village_id: formData.village_id.current?.value,
                email: formData.email.current?.value,
                phone_number: formData.phone_number.current?.value,
                website: formData.phone_number.current?.value,
                accreditation: formData.accreditation.current?.value,
                zip_code: formData.zip_code.current?.value,
            })
        }).then((res) => res.json()).then((data) => {
            if (!data.success) {
                toast.error('Terjadi Kesalahan, Mohon cek Kembali Inputa!');
                setErrors(data.data)
            } else {
                toast.success('Berhasil menyimpan data!');
                router.push('/administrator/reference/work-unit')
            }
        })
    };

    const handleVillageChange = (e) => {
        formData.village_id.current = e;
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
    if (!villages || !workUnit) {
        return (
            <PageLayout title={'Edit Unit Kerja'} hasBackUrl={true} backUrl="/administrator/reference/work-unit">

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
        )
    }
    return <>
        <PageLayout title={'Edit Unit Kerja'} hasBackUrl={true} backUrl="/administrator/reference/work-unit">
            <ToastContainer />
            <div className="max-w-5xl mx-auto rounded-2xl shadow-lg p-3 bg-base-100">
                <p className="text-2xl">Form Edit Unit Kerja</p>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-0 md:gap-3 lg:gap-3 md:flex-row lg:flex-row flex-col">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Nama Unit Kerja / Sekolah</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input placeholder="Masukkan Nama Unit Kerja / Sekolah" defaultValue={workUnit.data?.name} className="input input-sm w-full input-bordered" ref={formData.name} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("name")) ? errors.name[0] : ''}</span>
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Nomor Registrasi</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input placeholder="Masukkan Nomor Registrasi" defaultValue={workUnit.data?.registration_number} className="input input-sm w-full input-bordered" ref={formData.registration_number} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("registration_number")) ? errors.registration_number[0] : ''}</span>
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Akreditasi</span>
                                {/* <span className="label-text-alt text-red-500 font-semibold">* Wajib</span> */}
                            </label>
                            <input placeholder="Masukkan Akreditasi jika ada" defaultValue={workUnit.data?.accreditation} className="input input-sm w-full input-bordered" ref={formData.accreditation} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("accreditation")) ? errors.accreditation[0] : ''}</span>
                            </label>
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Bentuk Unit Kerja</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <select className="select select-sm w-full select-bordered font-normal" defaultValue={workUnit.data?.unit_form} ref={formData.unit_form}>
                            <option disabled value={''}>Pilih bentuk unit kerja</option>
                            <option value={'Kantor Dinas'}>Kantor Dinas</option>
                            <option value={'PAUD'}>PAUD</option>
                        </select>
                        <label className="label">
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("unit_form")) ? errors.unit_form[0] : ''}</span>
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    <div className="flex gap-0 md:gap-3 lg:gap-3 md:flex-row lg:flex-row flex-col">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Email</span>
                                {/* <span className="label-text-alt text-red-500 font-semibold">* Wajib</span> */}
                            </label>
                            <input placeholder="Masukkan email" type="email" className="input input-sm w-full input-bordered" defaultValue={workUnit.data?.email} ref={formData.email} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("email")) ? errors.email[0] : ''}</span>
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Website</span>
                                {/* <span className="label-text-alt text-red-500 font-semibold">* Wajib</span> */}
                            </label>
                            <input placeholder="Masukkan Website" className="input input-sm w-full input-bordered" defaultValue={workUnit.data?.email} ref={formData.website} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("website")) ? errors.website[0] : ''}</span>
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Nomor HP / Kontak</span>
                                {/* <span className="label-text-alt text-red-500 font-semibold">* Wajib</span> */}
                            </label>
                            <input placeholder="Masukkan No. HP / Kontak" className="input input-sm w-full input-bordered" defaultValue={workUnit.data?.phone_number} ref={formData.phone_number} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("phone_number")) ? errors.phone_number[0] : ''}</span>
                            </label>
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Kelurahan / Desa</span>
                            {/* <span className="label-text-alt text-red-500 font-semibold">* Wajib</span> */}
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

                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Alamat</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input placeholder="Masukkan Alamat / Nama Jalan" className="input input-sm w-full input-bordered" defaultValue={workUnit.data?.address} ref={formData.address} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("address")) ? errors.address[0] : ''}</span>
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Kode Pos</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input placeholder="Masukkan Kode pos" className="input input-sm w-full input-bordered" defaultValue={workUnit.data?.zip_code} ref={formData.zip_code} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("zip_code")) ? errors.zip_code[0] : ''}</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex w-full justify-end gap-2 mt-2">
                        <Link href={'/administrator/reference/work-unit'}>
                            <span className="btn btn-info btn-outline btn-sm">
                                Kembali
                            </span>
                        </Link>
                        <button className="btn btn-info btn-sm">
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </PageLayout>
    </>
}