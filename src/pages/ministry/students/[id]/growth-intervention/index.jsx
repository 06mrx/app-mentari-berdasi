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

    const { data: healthActions, mutate } = useSWR(process.env.API + '/api/health-worker/student-health-action/index/' + id, id ? fetcher : null);

    if (!healthActions) return <>
        <PageLayout title={'Intervensi Pertumbuhan Peserta Didik'} hasBackUrl={true} backUrl={"/ministry/students/" + id}>
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
        <PageLayout title={'Intervensi Pertumbuhan Peserta Didik'} hasBackUrl={true} backUrl={"/ministry/students/" + id}>
            <div className="overflow-x-auto w-full shadow-2xl rounded-xl mt-3 max-w-screen-2xl mx-auto bg-base-100">
                <div className="flex w-full md:w-1/4 lg:w-1/4 justify-between font-semibold px-3 pt-3">
                    <div className="w-1/2">
                        Nama
                    </div>
                    <div className="w-1/2">
                        {healthActions?.data?.data[0]?.student_personal_data?.name}
                    </div>
                </div>
                <div className="flex w-full md:w-1/4 lg:w-1/4 justify-between font-semibold px-3 pb-3">
                    <div className="w-1/2">
                        NIK
                    </div>
                    <div className="w-1/2">
                        {healthActions?.data?.data[0]?.student_personal_data?.id_number}
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
                            <th>Nama Nakes</th>
                            <th>Tanggal</th>
                            <th>Catatan Intervensi</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            healthActions?.data?.data?.map((healthAction, index) => {
                                return (
                                    <tr className="hover" key={index}>
                                        <th>
                                            <label>
                                                {(healthActions?.data?.current_page * healthActions?.data?.per_page) - (healthActions?.data?.per_page - index) + 1}
                                            </label>
                                        </th>
                                        <td>
                                            {healthAction.user?.personal_data?.name}
                                        </td>
                                        <td>
                                            {healthAction.created_at}
                                        </td>
                                        <td className="whitespace-normal">
                                            {parse(healthAction.note)}
                                        </td>
                                        <td>

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