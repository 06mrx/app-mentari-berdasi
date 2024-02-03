import PageLayout from "@/components/PageLayout"
import Link from "next/link"
import Card from "@/components/Card"
import Image from "next/image"
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { storageService } from "@/services/storage.service";
import useSWR from 'swr';
function Index() {
    let token = 'Bearer ' + storageService.getToken();
    const fetcher = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then((res) => res.json())
    const { data, error } = useSWR(process.env.API + '/api/education-authorities/dashboard/index', fetcher)
    var series = [data?.data?.berat_badan_sangat_kurang, data?.data?.berat_badan_kurang, data?.data?.berat_badan_normal, data?.data?.resiko_berat_badan_lebih]
    var options = {
        series: [17, 15],
        chart: {
            type: 'donut',
        },
        labels: ["Berat badan sangat kurang", "Berat badan kurang", "Berat badan normal", "Resiko berat badan lebih"],
        responsive: [{
            breakpoint: 700,
            options: {
                chart: {
                    width: '100%'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    var series2 = [data?.data?.sangat_pendek, data?.data?.pendek, data?.data?.normal, data?.data?.tinggi]
    var options2 = {
        series: [17, 15],
        chart: {
            type: 'donut',
        },
        labels: ["Sangat pendek", "Pendek", "Normal", "Tinggi"],
        responsive: [{
            breakpoint: 700,
            options: {
                chart: {
                    width: '100%'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    var series3 = [data?.data?.perempuan, data?.data?.laki_laki]
    var options3 = {
        series: [17, 15],
        chart: {
            type: 'donut',
        },
        labels: ["Perempuan", "Laki-laki"],
        responsive: [{
            breakpoint: 700,
            options: {
                chart: {
                    width: '100%'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
    var series4 = [data?.data?.gizi_buruk, data?.data?.gizi_kurang, data?.data?.gizi_baik, data?.data?.gizi_lebih, data?.data?.obesitas]
    var options4 = {
        series: [17, 15],
        chart: {
            type: 'donut',
        },
        labels: ["Gizi Buruk", "Gizi Kurang", "Gizi Baik", "Gizi Lebih", "Obesitas"],
        responsive: [{
            breakpoint: 700,
            options: {
                chart: {
                    width: '100%'
                },
                legend: {
                    position: 'bottom',
                    show: true
                }
            }
        }]
    };
    if (!data) return <> </>
    return <>
        <PageLayout title="Dashboard" hasBackUrl={false}>

            <div className="p-2">
                <div className="mockup-code bg-sky-500 text-primary-content p-3">
                    <span className="">
                        <span className="text-xl md:text-2xl lg:text-3xl">
                            Hai <span className="font-bold text-orange-500">Dinas Pendidikan</span>, Selamat Datang di Aplikasi <span className="text-orange-500 font-semibold">SIPAUD</span> !
                        </span>
                        <p className="mt-2 max-w-6xl  text-base">
                            <span className="font-bold">SIPAUD</span> (Sistem Informasi Pendidikan Anak Usia Dini) Merupakan aplikai monitoring dan evaluasi perkembangan anak berbasis digital dibawah lingkup Dinas Pendidikan Tanah Tidung.

                        </p>
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                    <Link href="/education-authorities/students">
                        <Card>
                            <div className="flex">
                                <Image src="/assets/images/user.png" width={100} height={100} alt="photo"></Image>
                                <div className="flex flex-col justify-end items-end w-full gap-2">
                                    <h1 className="text-5xl font-semibold">{data.data?.student}</h1>
                                    <h2 className="text-xl">Siswa</h2>
                                </div>
                            </div>
                        </Card>
                    </Link>

                    <Link href="/education-authorities/daily-report">
                        <Card>
                            <div className="flex">
                                <Image src="/assets/images/daily-report.png" width={100} height={100} alt="photo"></Image>
                                <div className="flex flex-col justify-end items-end w-full gap-2">
                                    <h1 className="text-5xl font-semibold">{data.data?.daily_report}</h1>
                                    <h2 className="text-xl">Laporan Harian</h2>
                                </div>
                            </div>
                        </Card>
                    </Link>

                    {/* <Link href="/education-authorities/schools">
                        <Card>
                            <div className="flex">
                                <Image src="/assets/images/school.png" width={100} height={100} alt="photo"></Image>
                                <div className="flex flex-col justify-end items-end w-full gap-2">
                                    <h1 className="text-5xl font-semibold">{500}</h1>
                                    <h2 className="text-xl">Sekolah</h2>
                                </div>
                            </div>
                        </Card>
                    </Link> */}

                    <Link href="/education-authorities/teachers">
                        <Card>
                            <div className="flex">
                                <Image src="/assets/images/teacher.png" width={100} height={100} alt="photo"></Image>
                                <div className="flex flex-col justify-end items-end w-full gap-2">
                                    <h1 className="text-5xl font-semibold">{data.data?.teacher}</h1>
                                    <h2 className="text-xl">Guru</h2>
                                </div>
                            </div>
                        </Card>
                    </Link>


                    {/* <Link href="/admin/corp/dashboard">
                        <Card>
                            <div className="flex">
                                <Image src="/assets/images/kenpa.png" width={100} height={100} alt="photo"></Image>
                                <div className="flex flex-col justify-end items-end w-full gap-2">
                                    <h1 className="text-5xl font-semibold">{0}</h1>
                                    <h2 className="text-xl">Pengajuan KENPA</h2>
                                </div>
                            </div>
                        </Card>
                    </Link>

                    <Link href="/admin/corp/dashboard">
                        <Card>
                            <div className="flex">
                                <Image src="/assets/images/kgb.png" width={100} height={100} alt="photo"></Image>
                                <div className="flex flex-col justify-end items-end w-full gap-2">
                                    <h1 className="text-5xl font-semibold">{0}</h1>
                                    <h2 className="text-xl">Pengajuan KGB</h2>
                                </div>
                            </div>
                        </Card>
                    </Link>

                    <Link href="/admin/corp/dashboard">
                        <Card>
                            <div className="flex">
                                <Image src="/assets/images/mapping.png" width={100} height={100} alt="photo"></Image>
                                <div className="flex flex-col justify-end items-end w-full gap-2">
                                    <h1 className="text-5xl font-semibold">{0}</h1>
                                    <h2 className="text-xl">Pemetaan Guru</h2>
                                </div>
                            </div>
                        </Card>
                    </Link>

                    <Link href="/admin/corp/dashboard">
                        <Card>
                            <div className="flex">
                                <Image src="/assets/images/pojok.png" width={100} height={100} alt="photo"></Image>
                                <div className="flex flex-col justify-end items-end w-full gap-2">
                                    <h1 className="text-5xl font-semibold">{0}</h1>
                                    <h2 className="text-xl">Pojok Solusi 3</h2>
                                </div>
                            </div>
                        </Card>
                    </Link>

                    <Link href="/admin/corp/dashboard">
                        <Card>
                            <div className="flex">
                                <Image src="/assets/images/ticket.png" width={100} height={100} alt="photo"></Image>
                                <div className="flex flex-col justify-end items-end w-full gap-2">
                                    <h1 className="text-5xl font-semibold">{0}</h1>
                                    <h2 className="text-xl">Ticketing</h2>
                                </div>
                            </div>
                        </Card>
                    </Link> */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                    <Card>
                        <p className="font-semibold text-xl">Berat Badan (dibawah 60 bulan)</p>
                        <ReactApexChart options={options} series={series} type="donut" height={300} />
                    </Card>
                    <Card>
                        <p className="font-semibold text-xl">Tinggi Badan (dibawah 60 bulan)</p>
                        <ReactApexChart options={options2} series={series2} type="donut" height={300} />
                    </Card>
                    <Card>
                        <p className="font-semibold text-xl">IMT (diatas 60 bulan)</p>
                        <ReactApexChart options={options4} series={series4} type="donut" height={300} />
                    </Card>
                    <Card>
                        <p className="font-semibold text-xl">Jenis Kelamin</p>
                        <ReactApexChart options={options3} series={series3} type="donut" height={300} />
                    </Card>
                </div>
            </div>
        </PageLayout>
    </>
}

export default Index