import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { storageService } from "@/services/storage.service";
import { ToastContainer, toast } from 'react-toastify';
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';
import useSWR from 'swr';
import mob0 from '../../../../public/assets/images/mob_loc_0.jpeg'
import mob1 from '../../../../public/assets/images/mob_loc_1.png'
import mob2 from '../../../../public/assets/images/mob_loc_2.png'
import desk from '../../../../public/assets/images/desk_loc.png'
export default function Create() {
    const router = useRouter();
    let token = 'Bearer ' + storageService.getToken();
    const fetcher = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then((res) => res.json())
    const { data: outputUnits, error: outputUnitError } = useSWR(process.env.API + '/api/reference/output-unit/index', fetcher);
    const [errors, setErrors] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const formData = {
        activity: useRef(),
        date: useRef(),
        start_time: useRef(),
        end_time: useRef(),
        output_qty: useRef(),
        output: useRef(),
        reference_output_unit_id: useRef(),
        file: useRef(),
        duration: useRef(),
        latitude: useRef(),
        longitude: useRef()
    }

    const postData = new FormData()
    // postData.append('json', payload);

    const imageHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    }
    const handleSubmit = event => {
        event.preventDefault();
        if (formData.longitude.current == undefined || formData.longitude.current == '' || formData.longitude.current == null) {
            // alert('lokasi tidak ditemukan');
            document.getElementById('alert-modal').checked = true;
            return
        }


        locate();
        postData.append('activity', formData.activity.current.value)
        postData.append('duration', formData.duration.current)
        postData.append('date', formData.date.current.value)
        postData.append('start_time', formData.start_time.current.value)
        postData.append('end_time', formData.end_time.current.value)
        postData.append('output_qty', formData.output_qty.current.value)
        postData.append('reference_output_unit_id', formData.reference_output_unit_id.current.value)
        postData.append('latitude', formData.latitude.current)
        postData.append('longitude', formData.longitude.current)


        if (selectedFile)
            postData.append('file', selectedFile);


        event.preventDefault();
        fetch(process.env.API + '/api/teacher/daily-report/store', {
            method: 'POST',
            headers: {
                'Authorization': token,
            },
            body: postData
        }).then((res) => res.json()).then((data) => {
            if (!data.success) {
                setErrors(data.data)
                toast.error('Terjadi Error, periksa kembali form isian!', {
                    position: 'bottom-right'
                })
            } else if (data.success) {
                router.push('/teacher/daily-report');
            }
        })
    }
    const countDuration = () => {
        let start_time = new Date();
        let end_time = new Date();
        let start_val = formData.start_time.current?.value?.split(':');
        let end_val = formData.end_time.current?.value?.split(':');;
        start_time.setHours(start_val[0], start_val[1], 0)
        end_time.setHours(end_val[0], end_val[1], 0)
        let diff = (((end_time - start_time) / 1000) / 60)
        document.getElementById('duration').value = diff;
        formData.duration.current = diff;


    }





    const locate = () => {
        handlePermission();
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            var crd = pos.coords;
            formData.latitude.current = crd.latitude
            formData.longitude.current = crd.longitude
            // document.getElementById('lon').value = crd.longitude;
        };

        function error(err) {

            // alert(`ERROR(${err.code}): ${err.message}`);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
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
    function handlePermission() {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
            if (result.state === "denied") {
                // report(result.state);
                if (detectMob()) {
                    if (document.getElementById('alert-modal-mobile')) {
                        document.getElementById('alert-modal-mobile').checked = true;
                    }
                } else {
                    if (document.getElementById('alert-modal-desktop')) {
                        document.getElementById('alert-modal-desktop').checked = true;
                    }
                }


            } else if (result.state === "granted") {
                if(detectMob()) {
                    if(document.getElementById('alert-modal-mobile')) {
                        document.getElementById('alert-modal-mobile').checked = false;
                    }
                } else {
                    if(document.getElementById('alert-modal-desktop')) {
                        document.getElementById('alert-modal-desktop').checked = false;
                    }
                }
            }
            result.addEventListener("change", () => {
                if (result.state === "granted") {
                    router.push('/teacher/daily-report/create')
                    if (detectMob()) {
                        if (document.getElementById('alert-modal-mobile')) {
                            document.getElementById('alert-modal-mobile').checked = false;
                        }
                    } else {
                        if (document.getElementById('alert-modal-desktop')) {
                            document.getElementById('alert-modal-desktop').checked = false;
                        }
                    }
                }
            });
        });
    }
    if (router.isReady) {
        locate();
    }
    if (!outputUnits) {
        return <>
            <PageLayout title={'Tambah User'} hasBackUrl={false}>

                <div role="status" className="space-y-2.5 animate-pulse max-w-3xl mx-auto bg-base-100 p-3 ">
                    <div className="flex items-center justify-between w-full space-x-5">
                        <div className="h-9 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                        <div className="h-9 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    </div>
                    <br />
                    <div className="h-9 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <br />
                    <div className="flex items-center justify-between w-full space-x-5">
                        <div className="h-9 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                        <div className="h-9 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    </div>
                    <br />
                    <div className="flex items-center justify-between w-full space-x-5">
                        <div className="h-9 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                        <div className="h-9 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    </div>
                    <br />
                    <div className="flex items-center justify-between w-full space-x-5">
                        <div className="h-9 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                        <div className="h-9 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    </div>
                    <br />
                    <div className="h-9 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <br />
                    <div className="h-9 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <span className="sr-only">Loading...</span>
                    <div className="flex justify-end w-full gap-3">
                        <div className="h-9 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                        <div className="h-9 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                    </div>
                </div>

            </PageLayout>
        </>
    }

    return <>
        <PageLayout title={'Tambah Laporan Harian'} hasBackUrl={true} backUrl="/teacher/daily-report">
            <ToastContainer />
            <div className="max-w-5xl mx-auto rounded-2xl shadow-lg p-3 bg-base-100">
                <p className="text-2xl">Form Tambah Laporan Harian</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Aktivitas</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <textarea placeholder="Masukkan Aktivitas" className="textarea w-full input-bordered" ref={formData.activity}>

                        </textarea>
                        <label className="label">
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("activity")) ? errors.activity[0] : ''}</span>
                        </label>
                    </div>
                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Tanggal</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="date" placeholder="Kilgoram" className="input x-date input-sm w-full input-bordered" ref={formData.date} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("date")) ? errors.date[0] : ''}</span>
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Waktu Mulai</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="time" placeholder="Kilgoram" className="input x-date input-sm w-full input-bordered" ref={formData.start_time} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("start_time")) ? errors.start_time[0] : ''}</span>
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Waktu Selesai</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="time" placeholder="Sentimeter" className="input x-date input-sm w-full input-bordered" ref={formData.end_time} onChange={() => countDuration()} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("end_time")) ? errors.end_time[0] : ''}</span>
                            </label>
                        </div>

                    </div>
                    <div className="flex justify-between w-full gap-3">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Durasi (Menit)</span>
                                {/* <span className="label-text-alt text-red-500 font-semibold">* Wajib</span> */}
                            </label>
                            <div className="flex gap-2">
                                <input type="number" placeholder="0" disabled id="duration" className="input x-date input-sm w-full input-bordered" ref={formData.duration} />
                            </div>
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("output_qty")) ? errors.output_qty[0] : ''}</span>
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Jumlah Luaran</span>
                                {/* <span className="label-text-alt text-red-500 font-semibold">* Wajib</span> */}
                            </label>
                            <div className="flex gap-2">
                                <input type="number" placeholder="0" id="duration" className="input x-date input-sm w-full input-bordered" ref={formData.output_qty} />
                            </div>
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("output_qty")) ? errors.output_qty[0] : ''}</span>
                            </label>
                        </div>
                    </div>
                    {/* <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Luaran</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <textarea placeholder="Masukkan luaran" className="textarea w-full input-bordered" ref={formData.output}>

                        </textarea>
                        <label className="label">
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("output")) ? errors.output[0] : ''}</span>

                        </label>
                    </div> */}

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Jenis Luaran</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <select className="select select-sm w-full select-bordered font-normal" defaultValue={''} ref={formData.reference_output_unit_id}>
                            <option disabled value={''}>Pilih jenis luaran</option>
                            {
                                outputUnits?.data?.map((outputUnit, index) => {
                                    return <option value={outputUnit.id} key={index}>{outputUnit.name}</option>
                                })
                            }
                        </select>
                        <label className="label">
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("reference_output_unit_id")) ? errors.reference_output_unit_id[0] : ''}</span>

                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="block">
                            <label className="label">
                                <span className="label-text font-semibold">File Luaran</span>
                                {/* <span className="label-text-alt text-red-500 font-semibold">* Wajib</span> */}
                            </label>
                            <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={imageHandler} />
                            <label className="label">
                                <span className="label-text-alt">File Berekstensi *.pdf, *.docx atau *.doc Dengan Maksimal Size 5MB</span>
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("file")) ? errors.file[0] : ''}</span>
                            </label>
                        </label>
                    </div>
                    {/* <span className="btn btn-info" onClick={() => locate()}>
                        Ambil Lokasi
                    </span> */}
                    {/* <input type="text" id="lon" />
                    <input type="text" id="lat" /> */}
                    <div className="flex w-full justify-end gap-2 mt-2">
                        <Link href={'/teacher/daily-report'}>
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
            <input type="checkbox" id="alert-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Warning!</h3>
                    <div className="py-4">
                        <p>Aktifkan lokasi terlebih dahulu!</p>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="alert-modal" className="btn">Ok</label>
                    </div>
                </div>
            </div>

            <input type="checkbox" id="alert-modal-mobile" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Silahkan Aktifkan Layanan Lokasi Sebelum Melanjutkan!</h3>
                    <div className="py-4">
                        <ol>
                            <li>
                                Aktifkan lokasi pada handphone anda <br />
                                <Image src={mob0} alt="poto">

                                </Image>
                            </li>
                            <li>
                                Klik tahan icon {process.env.APP_NAME} pada handphone anda kemudian klik <span className="font-bold">Setelan Situs</span>.<br />
                                <Image src={mob1} alt="poto">

                                </Image>
                            </li>
                            <li>
                                Aktifkan layanan <span className="font-bold">lokasi</span>
                                <Image src={mob2} alt="poto">

                                </Image>
                            </li>
                            <li>
                                tekan <button className="btn btn-info" onClick={()=> locate()}>REFRESH</button>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            <input type="checkbox" id="alert-modal-desktop" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-full max-w-7xl">
                    <h3 className="font-bold text-2xl">Silahkan Aktifkan Layanan Lokasi Sebelum Melanjutkan!</h3>
                    <div className="py-4">
                        <ol>
                            <li>
                                Gunakan browser <span className="font-bold">google chrome</span>
                                <Image src={desk} alt="poto">

                                </Image>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </PageLayout>
    </>
}