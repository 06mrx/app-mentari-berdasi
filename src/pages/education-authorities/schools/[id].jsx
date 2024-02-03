import PageLayout from "@/components/PageLayout";
import Image from "next/image";
import Radial from "@/components/ApexChart/Radial";
import Line from "@/components/ApexChart/Line";
import StackBar from "@/components/ApexChart/StackBar";
import StrokeGauge from "@/components/ApexChart/StrokeGauge";
import Card from "@/components/Card";
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
export default function Detail() {
    var series = [17, 15]
    var options = {
        series: [17, 15],
        chart: {
        type: 'donut',
      },
      labels: ["Perempuan", "Laki-laki"],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
      };
    return <>
        <PageLayout title={'Detail Sekolah'} hasBackUrl={true} isNativeBack>
            <div className="bg-base-100 shadow-lg rounded-2xl p-3 flex justify-center items-center w-full gap-3">
                <Image src={'/assets/images/school.png'} width={60} height={60} alt="photo"></Image>
                <p className="text-3xl font-semibold">Nama Sekolah Pendidikan Anak Usia Dini</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">

                <Card>
                    <div className="flex">
                        <Image src="/assets/images/cuti.png" width={100} height={100} alt="photo" ></Image>
                        <div className="flex flex-col justify-end items-end w-full gap-2">
                            <h1 className="text-5xl font-semibold">{1}</h1>
                            <h2 className="text-xl">Siswa</h2>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex">
                        <Image src="/assets/images/skp.png" width={100} height={100} alt="photo"></Image>
                        <div className="flex flex-col justify-end items-end w-full gap-2">
                            <h1 className="text-5xl font-semibold">{0}</h1>
                            <h2 className="text-xl">Guru</h2>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                    <Card>
                        <p className="font-semibold text-xl">Rata-rata Berat Badan</p>
                        <ReactApexChart options={options} series={series} type="donut" height={280} />
                    </Card>
                    <Card>
                        <p className="font-semibold text-xl">Rata-rata Tinggi Badan</p>
                        <ReactApexChart options={options} series={series} type="donut" height={280} />
                    </Card>
                    <Card>
                        <p className="font-semibold text-xl">Rata-rata Jenis Kelamin</p>
                        <ReactApexChart options={options} series={series} type="donut" height={280} />
                    </Card>
                </div>
        </PageLayout>
    </>
}