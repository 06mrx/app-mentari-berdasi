import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { storageService } from "@/services/storage.service";
import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
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
    if (router.isReady) {
        user_id = router.query.id
    }

    const { data: dailyReports, mutate } = useSWR(process.env.API + '/api/headmaster/daily-report/index?user_id=' + user_id + '&page=' + pageIndex, fetcher)


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
            <PageLayout title={'Laporan Harian'} hasBackUrl={true} backUrl="/teacher">
                <div className="flex flex-col md:flex-row lg:flex-row w-full  justify-center items-center gap-3">
                    {/* <div className="flex flex-col w-full md:w-6/12 lg:w-6/12">
                        <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    </div> */}
                </div>
                <div className="flex w-full justify-end mt-3">
                    {/* <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div> */}
                </div>
                <div role="status" className="space-y-2.5 animate-pulse overflow-x-auto w-full mt-3  mx-auto bg-base-100 p-3 ">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">

                        <div role="status" className="w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                            <div className="flex items-center justify-center h-56 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                <svg className="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                            </div>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>

                            <span className="sr-only">Loading...</span>
                        </div>
                        <div role="status" className="w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                            <div className="flex items-center justify-center h-56 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                <svg className="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                            </div>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>

                            <span className="sr-only">Loading...</span>
                        </div>
                        <div role="status" className="w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                            <div className="flex items-center justify-center h-56 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                <svg className="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                            </div>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>

                            <span className="sr-only">Loading...</span>
                        </div>
                        <div role="status" className="w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                            <div className="flex items-center justify-center h-56 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                <svg className="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                            </div>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>

                            <span className="sr-only">Loading...</span>
                        </div>

                    </div>
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
        <PageLayout title={'Laporan Harian'} hasBackUrl={true} backUrl="/headmaster/daily-report/subordinate">
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

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
                    {
                        dailyReports?.data?.data?.map((dailyReport, index) => {
                            return (
                                <div className="card rounded-none shadow-xl bg-base-100 border border-gray-400 group" key={index}>
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