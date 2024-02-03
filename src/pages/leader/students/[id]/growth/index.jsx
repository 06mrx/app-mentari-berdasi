import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import useSWR from 'swr';
import { useRouter } from "next/router";
import { storageService } from "@/services/storage.service";
import parse from 'html-react-parser';
export default function Index() {
    let token = 'Bearer ' + storageService.getToken();
    const router = useRouter();
    let id = router.query.id
    if (router.isReady) {
        id = router.query.id
    }
    const fetcher = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then((res) => res.json())

    const { data: growthDevelopments, mutate } = useSWR(process.env.API + '/api/health-worker/growth-development/index/' + id, id ? fetcher : null);
    const getColorWeight = (status) => {
        if(status == 'Berat badan sangat kurang')
            return 'bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
        else if(status == 'Berat badan kurang')
            return 'bg-yellow-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
        else if(status == 'Berat badan normal')
            return 'bg-green-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
        else if(status == 'Resiko berat badan lebih')
            return 'bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
    }

    const getColorHeight = (status) => {
        if(status == 'Sangat pendek')
            return 'bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
        else if(status == 'Pendek')
            return 'bg-yellow-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
        else if(status == 'Normal')
            return 'bg-green-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
        else if(status == 'Tinggi')
            return 'bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5  rounded-full'
    }
    if (!growthDevelopments) return <>
        <PageLayout title={'Intervensi Pertumbuhan Peserta Didik'} hasBackUrl={true} backUrl={"/leader/students/" + id}>
            <div role="status" className="w-full max-w-screen-2xl mx-auto p-4 space-y-4  bg-base-100 border-gray-200  rounded shadow animate-pulse  md:p-6 dark:border-gray-700">
                <div className="flex w-full md:w-1/4 lg:w-1/4 justify-between font-semibold px-3 pt-3">
                    <div className="w-1/2">
                        <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="w-1/2">
                        <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div>
                    </div>
                </div>
                <div className="flex w-full md:w-1/4 lg:w-1/4 justify-between font-semibold px-3 pb-3">
                    <div className="w-1/2">
                        <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="w-1/2">
                        <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-48"></div>
                    </div>
                </div>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-8"></div>
                                </label>
                            </th>
                            <th><div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div></th>
                            <th><div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div></th>
                            <th><div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover" >
                            <th>
                                <label>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-8"></div>
                                </label>
                            </th>
                            <td>
                                <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-56"></div>
                            </td>
                            <td>
                                <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-56"></div>
                            </td>
                            <td className="whitespace-normal">
                                <div className="flex gap-4">
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-96"></div>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-96"></div>
                                </div>
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr className="hover" >
                            <th>
                                <label>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-8"></div>
                                </label>
                            </th>
                            <td>
                                <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-56"></div>
                            </td>
                            <td>
                                <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-56"></div>
                            </td>
                            <td className="whitespace-normal">
                                <div className="flex gap-4">
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-96"></div>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-96"></div>
                                </div>
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr className="hover" >
                            <th>
                                <label>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-8"></div>
                                </label>
                            </th>
                            <td>
                                <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-56"></div>
                            </td>
                            <td>
                                <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-56"></div>
                            </td>
                            <td className="whitespace-normal">
                                <div className="flex gap-4">
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-96"></div>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-96"></div>
                                </div>
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr className="hover" >
                            <th>
                                <label>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-8"></div>
                                </label>
                            </th>
                            <td>
                                <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-56"></div>
                            </td>
                            <td>
                                <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-56"></div>
                            </td>
                            <td className="whitespace-normal">
                                <div className="flex gap-4">
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-96"></div>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-96"></div>
                                </div>
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr className="hover" >
                            <th>
                                <label>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-8"></div>
                                </label>
                            </th>
                            <td>
                                <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-56"></div>
                            </td>
                            <td>
                                <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-56"></div>
                            </td>
                            <td className="whitespace-normal">
                                <div className="flex gap-4">
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-96"></div>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-96"></div>
                                </div>
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr className="hover" >
                            <th>
                                <label>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-8"></div>
                                </label>
                            </th>
                            <td>
                                <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-56"></div>
                            </td>
                            <td>
                                <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-56"></div>
                            </td>
                            <td className="whitespace-normal">
                                <div className="flex gap-4">
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-96"></div>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-96"></div>
                                </div>
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr className="hover" >
                            <th>
                                <label>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-8"></div>
                                </label>
                            </th>
                            <td>
                                <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-56"></div>
                            </td>
                            <td>
                                <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-56"></div>
                            </td>
                            <td className="whitespace-normal">
                                <div className="flex gap-4">
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-96"></div>
                                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-96"></div>
                                </div>
                            </td>
                            <td>

                            </td>
                        </tr>
                    </tbody>


                </table>
            </div>
        </PageLayout>
    </>
    return <>
        <PageLayout title={'Pertumbuhan Siswa'} hasBackUrl={true} backUrl={'/leader/students/' + id}>
            <div className="overflow-x-auto w-full shadow-2xl rounded-xl mt-3 max-w-screen-2xl mx-auto bg-base-100">
                <div className="flex w-full md:w-1/4 lg:w-1/4 justify-between font-semibold px-3 pt-3">
                    <div className="w-1/2">
                        Nama
                    </div>
                    <div className="w-1/2">
                        {growthDevelopments?.data[0]?.name}
                    </div>
                </div>
                <div className="flex w-full md:w-1/4 lg:w-1/4 justify-between font-semibold px-3 pb-3">
                    <div className="w-1/2">
                        NIK
                    </div>
                    <div className="w-1/2">
                        {growthDevelopments?.data[0]?.id_number}
                    </div>
                </div>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    #
                                </label>
                            </th>
                            <th>Tanggal Lahir</th>
                            <th>Tanggal Pengambilan Data</th>
                            <th>Berat</th>
                            <th>Tinggi</th>
                            <th>Catatan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            growthDevelopments.data?.map((growthDevelopment, index) => {
                                return (
                                    <tr className="hover" key={index}>
                                        <th>
                                            <label>
                                                {index + 1}
                                            </label>
                                        </th>
                                        <td>
                                            <div>
                                                {growthDevelopment.birth_date}
                                            </div>
                                            <div className="text-sm font-semibold">
                                                Umur {growthDevelopment.age} Bulan
                                            </div>
                                        </td>
                                        <td>
                                            {growthDevelopment.date}
                                        </td>
                                        <td>
                                            <div>
                                                {growthDevelopment.weight} kg
                                            </div>
                                            <span className={getColorWeight(growthDevelopment.status_weight)}>
                                                {growthDevelopment.status_weight}
                                            </span>
                                        </td>
                                        <td>
                                            <div>
                                                {growthDevelopment.height} cm
                                            </div>
                                            <span className={getColorHeight(growthDevelopment.status_height)}>
                                                {growthDevelopment.status_height}
                                            </span>

                                        </td>
                                        <td className="whitespace-normal">
                                            {
                                                parse(growthDevelopment.note ? growthDevelopment.note : '')
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>


                </table>
            </div>
        </PageLayout>
    </>
}