import PageLayout from "@/components/PageLayout";
import Image from "next/image";
import Line from "@/components/ApexChart/Line";
import Link from "next/link";
export default function Detail() {
    return <>
        <PageLayout title={'Detail Siswa'} hasBackUrl={true} backUrl="/education-authorities/students">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center mt-2">
                <div>
                    <div className="bg-sky-300 rounded-2xl shadow-xl p-3 flex flex-col items-center">
                        <Image src={'/assets/images/boy.png'} height={250} width={250} alt="child photo"></Image>
                        <p className="bg-base-100 rounded-full px-6 mt-3">Nama siswa</p>
                        <p className="bg-base-100 rounded-full px-6 mt-3">Asal Sekolah</p>
                    </div>
                    <div className="bg-base-100 rounded-2xl shadow-xl p-3 mt-3">
                        <p className="font-semibold mb-3 text-2xl">Perkembangan Anak</p>
                        {/* <div className="bg-indigo-300/50 p-3 rounded-2xl shadow-md">
                            <div className="flex gap-3">
                                <Image src={'/assets/images/school.png'} width={70} height={70} alt="foto sekolah" />
                                <div className="flex flex-col">
                                    <p className="font-semibold text-2xl">Asal Sekolah</p>
                                    <p className="text-lg">PAUD 1</p>
                                </div>
                            </div>
                        </div> */}
                        <div className="bg-indigo-300 p-3 rounded-2xl shadow-md mt-3">
                            <div className="flex gap-3">
                                {/* <Image src={'/assets/images/school.png'} width={70} height={70} alt="foto sekolah" /> */}
                                <div className="flex flex-col w-1/2">
                                    <p className="font-semibold text-2xl">Literasi</p>
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    L1
                                                </td>
                                                <td>
                                                    BB
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    L2
                                                </td>
                                                <td>
                                                    MB
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    L3
                                                </td>
                                                <td>
                                                    MSH
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    L4
                                                </td>
                                                <td>
                                                    BSB
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    L5
                                                </td>
                                                <td>
                                                    BSB
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex flex-col w-1/2">
                                    <p className="font-semibold text-2xl">Numerisasi</p>
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    N1
                                                </td>
                                                <td>
                                                    BB
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    N2
                                                </td>
                                                <td>
                                                    MB
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    N3
                                                </td>
                                                <td>
                                                    MSH
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    N4
                                                </td>
                                                <td>
                                                    BSB
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    N5
                                                </td>
                                                <td>
                                                    BSB
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="bg-indigo-300 p-3 rounded-2xl shadow-md mt-3">
                            <div className="flex gap-3">
                                {/* <Image src={'/assets/images/school.png'} width={70} height={70} alt="foto sekolah" /> */}
                                <div className="flex  flex-col w-1/2">
                                    <p className="font-semibold text-2xl">Antropometri</p>
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    Berat badan
                                                </td>
                                                <td>
                                                    1 kg
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Tinggi Badan
                                                </td>
                                                <td>
                                                    12 cm
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Lingkar lengan
                                                </td>
                                                <td>
                                                    1 cm
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Lingkar kepala
                                                </td>
                                                <td>
                                                    1 cm
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex bg-base-100 rounded-2xl p-2 flex-col w-1/2">
                                    <p className="">Bagian ini berisi narasi hasil keputusan berdasarkan data <span className="font-semibold">perkembangan anak</span> , dapat berupa rekomendasi, masukan dll.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-base-100 rounded-2xl shadow-xl relative">
                    <div className="flex justify-between gap-2 items-center">
                        <p className="font-semibold text-2xl p-3">Perkembangan Tinggi Badan</p>
                        {/* <Link href={'/education-authorities/1/create'}>
                            <button className="btn btn-sm btn-info mr-3">
                                + Tambah
                            </button>
                        </Link> */}
                    </div>
                    <Line></Line>
                    <p className="font-semibold text-2xl p-3">Perkembangan berat Badan</p>
                    <Line></Line>
                    <div class="absolute inset-x-0 bottom-2 text-center">
                        <Link href={'/education-authorities/students/1/growth'}>
                            <div className="flex w-full items-center justify-center group">
                                <span className="font-semibold cursor-pointer group-hover:text-sky-500">
                                    Lihat Selengkapnya
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" className=" fill-black group-hover:fill-sky-500" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"></path></svg>
                            </div>
                        </Link>
                    </div>
                    {/* <div className="p-2">
                        <table className="w-full table">
                            <thead>
                                <tr>
                                    <th>
                                        Kategori Status Gizi
                                    </th>
                                    <th>
                                        Ambang batas
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Gizi kurang (thinness)
                                    </td>
                                    <td>
                                        -3 SD sampai 2 SD
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Gizi baik (normal)
                                    </td>
                                    <td>
                                        -2 SD sampai 1 SD
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Gizi lebih (overweight)
                                    </td>
                                    <td>
                                        1 SD sampai 2 SD
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Obesitas (obese)
                                    </td>
                                    <td>
                                        Diatas 2 SD
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}
                </div>
                <div className="bg-base-100 rounded-2xl shadow-xl p-2 relative">
                    <p className="font-semibold text-2xl p-3">Riwayat intervensi perlakuan</p>
                    <div className="bg-orange-500/70 shadow-lg rounded-2xl">
                        <div className="flex gap-2 p-3">
                            <Image src={'/assets/images/avatar.png'} height={40} width={40} alt="photo" />
                            <p className="font-semibold">Nama Nakes | Nama Unit Kerja</p>
                        </div>
                        <div className="bg-base-100 p-2 rounded-2xl">
                            <p>Makan yang banyak</p>
                            <p className="text-right opacity-50 text-sm">20 Agustus 2023</p>
                        </div>
                    </div>
                    <div className="bg-orange-500/70 shadow-lg rounded-2xl mt-3">
                        <div className="flex gap-2 p-3">
                            <Image src={'/assets/images/avatar.png'} height={40} width={40} alt="photo" />
                            <p className="font-semibold">Nama Nakes | Nama Unit Kerja</p>
                        </div>
                        <div className="bg-base-100 p-2 rounded-2xl">
                            <p>Makan yang banyak</p>
                            <p className="text-right opacity-50 text-sm">20 Agustus 2023</p>
                        </div>
                    </div>
                    <div className="bg-orange-500/70 shadow-lg rounded-2xl mt-3">
                        <div className="flex gap-2 p-3">
                            <Image src={'/assets/images/avatar.png'} height={40} width={40} alt="photo" />
                            <p className="font-semibold">Nama Nakes | Nama Unit Kerja</p>
                        </div>
                        <div className="bg-base-100 p-2 rounded-2xl">
                            <p>Makan yang banyak</p>
                            <p className="text-right opacity-50 text-sm">20 Agustus 2023</p>
                        </div>
                    </div>
                    <div className="mt-10">

                    </div>
                    <div class="absolute inset-x-0 bottom-2 text-center">
                        <Link href={'/education-authorities/students/1/growth-intervention'}>
                            <div className="flex w-full items-center justify-center group">
                                <span className="font-semibold cursor-pointer group-hover:text-sky-500">
                                    Lihat Selengkapnya
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" className=" fill-black group-hover:fill-sky-500" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"></path></svg>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            {/* <div className="rounded-2xl shadow-xl p-3 bg-base-100 mt-4">
                <p className="font-semibold text-2xl">Indikator Pembelajaran</p>
                <div className="overflox-x-auto max-w-screen-lg mx-auto">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim eum expedita eaque qui facere unde natus ad voluptates dolores error. Debitis in officiis voluptatum nam explicabo ut repellat, corporis qui.
                </div>
            </div> */}
        </PageLayout>
    </>
}