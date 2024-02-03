import PageLayout from "@/components/PageLayout";
import { useRef } from "react";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
export default function Index() {
    const id_number = useRef()
    const router = useRouter();
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(process.env.API + '/api/parent/student-personal-data/show/' + id_number.current?.value, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then((res)=>res.json()).then((data) => {
            if(!data.data) {
                toast.error('Data tidak ditemukan', {
                    position: 'bottom-center'
                })
            } else {
                router.push('/parent/' + id_number.current?.value)
            }
        })
    }
    return <>
    <ToastContainer/>
        <div className="h-screen w-screen backdrop-blur-sm flex flex-col items-center justify-center " style={{ backgroundImage: "url('/assets/images/bg-parent.jpg')", }}>

            <div className="h-screen w-screen bg-black opacity-10 backdrop-blur-lg fixed z-10">

            </div>
            <Image src={'/favicon/apple-icon-180x180.png'} className=" -mt-20 z-20" height={100} width={100} alt='logo'></Image>
            <h1 className="text-7xl font-bold z-20">MENTARI BERDASI</h1>
            <p className="z-20 font-semibold">Sistem Informasi Pendidikan Anak Usia Dini</p>

            <div class='max-w-lg w-full mx-auto  px-5 mt-5 z-20'>
                <form onSubmit={handleSubmit} className="z-20">
                    <div class="relative flex items-center w-full h-12 rounded-lg shadow-2xl bg-white overflow-hidden">
                        <div class="grid place-items-center h-full w-12 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <input
                            required
                            ref={id_number}
                            class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="text"
                            id="search"
                            placeholder="Cari NIK Peserta Didik.." />

                    </div>
                    <div className="flex w-full justify-center">
                        <button className="btn mt-5 btn-info z-20">
                            Cari
                        </button>
                    </div>
                </form>
            </div>


        </div>
    </>
}
