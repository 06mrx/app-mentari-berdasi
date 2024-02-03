import PageLayout from "@/components/PageLayout";
import Image from "next/image";
import useSWR, { mutate } from 'swr'
import { storageService } from "@/services/storage.service";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css'
import parse from 'html-react-parser';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import Link from "next/link";
export default function Detail() {
    const QuillNoSSRWrapper = dynamic(import('react-quill'), {
        ssr: false,
        loading: () => <p>Loading ...</p>,
    })
    let token = 'Bearer ' + storageService.getToken();
    const router = useRouter();
    const fetcher = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then((res) => res.json())

    let id = router.query.id;
    if (router.isReady) {
        id = router.query.id
    }
    const { data: student, error } = useSWR(process.env.API + '/api/headmaster/student-personal-data/show/' + id, id ? fetcher : null)
    const { data: chartData } = useSWR(process.env.API + '/api/headmaster/student-personal-data/chart/' + id, id ? fetcher : null)
    const { data: healthActions, mutate } = useSWR(process.env.API + '/api/administrator/student-health-action/list/' + id, id ? fetcher : null)
    const { data: growthStatus } = useSWR(process.env.API + '/api/headmaster/student-personal-data/check-status/' + id, id ? fetcher : null)

   
  

    const options1 = {
        chart: {
            id: 'tinggi',
            group: 'tinggi',
            type: 'area',
            sparkline: {
                enabled: false
            },
        },
        stroke: {
            curve: 'smooth',
            width: 1
        },
        fill: {
            colors: ['#ff00ff', '#00ffff']
        },
        labels: chartData?.data?.labelHeight ? chartData.data?.labelHeight : [],
        xaxis: {
            type: 'month',
        },
        yaxis: {
            min: 0,
            show: false
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: undefined,
            formatter: function (val, opts) {
                return val + ' cm'
            },
            textAnchor: 'middle',
            distributed: false,
            offsetX: 10,
            offsetY: 0,
            style: {
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 'bold',
                colors: undefined
            }
        },
        colors: ['#ff00ff', '#00ffff'],
        //colors: ['#5564BE'],

    };
    const series1 = [
        {
            name: 'Tinggi',
            data: chartData?.data?.dataHeight ? chartData.data?.dataHeight : []
        },
        // {
        //     name: 'Standar',
        //     data: chartData?.data?.dataHeightStandart ? chartData.data?.dataHeightStandart : []
        // }
    ];

    const options2 = {
        chart: {
            id: 'berat',
            group: 'berat',
            type: 'area',
            sparkline: {
                enabled: false
            },
        },
        stroke: {
            curve: 'smooth',
            width: 1
        },
        fill: {
            colors: ['#ff00ff', '#00ffff']
        },
        labels: chartData?.data?.labelWeight ? chartData.data?.labelWeight : [],
        xaxis: {
            type: 'month',
        },
        yaxis: {
            min: 0,
            show: false
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: undefined,
            formatter: function (val, opts) {
                return val + ' kg'
            },
            textAnchor: 'middle',
            distributed: false,
            offsetX: 10,
            offsetY: 0,
            style: {
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 'bold',
                colors: undefined
            }
        },
        colors: ['#ff00ff', '#00ffff'],
        //colors: ['#5564BE'],

    };
    const series2 = [
        {
            name: 'Berat',
            data: chartData?.data?.dataWeight ? chartData.data?.dataWeight : []
        },
        // {
        //     name: 'Standar',
        //     data: chartData?.data?.dataWeightStandart ? chartData.data?.dataWeightStandart : []
        // }
    ];

    const monthDiff = (start_date) => {
        var months;
        let s_date = new Date(start_date);
        let today = new Date();
        months = (today.getFullYear() - s_date.getFullYear()) * 12;
        months -= s_date.getMonth();
        return months <= 0 ? 0 : months + 1;
    }
    // monthDiff();
    if (!student || !healthActions || !growthStatus) return <></>
    return <>
        <PageLayout title={'Detail Siswa'} hasBackUrl={true} backUrl="/education-authorities/students">
            <ToastContainer />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <div className="bg-sky-300 rounded-2xl shadow-xl p-3 flex flex-col items-center relative">
                        <Image src={student.data?.gender == 'Laki-laki' ? '/assets/images/boy.png' : '/assets/images/girl.png'} height={250} width={250} alt="child photo"></Image>
                        <p className="bg-base-100 rounded-full px-6 mt-3">{student.data?.name} - {monthDiff(student.data?.birth_date)} Bulan</p>
                        <p className="bg-base-100 rounded-full px-6 mt-3 mb-8">{student.data?.reference_work_unit?.name}</p>
                        {/* <p className="bg-base-100 rounded-full px-6 mt-3 mb-8">{monthDiff(student.data?.birth_date)}</p> */}
                        <div class="absolute inset-x-0 bottom-2 text-center bg-sky-300">
                            <Link href={'/education-authorities/students/' + student.data?.id + '/growth'}>
                                <div className="flex w-full items-center justify-center group">
                                    <span className="font-semibold cursor-pointer group-hover:text-sky-500">
                                        Lihat Selengkapnya
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" className=" fill-black group-hover:fill-sky-500" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"></path></svg>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="bg-base-100 rounded-2xl shadow-xl p-3 mt-3">
                        <p className="font-semibold mb-3 text-2xl">Perkembangan Anak</p>
                        <p className="opacity-90 text-sm leading-3">Berdasarkan data pada tanggal {student.data?.last_weight[0]?.created_at}</p>
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
                                <div className="flex  flex-col w-2/3">
                                    <p className="font-semibold text-2xl">Antropometri</p>
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    Berat badan
                                                </td>
                                                <td className="font-bold">
                                                    {student.data?.last_weight[0]?.weight} kg ({growthStatus?.data?.weight_status})
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Tinggi Badan
                                                </td>
                                                <td className="font-bold">
                                                    {student.data?.last_height[0]?.height} cm ({growthStatus?.data?.height_status})
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    IMT
                                                </td>
                                                <td className="font-bold">
                                                    {parseFloat(student.data?.bmi ? student.data?.bmi : 0).toFixed(2)}  ({student.data?.bmi_status})
                                                </td>
                                            </tr>
                                            {/* <tr>
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
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
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
                        
                    </div>
                </div>
                <div className="bg-base-100 rounded-2xl shadow-xl relative">
                    <p className="font-semibold text-2xl p-3">Perkembangan Tinggi Badan</p>
                    <ReactApexChart options={options1} series={series1} type="line" height={280} />
                    <p className="font-semibold text-2xl p-3">Perkembangan berat Badan</p>
                    <ReactApexChart options={options2} series={series2} type="line" height={280} />
                    <div class="absolute inset-x-0 bottom-2 text-center bg-base-100">
                        <Link href={'/education-authorities/students/' + student?.data?.id + '/growth'}>
                            <div className="flex w-full items-center justify-center group">
                                <span className="font-semibold cursor-pointer group-hover:text-sky-500">
                                    Lihat Selengkapnya
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" className=" fill-black group-hover:fill-sky-500" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"></path></svg>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="relative bg-base-100 rounded-2xl shadow-xl p-2 overflow-auto">
                    <div className="flex justify-between items-center w-full">
                        <p className="font-semibold text-2xl p-2">Riwayat intervensi perlakuan</p>
                    </div>
                    {
                        healthActions?.data?.data?.map((healthAction, index) => {
                            return (
                                <div className="bg-orange-500/70 shadow-lg rounded-2xl mb-2" key={index}>
                                    <div className="flex gap-2 p-3">
                                        <Image src={'/assets/images/avatar.png'} height={40} width={40} alt="photo" />
                                        <p className="font-semibold">{healthAction.user?.personal_data?.name} | {healthAction.user?.reference_work_unit?.name}</p>
                                    </div>
                                    <div className="bg-base-100 p-2 rounded-2xl ">
                                        <div className="no-tailwindcss-base">{parse(healthAction.note)}</div>
                                        <p className="text-right opacity-50 text-sm">{healthAction.created_at}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        healthActions?.data?.data?.length == 0 ? <p className="mt-5 mb-10 text-center opacity-60">Tidak ada data</p> : ''
                    }

                    <div class="absolute inset-x-0 bottom-2 text-center bg-base-100">
                        <Link href={'/education-authorities/students/' + student.data?.id + '/growth-intervention'}>
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
        </PageLayout>
    </>
}