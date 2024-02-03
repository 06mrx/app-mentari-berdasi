import PageLayout from "@/components/PageLayout"
import Link from "next/link"
import Card from "@/components/Card"
import Image from "next/image"
import useSWR, { mutate } from 'swr'
import { useRouter } from "next/router"
import { storageService } from "@/services/storage.service"
import { useState } from "react"
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
    ssr: false,
});
import { Suspense } from "react"
function Index() {
    let token = 'Bearer ' + storageService.getToken();
    const router = useRouter();
    const fetcher = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then((res) => res.json())
    const [districtCode, setDistrictCode] = useState();
    const [villageCode, setVillageCode] = useState();
    const { data, error } = useSWR(process.env.API + '/api/headmaster/dashboard/index?district_code=' + (districtCode ? districtCode : '') + '&village_code=' + (villageCode ? villageCode : ''), fetcher)
    // api/reference/district/list
    if(error) {
        // console.log(error)
    }
    if(data) {
        if(!data.success) {
            storageService.remove("user")
            router.push('/');
        }
    }
    function detectMob() {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ];

        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });
    }
    if (router.isReady) {
        fetch('https://api-mentari.death-code.site/api/get-ip', {
            method: 'GET'
        }).then((res) => res.json()).then((data) => {
            // let isp = data.isp.toLowerCase();
            if (!(storageService.get('secret')?.toString() == 'true')) {
                if (!data.success && detectMob()) {
                    router.push('/warn')
                }
            }
            // if(!data.success) {
            //   router.push('/warn')
            // }
        })
    }

    const { data: districts } = useSWR(process.env.API + '/api/reference/district/list', fetcher)
    const [villages, setVillages] = useState();
    let height = data?.data?.chart?.data?.length;
    let minHeight = height < 3 ? height * 70 + 'px' : height * 40 + 'px';
    if (height == 1) {
        minHeight = height * 140 + 'px'
    } else if (height > 1 && height < 4) {
        minHeight = height * 70 + 'px'
    } else {
        minHeight = height * 40 + 'px'
    }
    var series = [{
        data: data?.data?.chart?.data
        // data: [1,2,3,4,5,6]
    }];
    var options = {
        chart: {
            type: 'bar',
            height: 350,

        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        grid: {
            show: false,
            padding: {
                left: 0,
                right: 0,
            },
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '12px',
                    fontWeight: 500,
                },
            }
        },
        // colors: ['#fab23d'],
        colors: ['#ee4128'],
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: data?.data?.chart?.label,
        },
        tooltip: {
            theme: 'dark',
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return 'Total Laporan'
                    }
                }
            }
        }
    };

    const onChangeDistrict = event => {
        fetch(process.env.API + '/api/reference/village/search2?district_code=' + event, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        }).then((res) => res.json()).then((data) => {
            setVillages(data.data);
        })
    }
    const doFilterDistrict = event => {
        event = event.replace(' ', '');
        router.push({
            pathname: '/headmaster',
            query: { ...router.query, district_code: event }
        },
            undefined,
            { scroll: false }
        )
        onChangeDistrict(event)
        setDistrictCode(event)
    }
    const doFilterVillage = event => {
        router.push({
            pathname: '/headmaster',
            query: { ...router.query, village_code: event, district_code: districtCode ? districtCode : '' }
        },
            undefined,
            { scroll: false }
        )
        setVillageCode(event)
        // onChangeDistrict(event)
    }
    const doReset = () => {
        setVillageCode(null);
        setDistrictCode(null);
        router.push('/headmaster')
        document.getElementById('district_code').value = ''
        document.getElementById('village_code').value = ''
        mutate([''])

    }
    // if (!data || !districts) return <></>
    return <>
        <PageLayout title="Dashboard" hasBackUrl={false}>
            <Suspense>
                <div className="p-2">
                    <div className="mockup-code bg-primary text-primary-content p-3">
                        <span className="">
                            <span className="text-xl md:text-2xl lg:text-3xl">
                                Hai <span className="font-bold text-orange-500">{storageService.getName()}</span>, Selamat Datang di Aplikasi <span className="text-orange-500 font-semibold">{process.env.APP_NAME}</span> !
                            </span>
                            <p className="mt-2 max-w-6xl  text-base">
                                <span className="font-bold">Mentari Berdasi</span> Merupakan aplikasi monitoring dan evaluasi kinerja Tim Pendamping Keluarga (TPK) berbasis elektronik Kota Sukabumi.

                            </p>
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                        <Link href="/headmaster/teachers">
                            <Card>
                                <div className="flex">
                                    <Image src="/assets/images/teacher.png" width={100} height={100} alt="photo"></Image>
                                    <div className="flex flex-col justify-end items-end w-full gap-2">
                                        <h1 className="text-5xl font-semibold">{data?.data?.teacher}</h1>
                                        <h2 className="text-xl">TPK</h2>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                        <Link href="/headmaster/daily-report/subordinate">
                            <Card>
                                <div className="flex">
                                    <Image src="/assets/images/daily-report.png" width={100} height={100} alt="photo"></Image>
                                    <div className="flex flex-col justify-end items-end w-full gap-2">
                                        <h1 className="text-5xl font-semibold">{data?.data?.subordinate_daily_report}</h1>
                                        <h2 className="text-xl text-right">Laporan Harian</h2>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                        <Link href="/headmaster/recap">
                            <Card>
                                <div className="flex">
                                    <Image src="/assets/images/data.png" width={100} height={100} alt="photo"></Image>
                                    <div className="flex flex-col justify-end items-end w-full gap-2">
                                        {/* <h1 className="text-5xl font-semibold">{data?.data?.subordinate_daily_report}</h1> */}
                                        <h2 className="text-xl text-right">Rekap</h2>
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
                    <div className="w-full md:w-11/12 lg:w-11/12 mx-auto mt-5 ">
                        <h1 className="text-xl md:text-2xl lg:text-2xl font-bold">Peta Sebaran Lokasi TPK</h1>
                    </div>
                    <div className="w-full md:w-11/12 lg:w-11/12 mx-auto mt-5 shadow-xl border border-gray-500">

                        <MapWithNoSSR lan={'-6.930878'} lon={'106.924004'} coordinates={data?.data?.coordinates} />
                    </div>
                    <div className={'bg-[#fed746] p-2 rounded-2xl mt-5 ' + minHeight}>
                        <h1 className="font-bold text-xl md:text-2xl lg:text-2xl">Jumlah Laporan Per Kecamatan</h1>
                        <div className="flex flex-col md:flex-row lg:flex-row gap-0 md:gap-3 lg:gap-3 justify-end w-full mt-2">
                            <div className="flex w-full justify-end mb-2 md:mb-0 lg:mb-0">
                                <span className="btn btn-sm capitalize" onClick={() => doReset()}>
                                    Reset Filter
                                </span>
                            </div>
                            <div className="flex w-full md:w-auto lg:w-auto  justify-end gap-3  mb-2">
                                <select defaultValue={districtCode ? districtCode : ''} onChange={(event) => doFilterDistrict(event.target.value)} id="district_code" className="select  bg-base-100 select-sm w-full md:max-w-xs lg:md:max-w-xs">
                                    <option disabled value={''}>Filter Kecamatan</option>
                                    {
                                        districts?.data?.map((district, index) => {
                                            return (
                                                <option value={district.code} key={index}>{district.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                {/* <span className="btn btn-sm capitalize" onClick={() => doReset()}>
                        Reset Filter
                    </span> */}
                            </div>
                            <div className="flex w-full md:w-auto lg:w-auto  justify-end gap-3 mb-2">
                                <select defaultValue={villageCode ? villageCode : ''} onChange={(event) => doFilterVillage(event.target.value)} id="village_code" className="select  bg-base-100 select-sm w-full md:max-w-xs lg:md:max-w-xs">
                                    <option disabled value={''}>Filter Desa / Kelurahan</option>
                                    {
                                        villages?.map((village, index) => {
                                            return (
                                                <option value={village.code} key={index}>{village.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className={minHeight}>
                            {
                                data?.data?.chart ? <ReactApexChart options={options} series={series} type="bar" height={minHeight} /> : ''
                            }

                        </div>
                    </div>
                </div>
            </Suspense>

        </PageLayout>
    </>
}

export default Index