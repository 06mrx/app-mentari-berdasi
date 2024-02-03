import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import useSWR from 'swr';
import { useRouter } from "next/router";
import { storageService } from "@/services/storage.service";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Index() {
    const router = useRouter();
    let token = 'Bearer ' + storageService.getToken();
    const [selectedData, setSelectedData] = useState();
    const fetcher = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then((res) => res.json())
    const { data: dailyReports, mutate } = useSWR(process.env.API + '/api/headmaster/daily-report/index', fetcher);

    const handleDelete = () => {
        fetch(process.env.API + '/api/headmaster/daily-report/delete/' + selectedData.id, {
            method: 'DELETE',
            headers : {
                'Authorization': token
            }
        }).then((res) => res.json()).then((data) => {
            toast.success('Berhasil menghapus data', {
                position: 'bottom-right'
            })
            document.getElementById('delete-modal').checked = false;
            mutate([`${process.env.API}/api/headmaster/daily-report/index`])
            setSelectedData(null)
        })
    }
    if (!dailyReports) {
        return <>
            <PageLayout title={'Laporan Harian'} hasBackUrl={true} backUrl="/headmaster">
                {/* <div className="flex flex-col md:flex-row lg:flex-row w-full  justify-center items-center gap-3">
                    <div className="flex flex-col w-full md:w-6/12 lg:w-6/12">
                        <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    </div>
                </div> */}
                <div className="flex w-full justify-end mt-3">
                    <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
                </div>
                <div role="status" className="space-y-2.5 animate-pulse overflow-x-auto w-full mt-3  mx-auto bg-base-100 p-3 ">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        #
                                    </label>
                                </th>
                                <th>Aktivitas</th>
                                <th>Tanggal / Waktu</th>

                                <th>Durasi</th>
                                <th>Output</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover">
                                <th>
                                    <label>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4"></div>
                                    </label>
                                </th>
                                <td className="whitespace-normal">
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mt-1"></div>
                                </td>
                                <td>
                                    <div>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 mt-1"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <td>
                                    <div className="font-semibold">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2"></div>
                                    </div>
                                    <div>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mt-1"></div>
                                    </div>
                                    <div>
                                        <span className="text-indigo-500">
                                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3 mt-1"></div>
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <td>
                                    <div className="flex gap-2 items-center">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover">
                                <th>
                                    <label>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4"></div>
                                    </label>
                                </th>
                                <td className="whitespace-normal">
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mt-1"></div>
                                </td>
                                <td>
                                    <div>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 mt-1"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <td>
                                    <div className="font-semibold">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2"></div>
                                    </div>
                                    <div>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mt-1"></div>
                                    </div>
                                    <div>
                                        <span className="text-indigo-500">
                                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3 mt-1"></div>
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <td>
                                    <div className="flex gap-2 items-center">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover">
                                <th>
                                    <label>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4"></div>
                                    </label>
                                </th>
                                <td className="whitespace-normal">
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mt-1"></div>
                                </td>
                                <td>
                                    <div>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 mt-1"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <td>
                                    <div className="font-semibold">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2"></div>
                                    </div>
                                    <div>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mt-1"></div>
                                    </div>
                                    <div>
                                        <span className="text-indigo-500">
                                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3 mt-1"></div>
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <td>
                                    <div className="flex gap-2 items-center">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover">
                                <th>
                                    <label>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4"></div>
                                    </label>
                                </th>
                                <td className="whitespace-normal">
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mt-1"></div>
                                </td>
                                <td>
                                    <div>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 mt-1"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <td>
                                    <div className="font-semibold">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2"></div>
                                    </div>
                                    <div>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mt-1"></div>
                                    </div>
                                    <div>
                                        <span className="text-indigo-500">
                                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3 mt-1"></div>
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <td>
                                    <div className="flex gap-2 items-center">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover">
                                <th>
                                    <label>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4"></div>
                                    </label>
                                </th>
                                <td className="whitespace-normal">
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mt-1"></div>
                                </td>
                                <td>
                                    <div>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 mt-1"></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <td>
                                    <div className="font-semibold">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2"></div>
                                    </div>
                                    <div>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mt-1"></div>
                                    </div>
                                    <div>
                                        <span className="text-indigo-500">
                                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3 mt-1"></div>
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <td>
                                    <div className="flex gap-2 items-center">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>


                    </table>
                </div>
                <input type="checkbox" id="delete-modal" className="modal-toggle" />
                <label htmlFor="delete-modal" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                        <h3 className="text-lg font-bold">Konfirmasi</h3>
                        <p className="py-4">Apakah anda yakin ingin menghapus <span className="font-bold">XYZ</span> ? </p>
                        <div className="modal-action">
                            <label htmlFor="delete-modal" className="btn btn-outline">Tidak</label>
                            <label htmlFor="delete-modal" className="btn">Ya</label>
                        </div>
                    </label>
                </label>
            </PageLayout>
        </>
    }
    return <>
        <PageLayout title={'Laporan Harian'} hasBackUrl={true} backUrl="/headmaster">
            <ToastContainer/>
            {/* <div className="flex flex-col md:flex-row lg:flex-row w-full  justify-center items-center gap-3">
                <div className="flex flex-col w-full md:w-6/12 lg:w-6/12">
                    <div className="bg-white items-center justify-between w-full flex rounded-full shadow-lg px-1 py-1  sticky">
                        <input className="input-sm capitalize font-semibold rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs" type="text" placeholder="Cari" />
                        <div className="bg-gray-600 p-1 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
                            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="flex w-full justify-end mt-3">
                <Link href={'/headmaster/daily-report/create'}>
                    <button className="btn btn-sm btn-info">
                        Tambah
                    </button>
                </Link>
            </div>
            <div className="overflow-x-auto w-full mt-3 shadow-xl mx-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    #
                                </label>
                            </th>
                            <th>Aktivitas</th>
                            <th>Tanggal / Waktu</th>

                            <th>Durasi</th>
                            <th>Output</th>
                            <th>Status</th>
                            <th>Alasan Ditolak</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dailyReports?.data?.data?.map((dailyReport, index) => {
                                return (
                                    <tr className="hover" key={index}>
                                        <th>
                                            <label>
                                                {(dailyReports?.data?.current_page * dailyReports?.data?.per_page) - (dailyReports?.data?.per_page - index) + 1}
                                            </label>
                                        </th>
                                        <td className="whitespace-normal">
                                            {dailyReport.activity}
                                        </td>
                                        <td>
                                            <div>
                                                <div className="">{dailyReport.date}</div>
                                                <div className="text-sm opacity-50">Pukul {dailyReport.start_time} - {dailyReport.end_time}</div>
                                            </div>
                                        </td>
                                        <td>
                                            {dailyReport.duration} Menit
                                        </td>
                                        <td>
                                            <div className="font-semibold">
                                                Jenis Output : {dailyReport.reference_output_unit.name}
                                            </div>
                                            <div>
                                                Jumlah : {dailyReport.output_qty}
                                            </div>
                                            <div>
                                                {
                                                    dailyReport.file ? <span className="text-indigo-500"><Link href={process.env.API + '/' + dailyReport.file} target="_blank">Download File</Link></span> : ''
                                                }

                                            </div>
                                        </td>
                                        <td>
                                            {
                                                (dailyReport.is_approve.toString() === '0' && dailyReport.is_rejected.toString() == '0' ? <span className="badge badge-info">Belum di review</span> : '')

                                            }
                                            {
                                                (dailyReport.is_approve.toString() === '1' && dailyReport.is_rejected.toString() == '0' ? <span className="badge badge-success">Diterima</span> : '')

                                            }
                                            {
                                                (dailyReport.is_approve.toString() === '0' && dailyReport.is_rejected.toString() == '1' ? <span className="badge badge-error">Ditolak</span> : '')

                                            }

                                        </td>
                                        <td>
                                            {dailyReport.reject_reason}
                                        </td>
                                        <td>
                                            <div className="flex gap-2 items-center  justify-end">
                                                <label onClick={() => setSelectedData(dailyReport)} htmlFor="delete-modal" className={`${dailyReport.is_approve.toString() == '1' ? 'hidden' : ''}`}>
                                                    <span className="btn btn-ghost btn-xs">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="#ff0000" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1ZM5 21V6H4V4h5V3h6v1h5v2h-1v15Z"></path></svg>
                                                    </span>
                                                </label>
                                                <Link href={'/headmaster/daily-report/' + dailyReport.id} className={`${dailyReport.is_approve.toString() == '1' ? 'hidden' : ''}`}>
                                                    <span className="btn btn-ghost btn-xs">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="#ffb266" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75l-2.53 2.54l3.75 3.75l2.53-2.54z"></path></svg>
                                                    </span>
                                                </Link>
                                                {/* <Link href={'/administrator/students/1'}>
                                                    <span className="btn btn-ghost btn-xs tooltip tooltip-success mt-1" data-tip='Lihat'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8   rounded-lg rotate-180" viewBox="0 -4 24 24"><path fill="none" stroke="#00ff00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                                                    </span>
                                                </Link> */}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>


                </table>
            </div>
            <input type="checkbox" id="delete-modal" className="modal-toggle" />
            <label htmlFor="delete-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">Konfirmasi</h3>
                    <p className="py-4">Apakah anda yakin ingin menghapus <span className="font-bold">{selectedData?.activity}</span> ? </p>
                    <div className="modal-action">
                        <label htmlFor="delete-modal" className="btn btn-outline btn-info btn-sm">Tidak</label>
                        <button onClick={handleDelete} className="btn btn-sm btn-info">Ya</button>
                    </div>
                </label>
            </label>
        </PageLayout>
    </>
}

export default Index