import PageLayout from "@/components/PageLayout";
import Link from "next/link";
export default function Index() {
    return <>
        <PageLayout title={'Intervensi Pertumbuhan Peserta Didik'} hasBackUrl={true} backUrl="/education-authorities/students/1">
            <div className="overflow-x-auto w-full shadow-2xl rounded-xl mt-3 max-w-screen-2xl mx-auto bg-base-100">
                <div className="flex w-full md:w-1/4 lg:w-1/4 justify-between font-semibold px-3 pt-3">
                    <div className="w-1/2">
                        Nama
                    </div>
                    <div className="w-1/2">
                        Nama
                    </div>
                </div>
                <div className="flex w-full md:w-1/4 lg:w-1/4 justify-between font-semibold px-3 pb-3">
                    <div className="w-1/2">
                        NIK
                    </div>
                    <div className="w-1/2">
                        123456789
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
                        <tr className="hover">
                            <th>
                                <label>
                                    1
                                </label>
                            </th>
                            <td>
                                Bima Satria Yudha Mohammad
                            </td>
                            <td>
                                6 November 2023
                            </td>
                            <td className="whitespace-normal">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto aliquid mollitia tempora asperiores corrupti numquam debitis, necessitatibus sequi, quasi doloribus culpa odio molestias sed voluptas! Reprehenderit, numquam? Quis, similique nemo?
                                <ol class="list-decimal ml-10">
                                    <li> <span className="font-bold">Hari 1 </span> Now this is a story all about how, my life got flipped-turned upside down</li>
                                    <li> <span className="font-bold">Hari 2 </span> Now this is a story all about how, my life got flipped-turned upside down</li>
                                    <li> <span className="font-bold">Hari 3 </span> Now this is a story all about how, my life got flipped-turned upside down</li>
                                </ol>
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr className="hover">
                            <th>
                                <label>
                                    2
                                </label>
                            </th>
                            <td>
                                Bima Satria Yudha Mohammad
                            </td>
                            <td>
                                6 Desember 2023
                            </td>
                            <td className="whitespace-normal">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto aliquid mollitia tempora asperiores corrupti numquam debitis, necessitatibus sequi, quasi doloribus culpa odio molestias sed voluptas! Reprehenderit, numquam? Quis, similique nemo?
                                <ol class="list-decimal ml-10">
                                    <li> <span className="font-bold">Hari 1 </span> Now this is a story all about how, my life got flipped-turned upside down</li>
                                    <li> <span className="font-bold">Hari 2 </span> Now this is a story all about how, my life got flipped-turned upside down</li>
                                    <li> <span className="font-bold">Hari 3 </span> Now this is a story all about how, my life got flipped-turned upside down</li>
                                </ol>
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr className="hover">
                            <th>
                                <label>
                                    3
                                </label>
                            </th>
                            <td>
                                Bima Satria Yudha Mohammad
                            </td>
                            <td>
                                6 Janauri 2024
                            </td>
                            <td className="whitespace-normal">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto aliquid mollitia tempora asperiores corrupti numquam debitis, necessitatibus sequi, quasi doloribus culpa odio molestias sed voluptas! Reprehenderit, numquam? Quis, similique nemo?
                                <ol class="list-decimal ml-10">
                                    <li> <span className="font-bold">Hari 1 </span> Now this is a story all about how, my life got flipped-turned upside down</li>
                                    <li> <span className="font-bold">Hari 2 </span> Now this is a story all about how, my life got flipped-turned upside down</li>
                                    <li> <span className="font-bold">Hari 3 </span> Now this is a story all about how, my life got flipped-turned upside down</li>
                                </ol>
                            </td>
                            <td>

                            </td>
                        </tr>
                    </tbody>


                </table>
            </div>
        </PageLayout>
    </>
}