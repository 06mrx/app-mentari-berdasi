import PageLayout from "@/components/PageLayout";
import Link from "next/link";
export default function Create() {
    return <>
        <PageLayout title={'Tambah Laporan Harian'} hasBackUrl={true} backUrl="/teacher/daily-report">
            <div className="max-w-5xl mx-auto rounded-2xl shadow-lg p-3 bg-base-100">
                <p className="text-2xl">Form Tambah Laporan Harian</p>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Aktivitas</span>
                        <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                    </label>
                    <textarea placeholder="Masukkan Aktivitas" className="textarea w-full input-bordered" >

                    </textarea>
                    <label className="label">
                        {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                        {/* <span className="label-text-alt">Alt label</span> */}
                    </label>
                </div>
                <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Tanggal</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input type="date" placeholder="Kilgoram" className="input x-date input-sm w-full input-bordered" />
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Waktu Mulai</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input type="time" placeholder="Kilgoram" className="input x-date input-sm w-full input-bordered" />
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Waktu Selesai</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input type="time" placeholder="Sentimeter" className="input x-date input-sm w-full input-bordered" />
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    <div className="form-control w-1/3">
                        <label className="label">
                            <span className="label-text font-semibold">Durasi</span>
                            {/* <span className="label-text-alt text-red-500 font-semibold">* Wajib</span> */}
                        </label>
                        <div className="flex gap-2">
                            <input type="number" placeholder="0" id="duration" disabled className="input x-date input-sm w-full input-bordered" /> Jam
                        </div>
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Luaran</span>
                        <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                    </label>
                    <textarea placeholder="Masukkan luaran" className="textarea w-full input-bordered" >

                    </textarea>
                    <label className="label">
                        {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                        {/* <span className="label-text-alt">Alt label</span> */}
                    </label>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Jenis Luaran</span>
                        <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                    </label>
                    <select className="select select-sm w-full select-bordered font-normal">
                        <option disabled selected>Pilih jenis luaran</option>
                        <option>Laki-laki</option>
                        <option>Perempuan</option>
                    </select>
                    <label className="label">
                        {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                        {/* <span className="label-text-alt">Alt label</span> */}
                    </label>
                </div>
                <div className="form-control w-full">
                    <label class="block">
                        <label className="label">
                            <span className="label-text font-semibold">File Luaran</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input type="file" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        <label className="label">
                            <span className="label-text-alt">File Berekstensi *.pdf, *.docx atau *.doc Dengan Maksimal Size 5MB</span>
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                        </label>
                    </label>
                </div>
                <div className="flex w-full justify-end gap-2 mt-2">
                    <Link href={'/teacher/daily-report'}>
                    <button className="btn btn-info btn-outline btn-sm">
                        Kembali
                    </button>
                    </Link>
                    <button className="btn btn-info btn-sm">
                        Simpan
                    </button>
                </div>
            </div>
        </PageLayout>
    </>
}