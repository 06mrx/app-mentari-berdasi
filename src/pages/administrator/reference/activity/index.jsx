import PageLayout from "@/components/PageLayout";
import useSWR from 'swr';
import { useState, useRef } from "react";
import Link from "next/link";
import { storageService } from "@/services/storage.service";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function Index() {
    let token = 'Bearer ' + storageService.getToken();
    const fetcher = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then((res) => res.json());
    const [selected, setSelected] = useState()
    const [errors, setErrors] = useState([])
    const { data: activities, mutate } = useSWR(process.env.API + '/api/reference/activity/index', fetcher)
    // if(activities) console.log(activities.data)
    const formData = {
        name: useRef()
    }
    const DELETE = (url, token_token) => fetch(url, {
        method: 'DELETE',
        headers: {
            'authorization': token_token,
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()).then((data) => {
        mutate([''])
        toast.success('Berhasil menghapus data', {
            position: 'bottom-right'
        })
    })
    const handleDelete = () => {
        DELETE(process.env.API + '/api/reference/activity/destroy/' + selected.id, token)
    }
    const handleSubmit = event => {
        event.preventDefault();
        fetch(process.env.API + '/api/reference/activity/store/',{
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name.current.value
            })
        }).then((res) => res.json()).then((data) => {
            if (!data.success) {
                setErrors(data.data)
                toast.error('Gagal tambah data', {
                    position: 'bottom-right'
                })
            } else {
                document.getElementById('add-modal').checked = false
                mutate([''])
                toast.success('Berhasil menambah data', {
                    position: 'bottom-right'
                })
            }

        })
    }
    const handleEdit = event => {
        event.preventDefault();
        // alert(formData.name.current.value)
        fetch(process.env.API + '/api/reference/activity/update/' + selected.id, {
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name.current.value
            })
        }).then((res) => res.json()).then((data) => {
            if (!data.success) {
                setErrors(data.data)
                toast.error('Gagal edit data', {
                    position: 'bottom-right'
                })
            } else {
                // formData.name.current = '';
                setSelected(null)
                document.getElementById('name').value = ''
                document.getElementById('edit-modal').checked = false
                mutate([''])
                toast.success('Berhasil mengubah data', {
                    position: 'bottom-right'
                })
            }

        })
    }
    if (!activities) {
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
                                <th className="whitespace-normal">
                                    #
                                </th>
                                <th>Nama</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover">
                                <th className="whitespace-normal">
                                    <label>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4"></div>
                                    </label>
                                </th>

                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </td>

                                <th>
                                    <div className="flex gap-2">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                                    </div>

                                </th>
                            </tr>
                            <tr className="hover">
                                <th className="whitespace-normal">
                                    <label>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4"></div>
                                    </label>
                                </th>

                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </td>

                                <th>
                                    <div className="flex gap-2">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                                    </div>

                                </th>
                            </tr>
                            <tr className="hover">
                                <th className="whitespace-normal">
                                    <label>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4"></div>
                                    </label>
                                </th>

                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </td>

                                <th>
                                    <div className="flex gap-2">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                                    </div>

                                </th>
                            </tr>
                            <tr className="hover">
                                <th className="whitespace-normal">
                                    <label>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4"></div>
                                    </label>
                                </th>

                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </td>

                                <th>
                                    <div className="flex gap-2">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                                    </div>

                                </th>
                            </tr>
                            <tr className="hover">
                                <th className="whitespace-normal">
                                    <label>
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4"></div>
                                    </label>
                                </th>

                                <td>
                                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </td>

                                <th>
                                    <div className="flex gap-2">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
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
        <PageLayout title={'Referensi Aktivitas TPK'} hasBackUrl={true} backUrl="/administrator">
            <ToastContainer />
            <div className="p-2">
                <div className="hidden md:flex lg:flex justify-end w-full">
                    <button className="btn btn-info btn-sm">
                        + Tambah
                    </button>
                </div>
                <div className="fixed bottom-10 right-5">
                    <label htmlFor="add-modal" className=" btn btn-circle btn-info">
                        +
                    </label>
                </div>
                <div className="overflow-x-auto mx-auto max-w-7xl">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Nama
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                activities?.data?.map((activity, index) => {
                                    return (
                                        <tr className="hover" key={index}>
                                            <th>
                                                {index + 1}
                                            </th>
                                            <td>
                                                {activity.name}
                                            </td>
                                            <td>
                                                <label htmlFor="edit-modal" onClick={() => setSelected(activity)} className="btn btn-ghost btn-xs">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="#ffb266" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75l-2.53 2.54l3.75 3.75l2.53-2.54z"></path></svg>
                                                    </label>
                                                <label htmlFor="delete-modal" onClick={() => setSelected(activity)} className="btn btn-ghost btn-xs">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="#ff0000" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1ZM5 21V6H4V4h5V3h6v1h5v2h-1v15Z"></path></svg>
                                                </label>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
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
            <input type="checkbox" id="edit-modal" className="modal-toggle" />
            <label htmlFor="edit-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">Edit {selected?.name}</h3>
                    <form onSubmit={handleEdit}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Nama</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input placeholder="Masukkan Nama" id="name" key={selected?.name} defaultValue={selected?.name} className="input input-sm w-full input-bordered" ref={formData.name} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("name")) ? errors.name[0] : ''}</span>
                            </label>
                        </div>
                    </form>
                    <div className="modal-action">
                        <label htmlFor="edit-modal" className="btn btn-outline">Tidak</label>
                        <label htmlFor="edit-modal" onClick={handleEdit} className="btn">Ya</label>
                    </div>
                </label>
            </label>

            <input type="checkbox" id="add-modal" className="modal-toggle" />
            <label htmlFor="add-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">add {selected?.name}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Nama</span>
                                <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                            </label>
                            <input placeholder="Masukkan Nama" id="name"  className="input input-sm w-full input-bordered" ref={formData.name} />
                            <label className="label">
                                <span className="text-xs italic text-red-500">{(errors.hasOwnProperty("name")) ? errors.name[0] : ''}</span>
                            </label>
                        </div>
                    </form>
                    <div className="modal-action">
                        <label htmlFor="add-modal" className="btn btn-outline">Tidak</label>
                        <span htmlFor="add-modal" onClick={handleSubmit} className="btn">Ya</span>
                    </div>
                </label>
            </label>
           
        </PageLayout>
    </>
}