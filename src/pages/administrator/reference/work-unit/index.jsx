import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import Image from "next/image";
import useSWR from 'swr';
import { useRouter } from "next/router";
import { storageService } from "@/services/storage.service";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function Index() {
    let token = 'Bearer ' + storageService.getToken();
    const router = useRouter();
    const [pageIndex, setPageIndex] = useState(1);
    const [selected, setSelected] = useState();
    const fetcher = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then((res) => res.json())

    const { data: wokrUnits, mutate } = useSWR(process.env.API + '/api/reference/work_unit/index', fetcher);


    const handlePagination = (index) => {
        setPageIndex(index)
        router.push({
            pathname: '/administrator/teachers',
            query: { ...router.query, page: index }
        },
            undefined,
            {}
        )
    }
    let filterTimeout;
    const doSearch = (event) => {
        clearTimeout(filterTimeout)
        filterTimeout = setTimeout(() => {
            router.push({
                pathname: '/administrator/teachers',
                query: { ...router.query, page: 1, search: event, unit_id: '' }
            },
                undefined,
                {}
            )
        }, 1000)
    }
    const doFilter = event => {
        router.push({
            pathname: '/administrator/teachers',
            query: { ...router.query, page: 1, search: '', unit_id: event }
        },
            undefined,
            {}
        )
    }
    const doReset = () => {
        router.push({
            pathname: '/administrator/teachers',
            query: { ...router.query, page: 1, search: '', unit_id: '' }
        },
            undefined,
            {}
        )
    }

    const handleDelete = () => {
        fetch(process.env.API + '/api/reference/work_unit/delete/' + selected.id, {
            method: 'DELETE',
            headers: {
                'Authorization' : token,
            }
        }).then((res) => res.json()).then((data) => {
            if(data.success) {
                toast.success('Data Berhasil Dihapus.', {
                    position: 'bottom-right'
                })
                mutate(['']);
            } else {
                toast.error('Data Gagal Dihapus.', {
                    position: 'bottom-right'
                })
            }
        })
    }
    if (!wokrUnits) {
        return <>
            <PageLayout title={'Unit Kerja'} hasBackUrl={true} backUrl="/headmaster">
                <div className="flex flex-col md:flex-row lg:flex-row w-full  justify-center items-center gap-3">
                    <div className="flex flex-col w-full md:w-6/12 lg:w-6/12">
                        <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    </div>
                </div>
                <div role="status" className="space-y-2.5 animate-pulse overflow-x-auto w-full mt-3  mx-auto  p-3 ">

                    <table className="table w-full table-compact">
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        #
                                    </label>
                                </th>
                                <th>Nama</th>
                                <th>Nomor Daftar</th>
                                <th>email</th>
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
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <div className="h-full bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mt-1"></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <th>
                                    <div className="flex gap-2">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                    </div>

                                </th>
                            </tr>
                            <tr className="hover">
                                <th>
                                    <label>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4"></div>
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <div className="h-full bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mt-1"></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <th>
                                    <div className="flex gap-2">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                    </div>

                                </th>
                            </tr>
                            <tr className="hover">
                                <th>
                                    <label>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4"></div>
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <div className="h-full bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mt-1"></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <th>
                                    <div className="flex gap-2">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                    </div>

                                </th>
                            </tr>
                            <tr className="hover">
                                <th>
                                    <label>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4"></div>
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <div className="h-full bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mt-1"></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <th>
                                    <div className="flex gap-2">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                    </div>

                                </th>
                            </tr>
                            <tr className="hover">
                                <th>
                                    <label>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4"></div>
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <div className="h-full bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mt-1"></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                </td>
                                <th>
                                    <div className="flex gap-2">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                    </div>

                                </th>
                            </tr>
                        </tbody>


                    </table>
                </div>
                <input type="checkbox" id="delete-modal" className="modal-toggle" />
                
            </PageLayout>
        </>
    }
    return <>
        <PageLayout title={'Unit Kerja'} hasBackUrl={true} backUrl="/headmaster">
            <ToastContainer/>
            <div className="flex flex-col md:flex-row lg:flex-row w-full  justify-center items-center gap-3">
                <div className="flex flex-col w-full md:w-6/12 lg:w-6/12">
                    <div className="bg-white items-center justify-between w-full flex rounded-full shadow-lg px-1 py-1  sticky">
                        <input defaultValue={router.query.search} onChange={(event) => doSearch(event.target.value)} className="input-sm capitalize font-semibold rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs" type="text" placeholder="Cari nama" />
                        <div className="bg-gray-600 p-1 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
                            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto w-full mt-3 mx-auto shadow-xl">
                <div className="flex justify-end w-full mb-2">
                    <Link href={'/administrator/reference/work-unit/create'}>
                        <button className="btn btn-sm btn-info">+ Tambah</button>
                    </Link>
                </div>
                <table className="table w-full table-compact">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    #
                                </label>
                            </th>
                            <th>Nama</th>
                            <th>No. Registrasi</th>
                            <th>Alamat</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            wokrUnits?.data?.data?.map((wokrUnit, index) => {
                                return (
                                    <tr className="hover" key={index}>
                                        <th>
                                            <label>
                                                {(wokrUnits?.data?.current_page * wokrUnits?.data?.per_page) - (wokrUnits?.data?.per_page - index) + 1}
                                            </label>
                                        </th>
                                        <td>
                                            <div className="font-semibold">
                                                {wokrUnit.name}
                                            </div>
                                            <div className="text-sm opacity-50">
                                                email : {wokrUnit.email}
                                            </div>
                                            <div className="text-sm opacity-50">
                                                Hp : {wokrUnit.phone_number}
                                            </div>
                                            <div className="text-sm opacity-50">
                                                Website : {wokrUnit.website}
                                            </div>
                                        </td>
                                        <td>
                                            {wokrUnit.registration_number}
                                        </td>
                                        <td>
                                            {wokrUnit.address} <br /> PROV. {wokrUnit.province}, {wokrUnit.city}, KEC. {wokrUnit.district}, DESA {wokrUnit.village}
                                        </td>
                                        <th>
                                            <div className="flex gap-2 items-center">
                                                <Link href={'/administrator/reference/work-unit/' + wokrUnit.id + '/edit'}>
                                                    <span className="btn btn-ghost btn-xs">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="#ffb266" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75l-2.53 2.54l3.75 3.75l2.53-2.54z"></path></svg>
                                                    </span>
                                                </Link>
                                                <label htmlFor="delete-modal" onClick={() => setSelected(wokrUnit)} className="btn btn-ghost btn-xs">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="#ff0000" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1ZM5 21V6H4V4h5V3h6v1h5v2h-1v15Z"></path></svg>
                                                </label>
                                                {/* <Link href={'/administrator/teachers/' + wokrUnit.id}>
                                                    <span className="btn btn-ghost btn-xs tooltip tooltip-success mt-1" data-tip='Lihat'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8   rounded-lg rotate-180" viewBox="0 -4 24 24"><path fill="none" stroke="#00ff00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                                                    </span>
                                                </Link> */}
                                            </div>

                                        </th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {/* <div className={`${users?.data?.first_page_url == users?.data?.last_page_url ? 'hidden' : ''} grid w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible`}>
                <nav>
                    <ul className="flex">
                        {
                            users?.data?.links?.map((link, index) => {
                                return <li key={index}>
                                    <label onClick={() => {
                                        handlePagination(parseInt(link.label))
                                    }} className={`${users?.data?.current_page == link.label ? 'bg-sky-500' : 'bg-base-100'} mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100  p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300`} aria-label="Previous">
                                        <span className="material-icons text-sm"> {link.label.replace('&laquo; Previous', '<<').replace('Next &raquo;', '>>')} </span>
                                    </label>
                                </li>
                            })
                        }
                    </ul>
                </nav>
            </div> */}
            <input type="checkbox" id="delete-modal" className="modal-toggle" />
            <label htmlFor="delete-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">Konfirmasi</h3>
                    <p className="py-4">Apakah anda yakin ingin menghapus <span className="font-bold">{selected?.name}</span> ? </p>
                    <div className="modal-action">
                        <label htmlFor="delete-modal" className="btn btn-outline">Tidak</label>
                        <label htmlFor="delete-modal" onClick={handleDelete} className="btn">Ya</label>
                    </div>
                </label>
            </label>
        </PageLayout>
    </>
}

export default Index