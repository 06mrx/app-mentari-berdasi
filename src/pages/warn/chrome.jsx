import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { storageService } from "@/services/storage.service"
import { useRouter } from "next/router"
export default function Index() {
    const router = useRouter();
    const handleClick = () => {
        storageService.add('secret', 'true');
        router.push('/')
    }
    return <>
        <Head>
            <title>Error - MENTARI BERDASI</title>
        </Head>
        <main>
            <div className="bg-base-200 w-screen h-screen flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <Image src={'/favicon/apple-icon-180x180.png'} className=" -mt-20 z-20" height={100} width={100} alt='logo'></Image>
                    <h1 className="text-3xl font-bold">MENTARI BERDASI</h1>
                    <p>
                        Maaf, Anda harus menggunakan browser Google Chrome
                    </p>

                    <Link href={'https://www.google.co.id/chrome/'}>
                        <button className="btn btn-info mt-7">
                            Download Chrome
                        </button>
                    </Link>
                    {/* <button onClick={() => handleClick()} className=" mt-7 fixed bottom-20 w-full bg-base-200 cursor-default">
                        &nbsp;
                    </button> */}
                </div>

            </div>
        </main>
    </>
}