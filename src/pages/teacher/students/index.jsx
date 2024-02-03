import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import Image from "next/image";
import useSWR from 'swr';
import { useRouter } from "next/router";
import { storageService } from "@/services/storage.service";
function Index() {
    const token = 'Bearer ' + storageService.getToken();
    const router = useRouter();
    const fetcher = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then((res) => res.json());

    const { data: students, mutate } = useSWR(process.env.API + '/api/teacher/student-personal-data/index?page=' + (router.query.page ? router.query.page : '') + '&search=' + (router.query.search ? router.query.search : '') + '&unit_id=' + (router.query.unit_id ? router.query.unit_id : ''), fetcher);
    let filterTimeout;
    const doSearch = (event) => {
        clearTimeout(filterTimeout)
        filterTimeout = setTimeout(() => {
            router.push({
                pathname: '/teacher/students',
                query: { ...router.query, page: 1, search: event, unit_id: router.query.unit_id ? router.query.unit_id : '' }
            },
                undefined,
                {}
            )
        }, 1000)
    }
    const doFilter = event => {
        router.push({
            pathname: '/teacher/students',
            query: { ...router.query, page: 1, search: router.query.search ? router.query.search : '', unit_id: event }
        },
            undefined,
            {}
        )
    }
    const doReset = () => {
        document.getElementById('search_input').value = ''
        document.getElementById('unit_id').value = ''
        router.push({
            pathname: '/teacher/students',
            query: { ...router.query, page: 1, search: '', unit_id: '' }
        },
            undefined,
            {}
        )
    }
    const handlePagination = (index) => {
        // setPageIndex(index)
        // alert(index.includes('Next'))
        if (index.includes('Next')) {
            index = router.query.page ? parseInt(router.query.page) + 1 : 2;
        }
        index = parseInt(index)

        if (index > students.data?.last_page || index < 1) return
        router.push({
            pathname: '/teacher/students',
            query: { ...router.query, page: parseInt(index), search: router.query.search ? router.query.search : '', unit_id: router.query.unit_id ? router.query.unit_id : '' }
        },
            undefined,
            {}
        )
    }
    
    const getColorWeight = (status) => {
        if (status == 'Berat badan sangat kurang')
            return 'bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
        else if (status == 'Berat badan kurang')
            return 'bg-yellow-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
        else if (status == 'Berat badan normal')
            return 'bg-green-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
        else if (status == 'Resiko berat badan lebih')
            return 'bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
    }

    const getColorHeight = (status) => {
        if (status == 'Sangat pendek')
            return 'bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
        else if (status == 'Pendek')
            return 'bg-yellow-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
        else if (status == 'Normal')
            return 'bg-green-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
        else if (status == 'Tinggi')
            return 'bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
    }

    const getColorBmi = (status) => {
        if (status == 'Gizi buruk')
            return 'bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
        else if (status == 'Gizi kurang')
            return 'bg-yellow-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
        else if (status == 'Gizi baik')
            return 'bg-green-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
        else if (status == 'Gizi lebih')
            return 'bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
        else if (status == 'Obesitas')
            return 'bg-red-700 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
    }
    const monthDiff = (start_date) => {
        var months;
        let s_date = new Date(start_date);
        let today = new Date();
        months = (today.getFullYear() - s_date.getFullYear()) * 12;
        months -= s_date.getMonth();
        return months <= 0 ? 0 : months + 1;
    }
    if (!students) {
        return <>
            <PageLayout title={'Daftar Siswa PAUD'} hasBackUrl={false}>
                <div role="status" className="space-y-2.5 animate-pulse overflow-x-auto w-full mt-3  mx-auto  ">
                    <div className="flex flex-col md:flex-row lg:flex-row w-full  justify-center items-center gap-3">
                        <div className="flex flex-col w-full md:w-6/12 lg:w-6/12">
                            <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                        </div>
                    </div>

                    <div className="overflow-x-auto w-full mt-3 max-w-screen-2xl mx-auto">
                        <div className="flex w-full justify-end">
                            <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-28"></div>
                        </div>
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>
                                        <label>
                                            #
                                        </label>
                                    </th>
                                    <th>Nama</th>
                                    <th>NIK</th>
                                    <th>Berat</th>
                                    <th>Tinggi</th>
                                    <th>IMT</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover">
                                    <th>
                                        <label>
                                            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-5"></div>
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <div className="h-full bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-96"></div>
                                                <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-96"></div>
                                    </td>
                                    <td>
                                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                    </td>
                                    <td>
                                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                    </td>
                                    <td>
                                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                    </td>
                                    <th>
                                        <div className="flex gap-2">
                                            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                        </div>

                                    </th>
                                </tr>
                                <tr className="hover">
                                    <th>
                                        <label>
                                            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-5"></div>
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <div className="h-full bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-96"></div>
                                                <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-96"></div>
                                    </td>
                                    <td>
                                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                    </td>
                                    <td>
                                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                    </td>
                                    <th>
                                        <div className="flex gap-2">
                                            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                        </div>

                                    </th>
                                </tr>
                                <tr className="hover">
                                    <th>
                                        <label>
                                            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-5"></div>
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <div className="h-full bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-96"></div>
                                                <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-96"></div>
                                    </td>
                                    <td>
                                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                    </td>
                                    <td>
                                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                    </td>
                                    <th>
                                        <div className="flex gap-2">
                                            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                        </div>

                                    </th>
                                </tr>
                                <tr className="hover">
                                    <th>
                                        <label>
                                            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-5"></div>
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <div className="h-full bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-96"></div>
                                                <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-96"></div>
                                    </td>
                                    <td>
                                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                    </td>
                                    <td>
                                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                    </td>
                                    <th>
                                        <div className="flex gap-2">
                                            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                        </div>

                                    </th>
                                </tr>
                                <tr className="hover">
                                    <th>
                                        <label>
                                            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-5"></div>
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <div className="h-full bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-96"></div>
                                                <div className="h-4 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-96"></div>
                                    </td>
                                    <td>
                                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                    </td>
                                    <td>
                                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                    </td>
                                    <th>
                                        <div className="flex gap-2">
                                            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                                        </div>

                                    </th>
                                </tr>
                            </tbody>


                        </table>
                    </div>
                </div>
            </PageLayout>
        </>
    }
    return <>
        <PageLayout title={'Daftar Siswa PAUD'} hasBackUrl={true} backUrl="/teacher">
            <div className="flex flex-col md:flex-row lg:flex-row w-full  justify-center items-center gap-3">
                <div className="flex flex-col w-full md:w-6/12 lg:w-6/12">
                    <div className="bg-white items-center justify-between w-full flex rounded-full shadow-lg px-1 py-1  sticky">
                        <input id="search_input" onChange={(event) => doSearch(event.target.value)} defaultValue={router.query.search} className="input-sm capitalize font-semibold rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs" type="text" placeholder="Cari nama" />
                        <div className="bg-gray-600 p-1 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
                            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto w-full mt-3 max-w-screen-2xl mx-auto">
                <div className="flex w-full justify-end">
                    <Link href={'/teacher/students/create'}>
                        <span className="btn btn-sm btn-info capitalize font-normal">
                            + Tambah
                        </span>
                    </Link>
                </div>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    #
                                </label>
                            </th>
                            <th>Nama</th>
                            <th>NIK</th>
                            <th>Berat</th>
                            <th>Tinggi</th>
                            <th>IMT (U &gt; 60)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students?.data?.data?.map((student, index) => {
                                return (
                                    <tr className="hover" key={index}>
                                        <th>
                                            <label>
                                            {(students?.data?.current_page * students?.data?.per_page) - (students?.data?.per_page - index) + 1}
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
                                                    <div className="font-bold">{student.name}</div>
                                                    <div>
                                                        Umur : {monthDiff(student.birth_date)} Bulan
                                                    </div>
                                                    <div className="text-sm opacity-50">{student.reference_work_unit?.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {student.id_number}
                                        </td>
                                        <td>
                                            <div>
                                                {student.weight ? student.weight : '0 '} kg
                                            </div>
                                            <span className={getColorWeight(student.weight_status)}>
                                                {student.weight_status}
                                            </span>
                                        </td>
                                        <td>
                                            <div>
                                                {student.height ? student.height : '0 '} cm
                                            </div>
                                            <span className={getColorHeight(student.height_status)}>
                                                {student.height_status}
                                            </span>
                                        </td>
                                        <td>
                                            <div>
                                                {student.bmi ? parseFloat(student.bmi).toFixed(2) : '0 '}
                                            </div>
                                            <span className={getColorBmi(student.bmi_status)}>
                                                {student.bmi_status}
                                            </span>
                                        </td>
                                        <th>
                                            <div className="flex gap-2">
                                                {/* <span className="btn btn-ghost btn-xs">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="#ffb266" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75l-2.53 2.54l3.75 3.75l2.53-2.54z"></path></svg>
                                    </span> */}
                                                <label htmlFor="my-modal-4">
                                                    <span className="btn btn-ghost btn-xs">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="#ff0000" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1ZM5 21V6H4V4h5V3h6v1h5v2h-1v15Z"></path></svg>
                                                    </span>
                                                </label>
                                                <Link href={'/teacher/students/' + student.id}>
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
                <div className={`${students?.data?.first_page_url == students?.data?.last_page_url ? 'hidden' : ''} grid w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible`}>
                    <nav>
                        <ul className="flex">
                            {
                                students?.data?.links?.map((link, index) => {
                                    return <span className=" cursor-pointer" key={index}>
                                        <label onClick={() => {
                                            handlePagination((link.label))
                                        }} className={`${students?.data?.current_page == link.label ? 'bg-sky-500' : 'bg-base-100'} mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100  p-0 text-sm cursor-pointer text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300`} aria-label="Previous">
                                            <span className="material-icons text-sm"> {link.label.replace('&laquo; Previous', '<<').replace('Next &raquo;', '>>')} </span>
                                        </label>
                                    </span>
                                })
                            }
                        </ul>
                    </nav>
                </div>
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