import PageLayout from "@/components/PageLayout";
import Image from "next/image";
import Link from "next/link";
import useSWR from 'swr';
import { useRouter } from "next/router";
import { storageService } from "@/services/storage.service";
export default function Detail() {
    let token = 'Bearer ' + storageService.getToken();
    let router = useRouter();
    const fetcher = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization' : token
        }
    }).then((res) => res.json())
    let id = router.query.id
    if(router.isReady) {
        id = router.query.id
    }
    const { data : user, error } = useSWR(process.env.API + '/api/headmaster/user/show/' + id, fetcher)
    if(user) {
        console.log(user)
    }
    if(!user) {
        return <></>
    }
    return <>
        <PageLayout title={'Detail Guru'} hasBackUrl={true} isNativeBack>
            <div className="flex flex-col md:flex-row lg:flex-row w-full gap-3 mt-3">
                <div className="w-full md:w-4/12 lg:w-4/12 bg-base-100 shadow-lg p-3 rounded-xl">
                    <div className="rounded-xl">
                        <Image src={'/assets/images/avatar.png'} width={500} height={100} alt="profile image" />
                    </div>
                </div>
                <div className="w-full md:w-9/12 lg:w-0/12 bg-base-100 shadow-lg p-3 rounded-xl">
                    <div className="overflow-x-auto">
                        <table className="table w-full table-compact">
                            <tbody>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Nama Lengkap
                                    </td>
                                    <td>
                                        {user.data?.personal_data?.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        NIP
                                    </td>
                                    <td>
                                        {user.data?.personal_data?.registration_number}
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        NIK
                                    </td>
                                    <td>
                                    {user.data?.personal_data?.id_number}
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        NUPTK
                                    </td>
                                    <td>
                                    {user.data?.personal_data?.educator_number}
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Tempat, Tanggal Lahir
                                    </td>
                                    <td>
                                    {user.data?.personal_data?.birth_place}, {user.data?.personal_data?.birth_date}
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Jenis Kelamin
                                    </td>
                                    <td>
                                    {user.data?.personal_data?.gender}
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Status Perkawinan
                                    </td>
                                    <td>
                                        {user.data?.personal_data?.reference_marital_status?.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Agama
                                    </td>
                                    <td>
                                    {user.data?.personal_data?.reference_religion?.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Pangkat / Golongan
                                    </td>
                                    <td>
                                    {user.data?.personal_data?.reference_rank?.rank} / {user.data?.personal_data?.reference_rank?.group}
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Unit Kerja
                                    </td>
                                    <td>
                                    {user.data?.reference_work_unit?.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Jabatan
                                    </td>
                                    <td>
                                    {user.data?.personal_data?.reference_position?.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Status
                                    </td>
                                    <td>
                                    {user.data?.personal_data?.reference_status?.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Pendidikan Terakhir
                                    </td>
                                    <td>
                                    {user.data?.personal_data?.reference_education?.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        T.M.T CPNS / T.M.T PNS
                                    </td>
                                    <td>
                                    {user.data?.personal_data?.cs_candidate_year} / {user.data?.personal_data?.cs_year}
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        NPWP
                                    </td>
                                    <td>
                                        {user.data?.personal_data?.tax_number}
                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Nomor HP
                                    </td>
                                    <td>

                                    </td>
                                </tr>
                                <tr>
                                    <td width={10} className='font-semibold'>
                                        Alamat Lengkap
                                    </td>
                                    <td className="whitespace-normal">
                                        {user.data?.personal_data?.address}, PROVINSI {user.data?.personal_data?.province}, {user.data?.personal_data?.city}, KECAMATAN {user.data?.personal_data?.district}, DESA {user.data?.personal_data?.village}
                                        
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </PageLayout>
    </>
}