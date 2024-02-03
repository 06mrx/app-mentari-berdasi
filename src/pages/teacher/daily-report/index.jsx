import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import useSWR from 'swr';
import { useRouter } from "next/router";
import { storageService } from "@/services/storage.service";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
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
    const { data: dailyReports, mutate } = useSWR(process.env.API + '/api/teacher/daily-report/index?page=' + (router.query.page ? router.query.page : ''), fetcher);

    const handleDelete = () => {
        fetch(process.env.API + '/api/teacher/daily-report/delete/' + selectedData.id, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        }).then((res) => res.json()).then((data) => {
            toast.success('Berhasil menghapus data', {
                position: 'bottom-right'
            })
            document.getElementById('delete-modal').checked = false;
            mutate([`${process.env.API}/api/teacher/daily-report/index`])
            setSelectedData(null)
        })
    }
    const handlePagination = (index) => {
        // setPageIndex(index)
        // alert(index.includes('Next'))
        if (index.includes('Next')) {
            index = router.query.page ? parseInt(router.query.page) + 1 : 2;
        }
        index = parseInt(index)

        if (index > dailyReports.data?.last_page || index < 1) return
        router.push({
            pathname: '/teacher/daily-report',
            query: { ...router.query, page: parseInt(index), search: router.query.search ? router.query.search : '', unit_id: router.query.unit_id ? router.query.unit_id : '' }
        },
            undefined,
            {}
        )
    }
    if (!dailyReports) {
        return <>
            <PageLayout title={'Laporan Harian'} hasBackUrl={true} backUrl="/teacher">
                <div className="flex flex-col md:flex-row lg:flex-row w-full  justify-center items-center gap-3">
                    <div className="flex flex-col w-full md:w-6/12 lg:w-6/12">
                        <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    </div>
                </div>
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
        <PageLayout title={'Laporan Harian'} hasBackUrl={true} backUrl="/teacher">
            <ToastContainer />
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
            <div className="hidden md:flex lg:flex w-full justify-end mt-3">
                <Link href={'/teacher/daily-report/create'}>
                    <button className="btn btn-sm btn-info">
                        Tambah
                    </button>
                </Link>
            </div>

            <div className="flex md:hidden lg:hidden fixed bottom-10 right-5 w-full justify-end mt-3 z-[101]">
                <Link href={'/teacher/daily-report/create'}>
                    <button className="btn btn-circle btn-warning shadow-xl">
                        +
                    </button>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
                {
                    dailyReports?.data?.data?.map((dailyReport, index) => {
                        return (
                            <div className="card shadow-xl bg-base-100 group" key={index}>
                                {/* process.env.API + '/' + dailyReport.file */}
                                <figure className="w-full bg-black  min-h-27 md:h-52 lg:h-52">
                                    {/* <img src={"/assets/images/product.jpg"} alt="car!" /> */}
                                    <Image src={dailyReport.file ? process.env.API + '/' + dailyReport.file : '/assets/images/placeholder-image.jpeg'} alt="image" width="1" height="1" layout="responsive" />
                                </figure>
                                <div className="p-2 text-sm md:text-base lg:text-base  relative">
                                    <div className="flex justify-between mt-5">
                                        <p>{dailyReport.activity}</p>
                                    </div>
                                    {/* <div className="flex justify-between text-sm mt-2">
                                        <p>Durasi</p>
                                        <p> {dailyReport.duration} Menit</p>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <p>Jenis Output / Jmlh</p>
                                        <p> {dailyReport.reference_output_unit.name} / {dailyReport.output_qty}</p>
                                    </div> */}
                                    <div className={dailyReport.file ? 'flex justify-center w-full text-sm' : 'hidden'}>
                                        <Link href={process.env.API + '/' + dailyReport.file} target="_blank">
                                            <span className=" text-primary text-right">
                                                Unduh / Lihat
                                            </span>
                                        </Link>
                                    </div>
                                    <div className="flex justify-center absolute top-0 -mt-3">
                                        <span className="badge badge-info">{dailyReport.date}</span>
                                    </div>
                                    <div className="hidden group-hover:block">

                                        <div className="flex justify-between gap-2 absolute top-0 right-0 -mt-3">
                                            <label onClick={() => setSelectedData(dailyReport)} htmlFor="delete-modal" className={`${dailyReport.is_approve.toString() == '1' ? 'hidden' : ''}`}>
                                                <span className="btn btn-error btn-xs">
                                                    Hapus
                                                </span>
                                            </label>
                                            <Link href={'/teacher/daily-report/' + dailyReport.id} className={`${dailyReport.is_approve.toString() == '1' ? 'hidden' : ''}`}>
                                                <span className="btn btn-warning btn-xs">
                                                    Edit
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                    {/* <div className="flex justify-end w-full gap-2 mt-2">
                                        <span className="opacity-80 text-sm">{dailyReport.date}</span>
                                    </div> */}


                                </div>
                            </div>
                        )
                    })
                }

            </div>
            <div className={`${dailyReports?.data?.first_page_url == dailyReports?.data?.last_page_url ? 'hidden' : ''} grid w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible`}>
                <nav>
                    <ul className="flex">
                        {
                            dailyReports?.data?.links?.map((link, index) => {
                                return <span className=" cursor-pointer" key={index}>
                                    <label onClick={() => {
                                        handlePagination((link.label))
                                    }} className={`${dailyReports?.data?.current_page == link.label ? 'bg-sky-500' : 'bg-base-100'} mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100  p-0 text-sm cursor-pointer text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300`} aria-label="Previous">
                                        <span className="material-icons text-sm"> {link.label.replace('&laquo; Previous', '<<').replace('Next &raquo;', '>>')} </span>
                                    </label>
                                </span>
                            })
                        }
                    </ul>
                </nav>
            </div>
            {/* <div className="overflow-x-auto w-full mt-3 shadow-xl mx-auto">
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
                                                <Link href={'/teacher/daily-report/' + dailyReport.id} className={`${dailyReport.is_approve.toString() == '1' ? 'hidden' : ''}`}>
                                                    <span className="btn btn-ghost btn-xs">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="#ffb266" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75l-2.53 2.54l3.75 3.75l2.53-2.54z"></path></svg>
                                                    </span>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>


                </table>
            </div> */}
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