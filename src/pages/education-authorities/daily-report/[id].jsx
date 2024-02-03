import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { storageService } from "@/services/storage.service";
import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSWR from 'swr';
function Index() {
    const router = useRouter();
    let token = 'Bearer ' + storageService.getToken();
    // const [dailyReports, setDailyReports] = useState();
    const [selected, setSelected] = useState();
    const reject_reason = useRef();

    const fetcher = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then((res) => res.json())
    let user_id = ''
    const [pageIndex, setPageIndex] = useState(router.query?.page);
    if(router.isReady) {
        user_id = router.query.id
    }

    const {data: dailyReports, mutate} = useSWR(process.env.API + '/api/headmaster/daily-report/index?user_id=' + user_id + '&page=' + pageIndex, fetcher)


    // const fetchData = (args) => {
    //     setDailyReports(null)
    //     fetch(process.env.API + '/api/headmaster/daily-report/index?user_id=' + args.id + '&page=' + args?.page, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': token
    //         }
    //     })
    //         .then(((res) => res.json()))
    //         .then((data) => {
    //             setDailyReports(data.data);
    //         })

    //     router.push({
    //         pathname: '/headmaster/daily-report/subordinate/' + args?.id,
    //         query: { ...router.query, page: args?.page, user_id: args?.id }
    //     },
    //         undefined,
    //         {}
    //     )
    // }
    // const fetchDatas = (id) => {
    //     fetch(process.env.API + '/api/headmaster/daily-report/index?user_id=' + id, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': token
    //         }
    //     }).then((res) => res.json()).then((data) => {
    //         setDailyReports(data.data)
    //     })
    // }
    // useEffect(() => {

    //     const controller = new AbortController();
    //     const signal = controller.signal;
    //     if (router.isReady) {
    //         fetchData({
    //             id: router.query.id,
    //             page: router.query?.page ? router.query?.page : '',
    //         });
    //     }

    // }, [router.isReady])

    const handlePagination = (index) => {
        setPageIndex(index)
        router.push({
            pathname: '/headmaster/daily-report/subordinate/' + user_id,
            query: { ...router.query, page: index }
        },
            undefined,
            {}
        )
    }

    const accept = () => {
        fetch(process.env.API + '/api/headmaster/daily-report/accept/' + selected.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then((res) => res.json()).then((data) => {
            toast.success('Berhasil Terima Laporan', {
                position: 'bottom-right'
            })
            document.getElementById('accept-modal').checked = false;
            mutate(['']);
            // fetchData(selected.user_id)
            // fetchData({
            //     id: selected.user_id,
            //     page: router.query?.page ? router.query?.page : '',
            // })
        })
    }
    const reject = () => {
        fetch(process.env.API + '/api/headmaster/daily-report/reject/' + selected.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                reject_reason: reject_reason.current.value
            })
        }).then((res) => res.json()).then((data) => {
            toast.success('Berhasil Terima Laporan', {
                position: 'bottom-right'
            })
            document.getElementById('reject-modal').checked = false;
            mutate(['']);
            // fetchData({
            //     id: selected.user_id,
            //     page: router.query?.page ? router.query?.page : '',
            // })
        })
    }
    if (!dailyReports) {
        return <>
            <PageLayout title={'Laporan Harian'} hasBackUrl={true} backUrl="/education-authorities">
                <div className="flex flex-col md:flex-row lg:flex-row w-full  justify-center items-center gap-3">
                    {/* <div className="flex flex-col w-full md:w-6/12 lg:w-6/12">
                        <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    </div> */}
                </div>
                <div className="flex w-full justify-end mt-3">
                    {/* <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div> */}
                </div>
                <div role="status" className="space-y-2.5 animate-pulse overflow-x-auto w-full mt-3  mx-auto bg-base-100 p-3 ">
                <div className="flex w-full justify-end mb-3">
                    <table className="w-96 ml-3 mt-3 font-semibold">
                        <tr>
                            <td>
                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                            </td>
                            <td>
                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                            </td>
                            <td>
                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                            </td>
                        </tr>
                    </table>
                </div>
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
        <PageLayout title={'Laporan Harian'} hasBackUrl={true} backUrl="/education-authorities/daily-report/">
            <ToastContainer />
            <div className="flex flex-col md:flex-row lg:flex-row w-full  justify-center items-center gap-3">
                {/* <div className="flex flex-col w-full md:w-6/12 lg:w-6/12">
                    <div className="bg-white items-center justify-between w-full flex rounded-full shadow-lg px-1 py-1  sticky">
                        <input className="input-sm capitalize font-semibold rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs" type="text" placeholder="Cari" />
                        <div className="bg-gray-600 p-1 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
                            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div> */}
                {/* <div className="flex w-full lg:w-auto lg:justify-start justify-center gap-3">
                    <select className="select select-bordered select-sm w-full max-w-xs">
                        <option disabled selected>Filter Sekolah</option>
                        <option>Small Apple</option>
                        <option>Small Orange</option>
                        <option>Small Tomato</option>
                    </select>
                    <span className="btn btn-sm capitalize">
                        Reset Filter
                    </span>
                </div> */}
            </div>
            {/* <div className="flex w-full justify-end mt-3">
                <Link href={'/teacher/daily-report/create'}>
                    <button className="btn btn-sm btn-info">
                        Tambah
                    </button>
                </Link>
            </div> */}
            <div className="overflow-x-auto w-full mt-3  mx-auto bg-base-100 rounded-xl p-2 shadow-xl">
                <div className="flex w-full justify-end mb-3">
                    <table className="w-96 ml-3 mt-3 font-semibold">
                        <tr>
                            <td>
                                Nama
                            </td>
                            <td>
                                {dailyReports?.data?.data[0]?.user?.personal_data?.name}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                NIP / No. Registrasi
                            </td>
                            <td>
                                {dailyReports?.data?.data[0]?.user?.personal_data?.registration_number}
                            </td>
                        </tr>
                    </table>
                </div>
                {/* <div className="flex w-60 pl-3 pt-3 bg-red-500 justify-center">
                    <p>Nama</p>
                    <p>{dailyReports?.data[0]?.user?.personal_data?.name}</p>
                </div>
                <div className="flex w-60 pl-3 pb-3 justify-start">
                    <p>NIP / No Registrasi</p>
                    <p>{dailyReports?.data[0]?.user?.personal_data?.registration_number}</p>
                </div> */}
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
                                            <div className="flex gap-2 items-center ">
                                                <label onClick={() => setSelected(dailyReport)} className={`${dailyReport.is_approve.toString() == '1' ? 'hidden' : ''}`}>
                                                    <div className="flex gap-5 items-center">
                                                        <label htmlFor="accept-modal" className="text-green-500 cursor-pointer btn btn-ghost btn-sm font-normal capitalize">Terima</label>
                                                        <label htmlFor="reject-modal" className="text-red-500 cursor-pointer btn btn-ghost btn-sm font-normal capitalize">Tolak</label>
                                                    </div>
                                                </label>
                                                {/* <Link href={'/teacher/daily-report/' + dailyReport.id} className={`${dailyReport.is_approve.toString() == '1' ? 'hidden' : ''}`}>
                                                    <span className="btn btn-ghost btn-xs">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="#ffb266" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75l-2.53 2.54l3.75 3.75l2.53-2.54z"></path></svg>
                                                    </span>
                                                </Link>
                                                <Link href={'/administrator/students/1'}>
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
            <div className={`${dailyReports?.data?.first_page_url == dailyReports?.data?.last_page_url ? 'hidden' : ''} grid w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible`}>
                <nav>
                    <ul className="flex">
                        {
                            dailyReports?.data?.links?.map((link, index) => {
                                return <li key={index}>
                                    <label onClick={() => {
                                        handlePagination(parseInt(link.label))
                                    }} className={`${dailyReports?.data?.current_page == link.label ? 'bg-sky-500' : 'bg-base-100'} mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100  p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300`} aria-label="Previous">
                                        <span className="material-icons text-sm"> {link.label.replace('&laquo; Previous', '<<').replace('Next &raquo;', '>>')} </span>
                                    </label>
                                </li>
                            })
                        }
                    </ul>
                </nav>
            </div>
            <input type="checkbox" id="accept-modal" className="modal-toggle" />
            <label htmlFor="accept-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">Konfirmasi Terima Laporan</h3>
                    <p>{selected?.activity}</p>
                    <div className="modal-action">
                        <label htmlFor="accept-modal" className="btn btn-outline btn-info btn-sm">Batal</label>
                        <label onClick={accept} className="btn btn-success btn-sm">Terima</label>
                    </div>
                </label>
            </label>

            <input type="checkbox" id="reject-modal" className="modal-toggle" />
            <label htmlFor="reject-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">Konfirmasi Tolak Laporan</h3>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Komentar</span>
                            {/* <span className="label-text-alt text-red-500 font-semibold">* Wajib</span> */}
                        </label>
                        <textarea ref={reject_reason} placeholder="Masukkan komentar jika ada" className="textarea w-full input-bordered" >

                        </textarea>
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="reject-modal" className="btn btn-outline btn-info btn-sm">Batal</label>
                        <label onClick={reject} className="btn btn-error btn-sm">Tolak</label>
                    </div>
                </label>
            </label>
        </PageLayout>
    </>
}

export default Index