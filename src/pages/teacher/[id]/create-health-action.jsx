import PageLayout from "@/components/PageLayout";

export default function Create() {
    return <>
        <PageLayout title={'Tambah Intervensi Perlakuan'} hasBackUrl={true} backUrl="/teacher/1">
            <div className="max-w-5xl mx-auto rounded-2xl shadow-lg p-3 bg-base-100">
                <p className="text-2xl">Nama Siswa | Nama Sekolah</p>
                <div className="flex gap-3">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Berat</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input type="number" placeholder="Kilgoram" className="input input-sm w-full input-bordered" />
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Tinggi</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <input type="number" placeholder="Sentimeter" className="input input-sm w-full input-bordered" />
                        <label className="label">
                            {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Catatan</span>
                        <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                    </label>
                    <textarea type="number" placeholder="Sentimeter" className="textarea w-full input-bordered" >

                    </textarea>
                    <label className="label">
                        {/* <span className="text-xs italic text-red-500">{(axiosErros.hasOwnProperty("whatsapp")) ? axiosErros.whatsapp[0] : ''}</span> */}
                        {/* <span className="label-text-alt">Alt label</span> */}
                    </label>
                </div>

                <div className="flex w-full justify-end">
                    <button className="btn btn-info btn-sm">
                        Simpan
                    </button>
                </div>
            </div>
        </PageLayout>
    </>
}