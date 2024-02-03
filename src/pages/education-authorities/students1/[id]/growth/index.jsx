import PageLayout from "@/components/PageLayout";
import Link from "next/link";
export default function Index() {
    return <>
        <PageLayout title={'Pertumbuhan Siswa'} hasBackUrl={true} backUrl="/education-authorities/students/1">
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
                            <th>Tanggal</th>
                            <th>Berat</th>
                            <th>Tinggi</th>
                            <th>Catatan</th>
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
                                2 November 2023
                            </td>
                            <td>
                                10 kg
                            </td>
                            <td>
                                <div>90 cm</div>

                            </td>
                            <td className="whitespace-normal">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto aliquid mollitia tempora asperiores corrupti numquam debitis, necessitatibus sequi, quasi doloribus culpa odio molestias sed voluptas! Reprehenderit, numquam? Quis, similique nemo?
                            </td>
                        </tr>
                        <tr className="hover">
                            <th>
                                <label>
                                    1
                                </label>
                            </th>
                            <td>
                                2 November 2023
                            </td>
                            <td>
                                10 kg
                            </td>
                            <td>
                                <div>90 cm</div>

                            </td>
                            <td className="whitespace-normal">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto aliquid mollitia tempora asperiores corrupti numquam debitis, necessitatibus sequi, quasi doloribus culpa odio molestias sed voluptas! Reprehenderit, numquam? Quis, similique nemo?
                            </td>
                        </tr>
                        <tr className="hover">
                            <th>
                                <label>
                                    1
                                </label>
                            </th>
                            <td>
                                2 November 2023
                            </td>
                            <td>
                                10 kg
                            </td>
                            <td>
                                <div>90 cm</div>

                            </td>
                            <td className="whitespace-normal">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto aliquid mollitia tempora asperiores corrupti numquam debitis, necessitatibus sequi, quasi doloribus culpa odio molestias sed voluptas! Reprehenderit, numquam? Quis, similique nemo?
                            </td>
                        </tr>
                        <tr className="hover">
                            <th>
                                <label>
                                    1
                                </label>
                            </th>
                            <td>
                                2 November 2023
                            </td>
                            <td>
                                10 kg
                            </td>
                            <td>
                                <div>90 cm</div>

                            </td>
                            <td className="whitespace-normal">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto aliquid mollitia tempora asperiores corrupti numquam debitis, necessitatibus sequi, quasi doloribus culpa odio molestias sed voluptas! Reprehenderit, numquam? Quis, similique nemo?
                            </td>
                        </tr>
                        <tr className="hover">
                            <th>
                                <label>
                                    1
                                </label>
                            </th>
                            <td>
                                2 November 2023
                            </td>
                            <td>
                                10 kg
                            </td>
                            <td>
                                <div>90 cm</div>

                            </td>
                            <td className="whitespace-normal">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto aliquid mollitia tempora asperiores corrupti numquam debitis, necessitatibus sequi, quasi doloribus culpa odio molestias sed voluptas! Reprehenderit, numquam? Quis, similique nemo?
                            </td>
                        </tr>
                    </tbody>


                </table>
            </div>
        </PageLayout>
    </>
}