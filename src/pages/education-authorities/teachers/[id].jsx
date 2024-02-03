import PageLayout from "@/components/PageLayout";
import Image from "next/image";
import Link from "next/link";
export default function Detail() {
    return <>
        <PageLayout title={'Detail Guru'} hasBackUrl={true} backUrl="/education-authorities/teachers">
            <div className="flex flex-col md:flex-row lg:flex-row w-full gap-3 mt-3">
                <div className="w-full md:w-4/12 lg:w-4/12 bg-base-100 shadow-lg p-3 rounded-xl">
                    <div className="rounded-xl">
                        <Image src={'/assets/images/avatar.png'} width={500} height={100} alt="profile image" />
                    </div>
                </div>
                <div className="w-full md:w-9/12 lg:w-0/12 bg-base-100 shadow-lg p-3 rounded-xl">
                    <div className="overflow-x-auto">
                        <table className="table w-full table-compact">
                            <tbody>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Nama Lengkap
                                    </td>
                                    <td>
                                        Roshiana Maria Angelia Dewi Permata Gading, S.Pd
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        NIP
                                    </td>
                                    <td>
                                        199007282019032008
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        NIK
                                    </td>
                                    <td>
                                        6201026807900001
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        NUPTK
                                    </td>
                                    <td>
                                        6060768669130083
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Tempat, Tanggal Lahir
                                    </td>
                                    <td>
                                        Lamandau, 28 Juli 1990
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Jenis Kelamin
                                    </td>
                                    <td>
                                        Perempuan
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Status Perkawinan
                                    </td>
                                    <td>
                                        Menikah
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Agama
                                    </td>
                                    <td>
                                        Protestan
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Pangkat / Golongan
                                    </td>
                                    <td>
                                        Penata Muda Tingkat I / IIIb
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Unit Kerja
                                    </td>
                                    <td>
                                        SMAN 8 MALINAU
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Jabatan
                                    </td>
                                    <td>
                                        Guru Pertama
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Status
                                    </td>
                                    <td>
                                        Pegawai Negeri Sipil (PNS)
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Pendidikan Terakhir
                                    </td>
                                    <td>
                                        Sarjana (S1)
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        T.M.T CPNS / T.M.T PNS
                                    </td>
                                    <td>
                                        01 Maret 2019 / 01 Maret 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        NPWP
                                    </td>
                                    <td>
                                        909540783727000
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Nomor HP
                                    </td>
                                    <td>

                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Alamat Lengkap
                                    </td>
                                    <td>
                                        Perumahan Dinas SMAN 8 Malinau, No. B, KUALA LAPANG, MALINAU BARAT, KABUPATEN MALINAU, KALIMANTAN UTARA
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </PageLayout>
    </>
}