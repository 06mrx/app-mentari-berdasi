import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
function SidebarCorp() {
  const [open, setOpen] = useState(true)
  const [state, setState] = useState({
    pranalaCorp: true,
    pranalaPartner: true
  })

  const handleClick = (name, status) => {

    setState({
      ...state, [name]: status
    });
    console.log(name);
  }
  const router = useRouter();
  return (
    <div className={`${open ? "w-52" : "w-16"} h-screen trantition duration-200 bg-base-100 fixed left-0 lg:relative md:relative z-50  md:flex lg:flex`}>

      <svg  viewBox="0 0 24 24" className={`absolute bg-base-200 z-50 cursor-pointer w-8 h-8 -right-4 top-3 rounded-lg ${!open ? "rotate-180 -right-6" : ""}`} onClick={() => setOpen(!open)}><path fill="currentColor" d="M17.59 18L19 16.59L14.42 12L19 7.41L17.59 6l-6 6z"></path><path fill="currentColor" d="m11 18l1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z"></path></svg>
      <div className=' h-screen overflow-y-auto overflow-x-hidden'>
        <div className='flex gap-x-4 items-center p-4  rounded'>
          <img src={`${!open ? "/favicon/apple-icon-114x114.png" : "/favicon/apple-icon-114x114.png"}`} alt="" className={`${!open ? "w-8 h-8" : " h-16"}`} />
        </div>
        <ul className={`${!open ? 'w-16' : 'w-52'} menu py-2 px-1 trantition duration-200`}>
          <label className=' text-gray-500 my-2 ml-5'>{!open ? '' : 'Menu Utama'}</label>
          <li className={`${router.pathname == '/administrator' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} ${!open ? 'w-12' : 'w-auto'} mb-1`}>
            <Link href="/administrator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" stroke={`${router.pathname == '/administrator' ? "#fff" : "#000"}`} fill='none' viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span className={`${!open && "hidden"} origin-left trantition duration-200`}>Dashboard</span>
            </Link>
          </li>

          <li className={`${router.pathname == '/administrator/users' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} ${!open ? 'w-12' : 'w-auto'} mb-1`}>
            <Link href="/administrator/users">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><g fill="none" stroke={`${router.pathname == '/administrator/users' ? "#fff" : "#000"}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87m-3-12a4 4 0 0 1 0 7.75"></path></g></svg>
              <span className={`${!open && "hidden"} origin-left trantition duration-200`}>User</span>
            </Link>
          </li>
          <li className={`${router.pathname == '/administrator/teachers' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} ${!open ? 'w-12' : 'w-auto'} mb-1`}>
            <Link href="/administrator/teachers">
            <svg xmlns="http://www.w3.org/2000/svg"className="h-5 w-5" viewBox="0 0 256 256"><path fill={`${router.pathname == '/administrator/teachers' ? "#fff" : "#000"}`} d="M216 42H40a14 14 0 0 0-14 14v144a14 14 0 0 0 14 14h13.4a6 6 0 0 0 5.4-3.4a50 50 0 0 1 90.4 0a6 6 0 0 0 5.4 3.4H216a14 14 0 0 0 14-14V56a14 14 0 0 0-14-14ZM78 144a26 26 0 1 1 26 26a26.1 26.1 0 0 1-26-26Zm140 56a2 2 0 0 1-2 2h-57.7a62.3 62.3 0 0 0-31.5-27.6a38 38 0 1 0-45.6 0A62.3 62.3 0 0 0 49.7 202H40a2.1 2.1 0 0 1-2-2V56a2 2 0 0 1 2-2h176a2 2 0 0 1 2 2ZM198 80v96a6 6 0 0 1-6 6h-16a6 6 0 0 1 0-12h10V86H70v10a6 6 0 0 1-12 0V80a6 6 0 0 1 6-6h128a6 6 0 0 1 6 6Z"></path></svg>
              <span className={`${!open && "hidden"} origin-left trantition duration-200`}>TPK</span>
            </Link>
          </li>
          <label className=' text-gray-500 my-2 ml-5'>{!open ? '' : 'Referensi'}</label>
          {/* <li className={`${router.pathname == '/administrator/reference/work-unit' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} ${!open ? 'w-12' : 'w-auto'} mb-1`}>
            <Link href="/administrator/reference/work-unit">
            <svg xmlns="http://www.w3.org/2000/svg"className="h-5 w-5" viewBox="0 0 32 32"><path fill={`${router.pathname == '/administrator/reference/work-unit' ? "#fff" : "#000"}`} d="M16 28h7v2h-7zm0-4h14v2H16zm0-4h14v2H16zM4 20v2h4.586L2 28.586L3.414 30L10 23.414V28h2v-8H4zM28 8H16l-3.414-3.414A2 2 0 0 0 11.172 4H4a2 2 0 0 0-2 2v12h2V6h7.172l3.414 3.414l.586.586H28v8h2v-8a2 2 0 0 0-2-2z"></path></svg>
              <span className={`${!open && "hidden"} origin-left trantition duration-200`}>Unit Kerja</span>
            </Link>
          </li> */}
          <li className={`${router.pathname == '/administrator/reference/activity' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} ${!open ? 'w-12' : 'w-auto'} mb-1`}>
            <Link href="/administrator/reference/activity">
            <svg xmlns="http://www.w3.org/2000/svg"className="h-5 w-5" viewBox="0 0 32 32"><path fill={`${router.pathname == '/administrator/reference/activity' ? "#fff" : "#000"}`} d="M16 28h7v2h-7zm0-4h14v2H16zm0-4h14v2H16zM4 20v2h4.586L2 28.586L3.414 30L10 23.414V28h2v-8H4zM28 8H16l-3.414-3.414A2 2 0 0 0 11.172 4H4a2 2 0 0 0-2 2v12h2V6h7.172l3.414 3.414l.586.586H28v8h2v-8a2 2 0 0 0-2-2z"></path></svg>
              <span className={`${!open && "hidden"} origin-left trantition duration-200`}>Aktivitas</span>
            </Link>
          </li>
          <li className={`${router.pathname == '/administrator/reference/output-unit' ? "bg-primary text-white rounded-lg trantition duration-200" : ""} ${!open ? 'w-12' : 'w-auto'} mb-1`}>
            <Link href="/administrator/reference/output-unit">
            <svg xmlns="http://www.w3.org/2000/svg"className="h-5 w-5" viewBox="0 0 32 32"><path fill={`${router.pathname == '/administrator/reference/output-unit' ? "#fff" : "#000"}`} d="M16 28h7v2h-7zm0-4h14v2H16zm0-4h14v2H16zM4 20v2h4.586L2 28.586L3.414 30L10 23.414V28h2v-8H4zM28 8H16l-3.414-3.414A2 2 0 0 0 11.172 4H4a2 2 0 0 0-2 2v12h2V6h7.172l3.414 3.414l.586.586H28v8h2v-8a2 2 0 0 0-2-2z"></path></svg>
              <span className={`${!open && "hidden"} origin-left trantition duration-200`}>Target Luaran</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SidebarCorp