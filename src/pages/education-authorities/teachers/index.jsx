import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import Image from "next/image";
function Index() {
    return <>
        <PageLayout title={'Daftar Guru PAUD'} hasBackUrl={true} backUrl="/education-authorities">
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
                <div className="flex w-full lg:w-auto lg:justify-start justify-center gap-3">
                    <select className="select select-bordered select-sm w-full max-w-xs">
                        <option disabled selected>Filter Sekolah</option>
                        <option>Small Apple</option>
                        <option>Small Orange</option>
                        <option>Small Tomato</option>
                    </select>
                    <span className="btn btn-sm capitalize">
                        Reset Filter
                    </span>
                </div>
            </div>

            <div className="overflow-x-auto w-full mt-3 max-w-screen-2xl mx-auto shadow-xl">
                <table className="table w-full">
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
                            <th>No. HP</th>
                            <th></th>
                        </tr>
                    </thead>
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
                                            <Image src="/assets/images/avatar.png" alt="Avatar Tailwind CSS Component" height={100} width={100} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">
                                            <Link href={'/education-authorities/teachers/1'} className="text-primary underline">
                                                Nama Guru 1
                                            </Link>
                                        </div>
                                        <div className="text-sm opacity-50">Asal Sekolah 1</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                1234567812345678
                            </td>
                            <td>
                                1234567812345678@sipaud.sch.id
                            </td>
                            <td>
                                082289078
                            </td>
                            <th>
                                <div className="flex gap-2">
                                    {/* <span className="btn btn-ghost btn-xs">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="#ffb266" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75l-2.53 2.54l3.75 3.75l2.53-2.54z"></path></svg>
                                    </span> */}
                                    {/* <label htmlFor="my-modal-4">
                                        <span className="btn btn-ghost btn-xs">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="#ff0000" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1ZM5 21V6H4V4h5V3h6v1h5v2h-1v15Z"></path></svg>
                                        </span>
                                    </label> */}
                                    <Link href={'/education-authorities/teachers/1'}>
                                        <span className="btn btn-ghost btn-xs tooltip tooltip-success mt-1" data-tip='Lihat'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8   rounded-lg rotate-180" viewBox="0 -4 24 24"><path fill="none" stroke="#00ff00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                                        </span>
                                    </Link>
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

export default Index