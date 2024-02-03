import { useRouter } from "next/router"
import Link from "next/link";
export default function BottomNavHeadmaster() {
    const router = useRouter();
    return <>
        <div className='mt-12'>

        </div>
        {/* ee4128 */}
        <div className="btm-nav md:hidden lg:hidden z-50">
            <button className={`${router.pathname === '/headmaster' ? 'text-[#ee4128] border-[#ee4128]' : 'text-black border-gray-300'} bg-base-100  font-bold border border-t-2 border-r-0 border-b-0  rounded-l-2xl`}>
                <Link href={'/headmaster'} className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    <span className="text-sm">HOME</span>
                </Link>
            </button>
            <button className={`${router.pathname === '/headmaster/teachers' ? 'text-[#ee4128] border-[#ee4128]' : 'text-black border-gray-300'} bg-base-100  font-bold border border-t-2 border-r-0 border-l-0 border-b-0 `}>
                <Link href={'/headmaster/teachers'} className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 48 48"><path fill="currentColor" d="M18.412 9.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0Zm1.082 5.541a1.505 1.505 0 0 0-.347-.04H13.31a.78.78 0 0 0-.026 0h-2.609c-.117 0-.232.014-.346.041c-1.128.269-1.911.922-2.416 1.86c-.44.818-.654 1.835-.831 2.839l-1.059 6a1.5 1.5 0 0 0 2.954.521l1.06-6c.123-.703.234-1.19.35-1.538l.29 3.276c0 1.866-1.786 10.372-2.424 13.351a.99.99 0 0 0 .83 1.19c4.398.623 7.26.603 11.658-.004a.99.99 0 0 0 .835-1.186c-.633-3.026-2.429-11.747-2.429-13.35l.29-3.277c.115.347.226.835.35 1.537l1.06 6a1.5 1.5 0 0 0 2.953-.521l-1.058-6c-.177-1.003-.392-2.021-.832-2.84c-.504-.936-1.287-1.59-2.416-1.859Zm-8.221 26.09l-.398-3.013c1.08.125 2.11.206 3.123.244l-.766 2.894a1 1 0 0 1-1.959-.125Zm5.319.125l-.76-2.871a38.913 38.913 0 0 0 3.104-.168l-.386 2.914a1 1 0 0 1-1.958.125Zm16.82-34.17l7.207 7.207l-1.414 1.414l-1.293-1.293V20h-3v-2.5a1.5 1.5 0 0 0-3 0V20h-3v-5.586l-1.293 1.293l-1.414-1.414l7.207-7.207Zm0 17.5l9.207 9.207l-1.414 1.414l-1.909-1.908v7.74h-3.923v-3.27a1.962 1.962 0 0 0-3.923 0v3.27h-3.923v-7.74l-1.908 1.908l-1.414-1.414l9.207-9.207Z"></path></svg>
                    <span className="text-sm ">TPK</span>
                </Link>
            </button>
            <button className={`${router.pathname === '/headmaster/daily-report/subordinate' ? 'text-[#ee4128] border-[#ee4128]' : 'text-black border-gray-300'} bg-base-100  font-bold border border-t-2 border-r-0 border-l-0 border-b-0`}>
                <Link href={'/headmaster/daily-report/subordinate'} className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 mt-1 h-6" viewBox="0 0 48 48"><mask id="ipSTableReport0"><g fill="none" strokeLinejoin="round" strokeWidth="4"><path fill="#fff" stroke="#fff" d="M5 7a3 3 0 0 1 3-3h24a3 3 0 0 1 3 3v37H8a3 3 0 0 1-3-3V7Z"></path><path stroke="#fff" d="M35 24a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v17a3 3 0 0 1-3 3h-5V24Z"></path><path stroke="#000" strokeLinecap="round" d="M11 12h8m-8 7h12"></path></g></mask><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSTableReport0)"></path></svg>
                    <span className="text-sm">LAP. HARIAN</span>
                </Link>
            </button>
            <button className={`${router.pathname === '/headmaster/recap' ? 'text-[#ee4128] border-[#ee4128]' : 'text-black border-gray-300'} bg-base-100  font-bold border border-t-2 border-l-0 border-b-0  rounded-r-2xl`}>
                <Link href={'/headmaster/recap'} className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg"className="h-7 w-7" viewBox="0 0 32 32"><path fill="currentColor" d="M7.667 27.503L2 22.448l1.331-1.492l5.641 5.031l7.69-7.445a1.928 1.928 0 0 1 2.674-.008l3.624 3.464l5.58-5.973L30 17.39l-5.581 5.975a1.996 1.996 0 0 1-2.838.08l-3.577-3.419l-7.666 7.42a1.963 1.963 0 0 1-2.671.056zM30 11h-4l2-3l2 3zm-8-7h-4v2h4v2h-3v2h3v2h-4v2h4a2.003 2.003 0 0 0 2-2V6a2.002 2.002 0 0 0-2-2zm-6 10h-6v-4a2.002 2.002 0 0 1 2-2h2V6h-4V4h4a2.002 2.002 0 0 1 2 2v2a2.002 2.002 0 0 1-2 2h-2v2h4zM6 12V4H4v1H2v2h2v5H2v2h6v-2H6z"></path></svg>
                    <span className="text-sm">REKAP TPK</span>
                </Link>
            </button>
        </div>
    </>
}