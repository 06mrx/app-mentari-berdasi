import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { storageService } from "@/services/storage.service";
function Index() {
    const [users, setUsers] = useState();
    const [units, setUnits] = useState();
    const router = useRouter();
    const [selected, setSelected] = useState();
    const abortController = new AbortController();
    const fetchData = (args) => {
        setUsers(null)
        fetch(process.env.API + '/api/administrator/user/index?page=' + args?.page + '&search=' + args?.search + '&unit_id=' + args?.unit_id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + storageService.getToken()
            },
            signal : abortController.signal
        })
            .then(((res) => res.json()))
            .then((data) => {
                setUsers(data.data);
            })

        router.push({
            pathname: '/administrator/users',
            query: { ...router.query, page: args?.page, search: args?.search, unit_id: args?.unit_id }
        },
            undefined,
            {}
        )
    }

    const fetchUnit = () => {
        fetch(process.env.API + '/api/reference/work_unit/list', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + storageService.getToken()
            },
            signal : abortController.signal
        })
            .then((res) => res.json())
            .then((data) => {
                setUnits(data.data)
            })
    }
    let filterTimeout;
    const doSearch = (search) => {
        clearTimeout(filterTimeout)
        var unit_id = ''
        if (router.query.unit_id) unit_id = router.query.unit_id
        filterTimeout = setTimeout(() => {
            fetchData({
                page: 1,
                search: search,
                unit_id: router.query?.unit_id ? router.query?.unit_id : ''
            })
        }, 1000)

    }
    const doReset = (args) => {
        if (args.isSearch) {
            fetchData({
                page: router.query?.page ? router.query?.page : '',
                search: '',
                unit_id: router.query?.unit_id ? router.query?.unit_id : '',
            })
            document.getElementById('search_input').value = '';
        } else {
            fetchData({
                page: router.query?.page ? router.query?.page : '',
                search: router.query?.search ? router.query?.search : '',
                unit_id: '',
            })
            document.getElementById('unit_filter').selectedIndex = 0;
        }
    }
    useEffect(() => {
        if (router.isReady) {
            fetchData({
                page: router.query?.page ? router.query?.page : '',
                search: router.query?.search ? router.query?.search : '',
                unit_id: router.query?.unit_id ? router.query?.unit_id : '',
            })
            fetchUnit()
        }

        return () => {
            abortController.abort();
        }

    }, [router.isReady])
    const handleDelete = () => {
        fetch(process.env.API + '/api/administrator/user/destroy/' + selected.id, {
            method: 'DELETE',
            headers: {
                'authorization' : 'Bearer ' + storageService.getToken(),
                'Content-Type' : 'application/json'
            },
        }).then((res) => res.json()).then((data) => {
            fetchData({
                page: router.query?.page ? router.query?.page : '',
                search: router.query?.search ? router.query?.search : '',
                unit_id: router.query?.unit_id ? router.query?.unit_id : '',
            })
        })
    }
    if (!users || !units) {
        return <>
            <PageLayout title={'Pengguna'} hasBackUrl={false}>
                <div role="status" className="w-full p-4 space-y-4 border bg-base-100 border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                    <table className="table w-full">
                        <tbody>
                            <tr className="hover">
                                <th>
                                    <label>
                                        1
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <div className="h-full bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-44 mb-2"></div>
                                            <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-500 w-28"></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div>
                                </td>
                                <td>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div>
                                </td>
                                <td>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-10"></div>
                                </td>

                                <th>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div>
                                </th>
                            </tr>
                            <tr className="hover">
                                <th>
                                    <label>
                                        2
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <div className="h-full bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-44 mb-2"></div>
                                            <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-500 w-28"></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div>
                                </td>
                                <td>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div>
                                </td>
                                <td>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-10"></div>
                                </td>

                                <th>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div>
                                </th>
                            </tr>
                            <tr className="hover">
                                <th>
                                    <label>
                                        3
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <div className="h-full bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-44 mb-2"></div>
                                            <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-500 w-28"></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div>
                                </td>
                                <td>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div>
                                </td>
                                <td>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-10"></div>
                                </td>

                                <th>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div>
                                </th>
                            </tr>
                            <tr className="hover">
                                <th>
                                    <label>
                                        4
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <div className="h-full bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-44 mb-2"></div>
                                            <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-500 w-28"></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div>
                                </td>
                                <td>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-44"></div>
                                </td>
                                <td>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-10"></div>
                                </td>

                                <th>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                    <span className="sr-only">Loading...</span>
                </div>
            </PageLayout>
        </>
    }
    return <>
        <PageLayout title={'Pengguna'} hasBackUrl={true} backUrl="/administrator">
            <div className="flex flex-col md:flex-row lg:flex-row w-full  justify-center items-center gap-3">
                <div className="flex flex-col w-full md:w-6/12 lg:w-6/12">
                    <div className="bg-white items-center justify-between w-full flex rounded-full shadow-lg px-1 py-1  sticky">
                        <input id="search_input" onChange={event => (doSearch(event.target.value))} defaultValue={router.query.search} className="input-sm  capitalize rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs" type="text" placeholder="Cari Nama atau NIP" />
                        {/* <p className="-ml-16 bg-gray-500">x</p> */}
                        {/* <button className="btn btn-xs capitalize font-normal" onClick={clearPage}>Bersihkan</button> */}
                        <div className="bg-gray-600 p-1 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
                            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex w-full lg:w-auto lg:justify-start justify-center gap-3">
                    <select className="select select-bordered select-sm w-full max-w-xs" defaultValue={router.query.unit_id ? router.query.unit_id : ''} id="unit_filter" onChange={(event) => fetchData({
                        page: 1,
                        search: router.query?.search ? router.query?.search : '',
                        unit_id: event.target.value
                    })}>
                        <option disabled value=''>Filter Unit Kerja</option>
                        {
                            units.map((unit, index) => {
                                return (
                                    <>
                                        <option value={unit.id} key={index}> {unit.name} </option>
                                    </>
                                )
                            })
                        }
                    </select>
                    <span className="btn btn-sm capitalize" onClick={() => doReset({ isSearch: false })}>
                        Reset Filter
                    </span>
                </div>
            </div>
            <div className="overflow-x-auto w-full mt-3 max-w-screen-2xl mx-auto">
                <div className="flex w-full justify-end mt-2">
                    {/* <Link href={'/administrator/users/create'}>
                        <span className="btn btn-success btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="#000000" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z"></path></svg> Tambah
                        </span>
                    </Link> */}
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn m-1 btn-sm btn-info">+ Tambah</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link href={'/administrator/users/headmaster/create'}>Kepala Sekolah</Link></li>
                            <li><Link href={'/administrator/users/teacher/create'}>Guru</Link></li>
                            <li><Link href={'/administrator/users/education-authorities/create'}>Dinas Pendidikan</Link></li>
                            <li><Link href={'/administrator/users/health_worker/create'}>Tenaga Kesehatan</Link></li>
                        </ul>
                    </div>

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
                            <th>Nip</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.data?.map((user, index) => {
                                return <tr className="hover" key={index}>
                                    <th>
                                        <label>
                                            {(users.current_page * users.per_page) - (users.per_page - index) + 1}
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
                                                <div className="font-bold">{user.personal_data?.name}</div>
                                                <div className="text-sm opacity-50">{user.reference_work_unit?.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user.registration_number}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        {user.role.name}
                                    </td>

                                    <td>
                                        <div className="flex gap-2">
                                            <span className="btn btn-ghost btn-xs">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="#ffb266" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75l-2.53 2.54l3.75 3.75l2.53-2.54z"></path></svg>
                                            </span>
                                            <label htmlFor="delete-modal" className="btn btn-ghost btn-xs" onClick={() => setSelected(user)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="#ff0000" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1ZM5 21V6H4V4h5V3h6v1h5v2h-1v15Z"></path></svg>
                                            </label>
                                        </div>

                                    </td>
                                </tr>
                            })
                        }
                        <tr>
                            <td colSpan={6} className={!users.data || users.data?.length < 1 ? '' : 'hidden'}>
                                <p className="text-center">
                                    Data tidak ditemukan
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <input type="checkbox" id="delete-modal" className="modal-toggle" />
            <label htmlFor="delete-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">Konfirmasi</h3>
                    <p className="py-4">Apakah anda yakin ingin menghapus <span className="font-bold">{selected?.personal_data?.name}</span> ? </p>
                    <div className="modal-action">
                        <label htmlFor="delete-modal" className="btn btn-outline">Tidak</label>
                        <button className="btn" onClick={() => handleDelete()}>Ya</button>
                    </div>
                </label>
            </label>
            <div className={`${users.first_page_url == users.last_page_url ? 'hidden' : ''} grid w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible`}>
                <nav>
                    <ul className="flex">
                        {
                            users.links?.map((link, index) => {
                                return <span key={index}>
                                    <label onClick={() => {
                                        fetchData({
                                            page: parseInt(link.label),
                                            search: router.query?.search ? router.query?.search : '',
                                            unit_id: router.query?.unit_id ? router.query?.unit_id : ''
                                        })
                                    }} className={`${users.current_page == link.label ? 'bg-sky-500' : 'bg-base-100'} mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100  p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300`} aria-label="Previous">
                                        <span className="material-icons text-sm"> {link.label.replace('&laquo; Previous', '<<').replace('Next &raquo;', '>>')} </span>
                                    </label>
                                </span>
                            })
                        }
                    </ul>
                </nav>
            </div>
        </PageLayout>
    </>
}

export default Index