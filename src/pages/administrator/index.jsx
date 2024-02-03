import PageLayout from "@/components/PageLayout"
import Link from "next/link"
import Card from "@/components/Card"
import Image from "next/image"
import dynamic from 'next/dynamic';
import { useState } from "react";
import useSWR from 'swr';
import { storageService } from "@/services/storage.service";
const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
    ssr: false,
});

function Administrator() {
    let token = 'Bearer '  + storageService.getToken();
    const fetcher = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then((res) => res.json())
    const { data, error } = useSWR(process.env.API + '/api/administrator/dashboard/index', fetcher)
    if(data) console.log(data)
    const [lan, setLan] = useState();
    const [lon, setLon] = useState()
    const locate = () => {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            var crd = pos.coords;

            // console.log('Your current position is:');
            // console.log(`Latitude : ${crd.latitude}`);
            // console.log(`Longitude: ${crd.longitude}`);
            // console.log(`More or less ${crd.accuracy} meters.`);
            alert('Your current position is : Latitude ' + crd.latitude + ' Longitude: ' + crd.longitude + ' More or less: crd.accuracy' + ' Meters')
            setLan(crd.latitude)
            setLon(crd.longitude)
        };

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    }
    if(!data) return <></>
    return <>
        <PageLayout hasBackUrl={false}>

            <div className="p-2">
                <div className="mockup-code bg-sky-400 text-primary-content p-3">
                    <span className="">
                        <span className="text-xl md:text-2xl lg:text-3xl">
                            Hai <span className="font-bold text-orange-500">Administrator</span>, Selamat Datang di Aplikasi <span className="text-orange-500 font-semibold">SIPAUD</span> !
                        </span>
                        <p className="mt-2 max-w-6xl text-base">
                            <span className="font-bold">SIPAUD</span> (Sistem Informasi Pendidikan Anak Usia Dini) Merupakan aplikai monitoring dan evaluasi perkembangan anak berbasis digital dibawah lingkup Dinas Pendidikan Tanah Tidung.

                        </p>
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                    <Link href="/administrator/users?page=&search=&unit_id=">
                        <Card>
                            <div className="flex">
                                <Image src="/assets/images/user.png" width={100} height={100} alt="usr_icn" ></Image>
                                <div className="flex flex-col justify-end items-end w-full gap-2">
                                    <h1 className="text-5xl font-semibold">{150}</h1>
                                    <h2 className="text-xl">Pengguna</h2>
                                </div>
                            </div>
                        </Card>
                    </Link>

                    <Link href="/administrator/students">
                        <Card>
                            <div className="flex">
                                <Image src="/assets/images/students.png" width={100} height={100} alt="student_icn"></Image>
                                <div className="flex flex-col justify-end items-end w-full gap-2">
                                    <h1 className="text-5xl font-semibold">{500}</h1>
                                    <h2 className="text-xl">TPK</h2>
                                </div>
                            </div>
                        </Card>
                    </Link>

                    <Link href="/administrator/schools">
                        <Card>
                            <div className="flex">
                                <Image src="/assets/images/school.png" width={100} height={100} alt="sch_icn" ></Image>
                                <div className="flex flex-col justify-end items-end w-full gap-2">
                                    <h1 className="text-5xl font-semibold">{120}</h1>
                                    <h2 className="text-xl">E-Kinerja</h2>
                                </div>
                            </div>
                        </Card>
                    </Link>

                    {/* <Link href="/administrator/teachers">
                        <Card>
                            <div className="flex">
                                <Image src="/assets/images/teacher.png" width={100} height={100} alt="tchr_icn"></Image>
                                <div className="flex flex-col justify-end items-end w-full gap-2">
                                    <h1 className="text-5xl font-semibold">{500}</h1>
                                    <h2 className="text-xl">Guru</h2>
                                </div>
                            </div>
                        </Card>
                    </Link> */}

                    {/* <Link href="/admin/corp/dashboard">
                        <Card>
                            <div className="flex">
                                <Image src="/assets/images/kenpa.png" width={100} height={100} ></Image>
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
                                <Image src="/assets/images/kgb.png" width={100} height={100} ></Image>
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
                                <Image src="/assets/images/mapping.png" width={100} height={100} ></Image>
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
                                <Image src="/assets/images/pojok.png" width={100} height={100} ></Image>
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
                                <Image src="/assets/images/ticket.png" width={100} height={100} ></Image>
                                <div className="flex flex-col justify-end items-end w-full gap-2">
                                    <h1 className="text-5xl font-semibold">{0}</h1>
                                    <h2 className="text-xl">Ticketing</h2>
                                </div>
                            </div>
                        </Card>
                    </Link> */}
                </div>
            
                <div className="w-full mt-5 shadow-xl">
                    <MapWithNoSSR lan={lan} lon={lon} coordinates={data?.data?.coordinates} />
                </div>
            </div>
        </PageLayout>
    </>
}

export default Administrator