import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import Image from "next/image";
import useSWR from 'swr';
import { useRouter } from "next/router";
import { storageService } from "@/services/storage.service";
import { useState } from "react";
function Index() {
    let token = 'Bearer ' + storageService.getToken();
    const router = useRouter();
    const [pageIndex, setPageIndex] = useState(1);
    const fetcher = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then((res) => res.json())

    // if(router.isReady) {
        
    // }
    if(router.query.page) {
        // setPageIndex(router.query.page)
    }

    const { data: users, mutate } = useSWR(process.env.API + '/api/headmaster/user/index?page='+ router.query.page, fetcher);
    const handlePagination = (index) => {
        setPageIndex(index)
        router.push({
            pathname: '/headmaster/daily-report/subordinate',
            query: { ...router.query, page: index }
        },
            undefined,
            {}
        )
    }

    if (!users) {
        return <>
            <PageLayout title={'Daftar Laporan Harian TPK'} hasBackUrl={true} backUrl="/headmaster">
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
                                <th>Total Laporan</th>
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
                <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                <label htmlFor="my-modal-4" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                        <h3 className="text-lg font-bold">Konfirmasi</h3>
                        <p className="py-4">Apakah anda yakin ingin menghapus <span className="font-bold">XYZ</span> ? </p>
                        <div className="modal-action">
                            <label htmlFor="my-modal-4" className="btn btn-outline">Tidak</label>
                            <label htmlFor="my-modal-4" className="btn">Ya</label>
                        </div>
                    </label>
                </label>
            </PageLayout>
        </>
    }
    return <>
        <PageLayout title={'Daftar Laporan Harian TPK'} hasBackUrl={true} backUrl="/headmaster">
            <div className="flex flex-col md:flex-row lg:flex-row w-full  justify-center items-center gap-3">
                <div className="flex flex-col w-full md:w-6/12 lg:w-6/12">
                    <div className="bg-white items-center justify-between w-full flex rounded-full shadow-lg px-1 py-1  sticky">
                        <input className="input-sm capitalize font-semibold rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs" type="text" placeholder="Cari nama" />
                        <div className="bg-gray-600 p-1 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
                            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto w-full mt-3 max-w-screen-2xl mx-auto shadow-xl">
               
                <table className="table w-full table-compact">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    #
                                </label>
                            </th>
                            <th>Nama</th>
                            <th>ID TPK</th>
                            <th>Profesi</th>
                            <th>Total Laporan</th>
                            <th>Catin</th>
                            <th>Bumil</th>
                            <th>Bulin</th>
                            <th>Baduta/Balita</th>
                            <th>PUS</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.data?.data?.map((user, index) => {
                                return (
                                    <tr className="hover" key={index}>
                                        <th>
                                            <label>
                                                {(users?.data?.current_page * users?.data?.per_page) - (users?.data?.per_page - index) + 1}
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <Image src="/assets/images/avatar.png" alt="Avatar Tailwind CSS Component" height={100} width={100} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">
                                                        <Link href={'/headmaster/daily-report/subordinate/' + user.id} className="text-primary underline">
                                                            {user.personal_data?.name}
                                                        </Link>
                                                    </div>
                                                    <div className="text-sm opacity-50">{user.reference_work_unit?.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {user.personal_data?.registration_number}
                                        </td>
                                        <td>
                                            {user.personal_data?.profession?.name}
                                        </td>
                                        
                                        <td>
                                            {user.daily_reports_count}
                                        </td>
                                        <td>
                                            {user.total_catin}
                                        </td>
                                        <td>
                                            {user.total_bumil}
                                        </td>
                                        <td>
                                            {user.total_bulin}
                                        </td>
                                        <td>
                                            {user.total_baduta}
                                        </td>
                                        <td>
                                            {user.total_pus}
                                        </td>
                                        <th>
                                            <div className="flex gap-2">
                                                <Link href={'/headmaster/daily-report/subordinate/' + user.id}>
                                                    <span className="btn btn-ghost btn-xs tooltip tooltip-success mt-1" data-tip='Lihat'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8   rounded-lg rotate-180" viewBox="0 -4 24 24"><path fill="none" stroke="#00ff00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                                                    </span>
                                                </Link>
                                            </div>

                                        </th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className={`${users?.data?.first_page_url == users?.data?.last_page_url ? 'hidden' : ''} grid w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible`}>
                <nav>
                    <ul className="flex">
                        {
                            users?.data?.links?.map((link, index) => {
                                return <span key={index}>
                                    <label onClick={() => {
                                        handlePagination(parseInt(link.label))
                                    }} className={`${users?.data?.current_page == link.label ? 'bg-sky-500' : 'bg-base-100'} mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100  p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300`} aria-label="Previous">
                                        <span className="material-icons text-sm"> {link.label.replace('&laquo; Previous', '<<').replace('Next &raquo;', '>>')} </span>
                                    </label>
                                </span>
                            })
                        }
                    </ul>
                </nav>
            </div>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">Konfirmasi</h3>
                    <p className="py-4">Apakah anda yakin ingin menghapus <span className="font-bold">XYZ</span> ? </p>
                    <div className="modal-action">
                        <label htmlFor="my-modal-4" className="btn btn-outline">Tidak</label>
                        <label htmlFor="my-modal-4" className="btn">Ya</label>
                    </div>
                </label>
            </label>
        </PageLayout>
    </>
}

export default Index