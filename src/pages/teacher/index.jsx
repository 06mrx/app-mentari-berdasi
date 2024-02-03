import PageLayout from "@/components/PageLayout"
import Link from "next/link"
import Card from "@/components/Card"
import Image from "next/image"
import { storageService } from "@/services/storage.service"
import useSWR from 'swr';
import dynamic from 'next/dynamic';
import { useRouter } from "next/router"
import mob0 from '../../../public/assets/images/mob_loc_0.jpeg'
import mob1 from '../../../public/assets/images/mob_loc_1.png'
import mob2 from '../../../public/assets/images/mob_loc_2.png'
import desk from '../../../public/assets/images/desk_loc.png'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
function Index() {
    const router = useRouter();
    let token = 'Bearer ' + storageService.getToken();
    const fetcher = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then((res) => res.json())
    const { data, error } = useSWR(process.env.API + '/api/teacher/dashboard/index', fetcher);

    var series = [{
        name: 'Berat Badan',
        data: [data?.data?.berat_badan_sangat_kurang, data?.data?.berat_badan_kurang, data?.data?.berat_badan_normal, data?.data?.resiko_berat_badan_lebih]
    }]
    const locate = () => {
        handlePermission();
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            var crd = pos.coords;
            // formData.latitude.current = crd.latitude
            // formData.longitude.current = crd.longitude
        };

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    }
    function handlePermission() {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
            if (result.state === "granted") {
                if(detectMob()) {
                    if(document.getElementById('alert-modal-mobile')) {
                        document.getElementById('alert-modal-mobile').checked = false;
                    }
                } else {
                    if(document.getElementById('alert-modal-desktop')) {
                        document.getElementById('alert-modal-desktop').checked = false;
                    }
                }

            } else if (result.state === "prompt") {
                // report(result.state);

                navigator.geolocation.getCurrentPosition(
                    revealPosition,
                    positionDenied,
                    geoSettings
                );
            } else if (result.state === "denied") {
                // report(result.state);
                if(detectMob()) {
                    if(document.getElementById('alert-modal-mobile')) {
                        document.getElementById('alert-modal-mobile').checked = true;
                    }
                } else {
                    if(document.getElementById('alert-modal-desktop')) {
                        document.getElementById('alert-modal-desktop').checked = true;
                    }
                }
                

            }
            result.addEventListener("change", () => {
                if(result.state === "granted") {
                    router.push('/teacher')
                    if(detectMob()) {
                        if(document.getElementById('alert-modal-mobile')) {
                            document.getElementById('alert-modal-mobile').checked = false;
                        }
                    } else {
                        if(document.getElementById('alert-modal-desktop')) {
                            document.getElementById('alert-modal-desktop').checked = false;
                        }
                    }
                }
            });
        });
    }

    if(router.isReady) {
        locate();
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
    var series4 = [{
        name: 'IMT',
        data: [data?.data?.gizi_buruk, data?.data?.gizi_kurang, data?.data?.gizi_baik, data?.data?.gizi_lebih, data?.data?.obesitas]
    }]
    var options4 = {
        chart: {
            height: 350,
            type: 'bar',
            sparkline: {
                enabled: false
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + "%";
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        colors: ['#ff00ff'],
        xaxis: {
            categories: ["Gizi Buruk", "Gizi Kurang", "Normal", "Gizi Lebih", "Obesitas"],
            position: 'top',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val + "%";
                }
            }

        },

    };
    if (!data) return <></>
    return <>
        <PageLayout title="" hasBackUrl={false}>

            <div className="p-2">
                <div className="mockup-code bg-emerald-400 text-primary-content p-3">
                    <span className="">
                        <span className="text-xl md:text-2xl lg:text-3xl">
                            Hai <span className="font-bold text-orange-500">{storageService.getName()}</span>, Selamat Datang di Aplikasi <span className="text-orange-500 font-semibold">{process.env.APP_NAME}</span> !
                        </span>
                        <p className="mt-2 max-w-6xl  text-base">
                            <span className="font-bold">{process.env.APP_NAME}</span> Merupakan aplikasi monitoring dan evaluasi kinerja Tim Pendamping Keluarga (TPK) berbasis elektronik Kota Sukabumi.

                        </p>
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                    <Link href="/teacher/daily-report">
                        <Card>
                            <div className="flex">
                                <Image src="/assets/images/daily-report.png" width={100} height={100} alt="photo"></Image>
                                <div className="flex flex-col justify-end items-end w-full gap-2">
                                    <h1 className="text-5xl font-semibold">{data.data?.daily_report}</h1>
                                    <h2 className="text-xl">E-Kinerja</h2>
                                </div>
                            </div>
                        </Card>
                    </Link>
                </div>
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                    <Card>
                        <p className="font-semibold text-xl">BB (dibawah 60 bulan)</p>
                        <ReactApexChart options={options} series={series} type="bar" height={300} />
                    </Card>
                    <Card>
                        <p className="font-semibold text-xl">Tinggi Badan (dibawah 60 bulan)</p>
                        <ReactApexChart options={options2} series={series2} type="bar" height={300} />
                    </Card>
                    <Card>
                        <p className="font-semibold text-xl">Jenis Kelamin</p>
                        <ReactApexChart options={options3} series={series3} type="bar" height={300} />
                    </Card>
                    <Card>
                        <p className="font-semibold text-xl">IMT (diatas 60 bulan)</p>
                        <ReactApexChart options={options4} series={series4} type="bar" height={300} />
                    </Card>
                </div> */}

            </div>
            <input type="checkbox" id="alert-modal-mobile" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Silahkan Aktifkan Layanan Lokasi Sebelum Melanjutkan!</h3>
                    <div className="py-4">
                        <ol>
                            <li>
                                Aktifkan Lokasi pada handphone anda <br />
                                <Image src={mob0} alt="photo">

                                </Image>
                            </li>
                            <li>
                                Klik tahan icon {process.env.APP_NAME} pada handphone anda kemudian klik <span className="font-bold">Setelan Situs</span>.<br />
                                <Image src={mob1}>

                                </Image>
                            </li>
                            <li>
                                Aktifkan layanan <span className="font-bold">lokasi</span>
                                <Image src={mob2}>

                                </Image>
                            </li>
                            <li>
                                tekan <button className="btn btn-info" onClick={()=> locate()}>REFRESH</button>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            <input type="checkbox" id="alert-modal-desktop" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-full max-w-7xl">
                    <h3 className="font-bold text-2xl">Silahkan Aktifkan Layanan Lokasi Sebelum Melanjutkan!</h3>
                    <div className="py-4">
                        <ol>
                            <li>
                                Gunakan browser <span className="font-bold">google chrome</span> 
                                <Image src={desk}>

                                </Image>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </PageLayout>
    </>
}

export default Index
