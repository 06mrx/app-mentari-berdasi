import PageLayout from "@/components/PageLayout";
import useSWR from 'swr';
import { storageService } from "@/services/storage.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import Link from "next/link";
export default function Create() {
    let token = 'Bearer ' + storageService.getToken();
    const router = useRouter();
    const [errors, setErrors] = useState([]);
    const fetcher = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then((res) => res.json())
    let id = router.query.id;
    let weight_dev_id = router.query.weight_dev_id;
    let height_dev_id = router.query.height_dev_id;
    if (router.isReady) {
        id = router.query.id;
        weight_dev_id = router.query.weight_dev_id;
        height_dev_id = router.query.height_dev_id;
        
    }
    const { data: student } = useSWR(process.env.API + '/api/headmaster/student-personal-data/show/' + id, id ? fetcher : null)
    const { data: growthDevelopment } = useSWR(process.env.API + '/api/teacher/growth-development/show/' + weight_dev_id + '/' + height_dev_id, weight_dev_id ? fetcher : null);

    const formData = {
        weight: useRef(),
        height: useRef(),
        note: useRef(),
        collection_date : useRef()
    }

    const handleSubmit = event => {
        event.preventDefault();
        fetch(process.env.API + '/api/teacher/growth-development/update/' + weight_dev_id + '/' + height_dev_id, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                weight: formData.weight.current.value,
                height: formData.height.current.value,
                note: formData.note.current?.value,
                collection_date: formData.collection_date.current.value
            })
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            if (!data.success) {
                toast.error('Terjadi kesalahan, silahkan periksa form inputan', {
                    position: 'bottom-right'
                })
                setErrors(data.data)
            } else {
                toast.success('Data berhasil disimpan', {
                    position: 'bottom-right'
                })
                router.push('/teacher/students/' + id + '/growth')
            }
        })
    }
    const getDate = date => {
        let d = new Date(date)
        return d.getFullYear() + '-' + ("0" + (d.getMonth()+1)).slice(-2) + '-' + ("0" + (d.getDate())).slice(-2);
    }
    if (!student || !growthDevelopment) return <></>
    return <>
        <PageLayout title={'Tambah Data Perkembangan Anak'} hasBackUrl={true} backUrl={'/teacher/students/' + id + '/growth'}>
            <ToastContainer />
            <div className="max-w-5xl mx-auto rounded-2xl shadow-lg p-3 bg-base-100">
                <p className="text-2xl">{student?.data?.name} | {student?.data?.reference_work_unit?.name}</p>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Berat</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="number" step="0.01" defaultValue={growthDevelopment.data?.studentWeightDevelopment?.weight} ref={formData.weight} placeholder="Kilgoram" className="input input-sm w-full input-bordered" />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("weight")) ? errors.weight[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Tinggi</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="number" step="0.01" defaultValue={growthDevelopment.data?.studentHeightDevelopment?.height} ref={formData.height} placeholder="Sentimeter" className="input input-sm w-full input-bordered" />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("height")) ? errors.height[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Tanggal Pengambilan Data</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input type="date" defaultValue={getDate(growthDevelopment.data?.studentHeightDevelopment?.collection_date)} ref={formData.collection_date} placeholder="Sentimeter" className="x-date input input-sm w-full input-bordered" />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("collection_date")) ? errors.collection_date[0] : ''}</span>
                                {/* <span className="label-text-alt">Alt label</span> */}
                            </label>
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Catatan</span>
                            {/* <span className="label-text-alt text-red-500 font-semibold">* Wajib</span> */}
                        </label>
                        <textarea type="number" defaultValue={growthDevelopment.data?.studentHeightDevelopment?.note} ref={formData.note} placeholder="Sentimeter" className="textarea w-full input-bordered" >

                        </textarea>
                        <label className="label">
                            <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("note")) ? errors.note[0] : ''}</span>
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>

                    <div className="flex w-full justify-end gap-3">
                        <Link href={'/teacher/students/' + id + '/' + 'growth'}>
                        <span className="btn btn-sm btn-info btn-outline">
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