import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
function Detail() {
    const router = useRouter();
    let id = '';
    const [ticket, setTicket] = useState();

    const fetchData = (ticket_id) => {
        fetch('https://api_sidik.test/api/ticketing/show/' + ticket_id, {
            method: 'GET'
        }).then((res) => res.json())
            .then((data) => {
                setTicket(data.data);
            })
    }
    useEffect(() => {
        if (router.isReady) {
            id = router.query.id
            //fetchData(id);
        }
    }, [router.isReady])
    return <>
        <PageLayout title={'Detail Advokasi'} backUrl="/teacher/advocation">
            <div className="bg-base-100 max-w-3xl mx-auto rounded-xl shadow-xl p-3">
                <table className="table w-full text-center table-compact">
                    <tbody>
                        <tr>
                            <th>Judul Tiket</th>
                            <td>Ini Judul Pertanyaan Saya</td>
                        </tr>
                        <tr>
                            <th>Jenis Pengaduan</th>
                            <td>Ini Jenis Pengaduannya</td>
                        </tr>
                        <tr>
                            <th>Oleh</th>
                            <td>Ini Nama Saya</td>
                        </tr>
                        <tr>
                            <th>NIK</th>
                            <td>90830128312039218</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col items-center  p-3 h-[600px] text-gray-800">
                <div className="flex flex-col flex-grow w-full max-w-3xl bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                    <div className="flex w-full mt-2 space-x-3 max-w-md">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                        </div>
                        <div>
                            <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dignissim libero sed tempor iaculis. In vitae nulla at eros rutrum gravida. Praesent eu enim aliquet, tempus ipsum ut, pellentesque nisl. Maecenas id lectus viverra, elementum dui ut, mattis ante. Aliquam vel luctus est. Phasellus fermentum elementum eros, eu venenatis orci facilisis ac. Fusce et diam et dolor sodales posuere. Nullam faucibus magna purus, eget bibendum mi fringilla nec. Curabitur venenatis, nibh in cursus tempus, ex ante hendrerit lorem, id efficitur elit urna ac turpis. Nunc ultricies sem vitae massa vulputate fringilla.

</p>
                                <div className="bg-sky-400 p-1 rounded-md mt-1">
                                    <Link href={'#'}>
                                        <div className="flex mt-2 gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8" viewBox="0 0 24 24"><path fill="#000000" d="M11.5 22q-2.3 0-3.9-1.6T6 16.5V6q0-1.65 1.175-2.825Q8.35 2 10 2q1.65 0 2.825 1.175Q14 4.35 14 6v9.5q0 1.05-.725 1.775Q12.55 18 11.5 18q-1.05 0-1.775-.725Q9 16.55 9 15.5V6h1.5v9.5q0 .425.288.712q.287.288.712.288t.713-.288q.287-.287.287-.712V6q0-1.05-.725-1.775Q11.05 3.5 10 3.5q-1.05 0-1.775.725Q7.5 4.95 7.5 6v10.5q0 1.65 1.175 2.825Q9.85 20.5 11.5 20.5q1.65 0 2.825-1.175Q15.5 18.15 15.5 16.5V6H17v10.5q0 2.3-1.6 3.9T11.5 22Z"></path></svg>
                                            <span className="text-xs">
                                                file
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">02-03-2023 Oleh <span className="font-semibold">Nama Saya</span> </span>
                        </div>
                    </div>
                    <div className="flex w-full mt-2 space-x-3 max-w-md ml-auto justify-end">
                        <div>
                            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p className="text-sm">Aliquam lacinia et dui non pulvinar. Maecenas imperdiet sapien metus, a maximus metus tempus eget. Vivamus tortor erat, tempor id laoreet id, facilisis non quam. Nam condimentum hendrerit libero, ac pharetra nibh eleifend at. Integer tristique venenatis elit sit amet sollicitudin. Donec varius, risus eu consectetur bibendum, orci nisi ullamcorper quam, sit amet pellentesque sem massa at ante. Vestibulum et blandit odio. Integer maximus a eros luctus blandit. Mauris porta sed dui sit amet ullamcorper. Vestibulum venenatis feugiat ligula vel euismod. Pellentesque vitae rutrum eros, sit amet dapibus mauris. Vivamus vitae sagittis urna. Suspendisse scelerisque metus sit amet ullamcorper mollis. In eget orci dolor.</p>
                                <div className="bg-sky-400 p-1 rounded-md mt-1">
                                    <Link href={'#'}>
                                        <div className="flex mt-2 gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8" viewBox="0 0 24 24"><path fill="#000000" d="M11.5 22q-2.3 0-3.9-1.6T6 16.5V6q0-1.65 1.175-2.825Q8.35 2 10 2q1.65 0 2.825 1.175Q14 4.35 14 6v9.5q0 1.05-.725 1.775Q12.55 18 11.5 18q-1.05 0-1.775-.725Q9 16.55 9 15.5V6h1.5v9.5q0 .425.288.712q.287.288.712.288t.713-.288q.287-.287.287-.712V6q0-1.05-.725-1.775Q11.05 3.5 10 3.5q-1.05 0-1.775.725Q7.5 4.95 7.5 6v10.5q0 1.65 1.175 2.825Q9.85 20.5 11.5 20.5q1.65 0 2.825-1.175Q15.5 18.15 15.5 16.5V6H17v10.5q0 2.3-1.6 3.9T11.5 22Z"></path></svg>
                                            <span className="text-xs">
                                                file
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <span className="text-xs text-gray-500 leading-none">02-03-2023 Oleh <span className="font-semibold">Admin</span> </span>
                        </div>
                        <div
                            className="flex items-center justify-center h-10 w-10 rounded-full bg-sky-500 flex-shrink-0"
                        >
                            B
                        </div>
                    </div>
                    </div>

                    <div className="bg-gray-300 p-4">
                        <input className="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Tuliskan Pesan..." />
                        <div className="flex mt-2 gap-3 justify-between">
                            <div className="flex flex-col">
                                <input type="file" className=" display" />
                                <label htmlFor="" className="text-error">Sertakan File Jika Dibutuhkan</label>
                            </div>

                            <span className="btn btn-info"> Kirim &nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24"><g fill="none" strokeWidth="1.5"><g stroke="#000000" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#iconoirSendDiagonal0)"><path d="M22.152 3.553L11.178 21.004l-1.67-8.596L2 7.898l20.152-4.345ZM9.456 12.444l12.696-8.89"></path></g><defs><clipPath id="iconoirSendDiagonal0"><path fill="#fff" d="M0 0h24v24H0z"></path></clipPath></defs></g></svg>
                            </span>
                        </div>


                    </div>
                </div>
            </div>

        </PageLayout>
    </>
}

export default Detail
