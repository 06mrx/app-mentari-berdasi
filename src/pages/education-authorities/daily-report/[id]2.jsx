import PageLayout from "@/components/PageLayout";
import Link from "next/link";
function Index() {
    return <>
        <PageLayout title={'Laporan Harian Bawahan'} hasBackUrl={true} backUrl="/education-authorities/daily-report">
            <div className="flex w-full justify-end mt-3">
                {/* <Link href={'/teacher/daily-report/create'}>
                    <button className="btn btn-sm btn-info">
                        Tambah
                    </button>
                </Link> */}
            </div>
            <div className="overflow-x-auto w-full mt-3  mx-auto">
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
                                    1
                                </label>
                            </th>
                            <td className="whitespace-normal">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum dolorum quidem natus tempora minus! Fugiat ducimus libero totam accusantium inventore fuga at tempora itaque, deserunt soluta facere illo veritatis ut!
                            </td>
                            <td>
                                <div>
                                    <div className="">1 Januari 2023</div>
                                    <div className="text-sm opacity-50">Pukul 8 - 9</div>
                                </div>
                            </td>
                            <td>
                                1 jam

                            </td>
                            <td>
                                <div className="font-semibold">
                                    Jenis Output : output 1
                                </div>
                                <div>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                                </div>
                                <div>
                                    <span className="text-indigo-500">
                                        FIlename
                                    </span>
                                </div>
                            </td>
                            <td>
                                <span className="badge badge-info">Belum di review</span>
                            </td>
                            <td>
                                <div className="flex gap-2 items-center">
                                    <label htmlFor="my-modal-4" className="btn btn-ghost text-success">
                                        Terima
                                    </label>
                                    <label htmlFor="my-modal-5" className="btn btn-ghost text-error">
                                        Tolak
                                    </label>
                                </div>
                            </td>
                        </tr>
                        <tr className="hover">
                            <th>
                                <label>
                                    2
                                </label>
                            </th>
                            <td className="whitespace-normal">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum dolorum quidem natus tempora minus! Fugiat ducimus libero totam accusantium inventore fuga at tempora itaque, deserunt soluta facere illo veritatis ut!
                            </td>
                            <td>
                                <div>
                                    <div className="">1 Januari 2023</div>
                                    <div className="text-sm opacity-50">Pukul 8 - 9</div>
                                </div>
                            </td>
                            <td>
                                1 jam

                            </td>
                            <td>
                                <div className="font-semibold">
                                    Jenis Output : output 1
                                </div>
                                <div>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                                </div>
                                <div>
                                    <span className="text-indigo-500">
                                        FIlename
                                    </span>
                                </div>
                            </td>
                            <td>
                                <span className="badge badge-success">Diterima</span>
                            </td>
                            <td>
                                {/* <div className="flex gap-2 items-center">
                                    <label htmlFor="my-modal-4">
                                        <span className="btn btn-ghost btn-xs">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="#ff0000" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1ZM5 21V6H4V4h5V3h6v1h5v2h-1v15Z"></path></svg>
                                        </span>
                                    </label>
                                    <span className="btn btn-ghost btn-xs">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="#ffb266" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75l-2.53 2.54l3.75 3.75l2.53-2.54z"></path></svg>
                                    </span>
                                    <Link href={'/administrator/students/1'}>
                                        <span className="btn btn-ghost btn-xs tooltip tooltip-success mt-1" data-tip='Lihat'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8   rounded-lg rotate-180" viewBox="0 -4 24 24"><path fill="none" stroke="#00ff00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                                        </span>
                                    </Link>
                                </div> */}
                            </td>
                        </tr>
                        <tr className="hover">
                            <th>
                                <label>
                                    3
                                </label>
                            </th>
                            <td className="whitespace-normal">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum dolorum quidem natus tempora minus! Fugiat ducimus libero totam accusantium inventore fuga at tempora itaque, deserunt soluta facere illo veritatis ut!
                            </td>
                            <td>
                                <div>
                                    <div className="">1 Januari 2023</div>
                                    <div className="text-sm opacity-50">Pukul 8 - 9</div>
                                </div>
                            </td>
                            <td>
                                1 jam

                            </td>
                            <td>
                                <div className="font-semibold">
                                    Jenis Output : output 1
                                </div>
                                <div>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                                </div>
                                <div>
                                    <span className="text-indigo-500">
                                        FIlename
                                    </span>
                                </div>
                            </td>
                            <td>
                                <span className="badge badge-error">Ditolak</span>
                            </td>
                            <td>
                                {/* <div className="flex gap-2 items-center">
                                    <label htmlFor="my-modal-4">
                                        <span className="btn btn-ghost btn-xs">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="#ff0000" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1ZM5 21V6H4V4h5V3h6v1h5v2h-1v15Z"></path></svg>
                                        </span>
                                    </label>
                                    <span className="btn btn-ghost btn-xs">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="#ffb266" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75l-2.53 2.54l3.75 3.75l2.53-2.54z"></path></svg>
                                    </span>
                                    <Link href={'/administrator/students/1'}>
                                        <span className="btn btn-ghost btn-xs tooltip tooltip-success mt-1" data-tip='Lihat'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8   rounded-lg rotate-180" viewBox="0 -4 24 24"><path fill="none" stroke="#00ff00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                                        </span>
                                    </Link>
                                </div> */}
                            </td>
                        </tr>
                    </tbody>


                </table>
            </div>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">Konfirmasi</h3>
                    <p className="py-4">Apakah anda yakin ingin menyetujui <span className="font-bold">XYZ</span> ? </p>
                    {/* <label htmlFor="" className="text-sm font-semibold">Masukkan alasan diterima jika ada</label> */}
                    {/* <textarea name="" className="textarea w-full textarea-bordered"></textarea> */}
                    <div className="modal-action">
                        <label htmlFor="my-modal-4" className="btn btn-outline">Tidak</label>
                        <label htmlFor="my-modal-4" className="btn">Ya</label>
                    </div>
                </label>
            </label>
            <input type="checkbox" id="my-modal-5" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                <h3 className="text-lg font-bold">Konfirmasi</h3>
                    <p className="py-4">Apakah anda yakin ingin menyetujui <span className="font-bold">XYZ</span> ? </p>
                    <label htmlFor="" className="text-sm font-semibold">Masukkan alasan penolakan jika ada</label>
                    <textarea name="" className="textarea w-full textarea-bordered"></textarea>
                    <div className="modal-action">
                        <label htmlFor="my-modal-5" className="btn btn-outline">Tidak</label>
                        <label htmlFor="my-modal-5" className="btn">Ya</label>
                    </div>
                </label>
            </label>
        </PageLayout>
    </>
}

export default Index