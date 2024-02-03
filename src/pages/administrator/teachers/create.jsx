import PageLayout from "@/components/PageLayout";
import Link from "next/link";
function Create() {
    return <>
        <PageLayout title={'Tambah Guru'} hasBackUrl={false} isNativeBack>

            <div className="max-w-3xl mx-auto bg-base-100 rounded-lg shadow-lg p-3">
                <div className="flex gap-3 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Nama Lengkap</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input type="text" placeholder="Contoh: Ahmad Sulaiman" className="input input-sm w-full input-bordered" />
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">No. Registrasi</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input type="text" placeholder="Contoh: 1997xxxxxx" className="input input-sm w-full input-bordered" />
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                </div>
                <div className="flex gap-3 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">NIK</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input type="number" maxLength={16} placeholder="Contoh: 73020106xxxxxxxx" className="input input-sm w-full input-bordered" />
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    {/* <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">NUPTK</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input type="number" placeholder="Contoh: 1234xxxxxx" className="input input-sm w-full input-bordered" />
                        <label className="label">
                        </label>
                    </div> */}
                </div>
                <div className="flex gap-3 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Tempat Lahir</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input type="text" placeholder="Contoh: Makassar" className="input input-sm w-full input-bordered" />
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Tanggal Lahir</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input type="date" placeholder="Contoh: 1234xxxxxx" className="input x-date input-sm w-full input-bordered" />
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                </div>
                <div className="flex gap-3 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Jenis Kelamin</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <select className="select select-sm w-full select-bordered font-normal">
                            <option disabled selected>Pilih jenis kelamin</option>
                            <option>Laki-laki</option>
                            <option>Perempuan</option>
                        </select>
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Status Perkawinan</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <select className="select select-sm select-bordered w-full font-normal">
                            <option disabled selected>Pilih status perkawinan</option>
                            <option>Belum Kawin</option>
                        </select>
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                </div>
               
                <div className="flex gap-3 w-full">
                <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Agama</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <select className="select select-sm w-full select-bordered font-normal">
                            <option disabled selected>Pilih agama</option>
                            <option>Laki-laki</option>
                            <option>Perempuan</option>
                        </select>
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Pendidikan</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <select className="select select-sm select-bordered w-full font-normal">
                            <option disabled selected>Pilih pendidikan</option>
                            <option>Belum Kawin</option>
                        </select>
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Email</span>
                        <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                    </label>
                    <input type="text" placeholder="Contoh : contoh@gmail.com" className="input input-sm w-full input-bordered" />
                    <label className="label">
                        {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                        {/* <span className="label-text-alt">Alt label</span> */}
                    </label>
                </div>
                <div className="flex gap-3 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input type="text" placeholder="**********" className="input input-sm w-full input-bordered" />
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Konfirmasi Passowrd</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input type="text" placeholder="Masukkan kembali password" className="input input-sm w-full input-bordered" />
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                </div>

                <div className="flex gap-3 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Alamat</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input type="text" placeholder="Masukkan Alamat" className="input input-sm w-full input-bordered" />
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Kode Pos</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input type="number" placeholder="Masukkan kdoe pos" className="input input-sm w-full input-bordered" />
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Kelurahan / Desa</span>
                        <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                    </label>
                    <select className="select select-sm select-bordered w-full font-normal">
                        <option disabled selected>Pilih Kelurahan / Desa</option>
                        <option>Belum Kawin</option>
                    </select>
                    <label className="label">
                        {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                        {/* <span className="label-text-alt">Alt label</span> */}
                    </label>
                </div>
                <div className="flex w-full justify-end gap-3">
                    <Link href={'/headmaster/teachers'}>
                    <button className="btn btn-outline btn-sm btn-info">
                        Kembali
                    </button>
                    </Link>
                    <button className="btn btn-sm btn-info">
                        Submit
                    </button>
                </div>
            </div>
        </PageLayout>
    </>
}

export default Create