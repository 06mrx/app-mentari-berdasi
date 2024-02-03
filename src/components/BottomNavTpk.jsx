import { useRouter } from "next/router"
import Link from "next/link";
export default function BottomNavTPK() {
    const router = useRouter();
    return <>
        <div className='mt-12'>

        </div>
        {/* ee4128 */}
        <div className="btm-nav md:hidden lg:hidden z-50">
            <button className={`${router.pathname === '/teacher' ? 'text-[#ee4128] border-[#ee4128]' : 'text-black border-gray-300'} bg-base-100  font-bold border border-t-2 border-r-0 border-b-0  rounded-l-2xl`}>
                <Link href={'/teacher'} className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    <span className="text-sm">HOME</span>
                </Link>
            </button>
            <button className={`${router.pathname === '/teacher/daily-report' ? 'text-[#ee4128] border-[#ee4128]' : 'text-black border-gray-300'} bg-base-100  font-bold border border-t-2 border-l-0 border-b-0  rounded-r-2xl`}>
                <Link href={'/teacher/daily-report'} className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 mt-1 h-6" viewBox="0 0 48 48"><mask id="ipSTableReport0"><g fill="none" strokeLinejoin="round" strokeWidth="4"><path fill="#fff" stroke="#fff" d="M5 7a3 3 0 0 1 3-3h24a3 3 0 0 1 3 3v37H8a3 3 0 0 1-3-3V7Z"></path><path stroke="#fff" d="M35 24a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v17a3 3 0 0 1-3 3h-5V24Z"></path><path stroke="#000" strokeLinecap="round" d="M11 12h8m-8 7h12"></path></g></mask><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSTableReport0)"></path></svg>
                    <span className="text-sm">LAP. HARIAN</span>
                </Link>
            </button>
        </div>
    </>
}