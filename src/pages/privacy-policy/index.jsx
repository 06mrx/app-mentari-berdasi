import Head from 'next/head'
import { useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Home() {
  const router = useRouter();
  // router.push('/auth/login')
 
 
  return (
    <>
      <Head>
        <title>{process.env.APP_NAME}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon/favicon-16x16.png" />
      </Head>
      <main>
        <div className='h-screen w-screen'>
          <div className="navbar bg-base-100 shadow-lg">
            <div className="navbar-start">
              <Image src={'/favicon/android-icon-144x144.png'} width={65} height={65} alt='favicon' />
            </div>
            <div className="navbar-center">
              <a className="btn btn-ghost normal-case font-bold text-sky-500 text-xl md:text-3xl lg:text-3xl">{process.env.APP_NAME}</a>
            </div>
            <div className="navbar-end">
              {/* <Link href={'/auth/register'}>
                <button className='btn  btn-info mr-3'>
                  Daftar
                </button>
              </Link>
              <Link href={'/auth/login'}>
                <button className='btn btn-outline btn-info mr-3'>
                  Masuk
                </button>
              </Link> */}
            </div>
          </div>

          <section className='bg-base-300 mt-5 max-w-5xl p-3 rounded-lg mx-auto mb-3'>
           
              <h1 className='text-2xl font-bold text-center'>Kebijakan Privasi</h1>
              <p>
                Kami menjaga privasi pelanggan dengan serius dan kami hanya akan mengumpulkan dan menggunakan informasi pribadi Anda seperti uraian di bawah ini.
              </p>
              <p className='mt-5'>
              Perlindungan data adalah hal yang menyangkut kepercayaan dan privasi Anda sangatlah penting bagi kami. Oleh karena itu, kami hanya akan menggunakan nama anda dan informasi lain yang berhubungan dengan Anda sesuai dengan kebijakan privasi ini. Kami hanya akan mengumpulkan informasi yang penting bagi kami dan kami hanya akan mengumpulkan beberapa informasi yang dibutuhkan untuk melakukan urusan dengan Anda
              </p>
              <p className="mt-5">
              Kami hanya akan menyimpan informasi Anda selama dibutuhkan diwajibkan oleh hukum atau selama informasi tersebut berhubungan dengan tujuan-tujuan yang ada saat informasi dikumpulkan
              </p>
              <p className="mt-5">
              Kebijakan privasi kami mengikuti kebijakan perundangan-undangan yang berlaku. Bila Anda memiliki komentar dan masukan, kami dengan senang hati menerimanya melalui alamat email kami di agrayasateknotama@gmail.com.
              </p>
              <h1 className='mt-10 text-center font-bold'>Pengumpulan Informasi Privasi secara Personal</h1>
              <p>
              <span className="font-bold">Mentari Berdasi</span> tidak menjual, menyebarkan atau memperdagangkan informasi pribadi milik pelanggan yang didapatkan online dengan kepada pihak ketiga
              </p>
              <p className="mt-5">
              Informasi pribadi alias privasi yang dikumpulkan secara online hanya diperlihatkan dalam perusahaan kami dan hanya dipergunakan <span className="font-bold">Mentari Berdasi</span>  dalam rangka pemberian layanan kepada Anda secara internal.
              </p>
              <p className='mt-5'>
              Saat Anda membuat akun Mentari Berdasi , informasi pribadi yang mungkin akan kami kumpulkan termasuk namun tidak terbatas pada: <br />
              Nama <br /> ALamat Email <br/> Nomor Telepon <br /> No. KTP<br/>
              </p>
              <p className="mt-5">
              Lebih dari itu, kami akan menggunakan informasi yang Anda berikan untuk urusan administrasi akun Anda dengan kami; untuk verifikasi pengguna; mengidentifikasi pengunjung aplikasi kami; melakukan riset mengenai data demografis pengguna aplikasi kami; mengirimkan Anda informasi yang kami anggap akan berguna untuk Anda yang Anda minta dari kami
              </p>

              <h1 className='mt-10 text-center font-bold'>Keamanan Informasi Pribadi Anda</h1>
              <p className=''>
              <span className="font-bold">Mentari Berdasi</span>  memastikan bahwa informasi yang dikumpulkan akan disimpan dengan aman. Kami menyimpan informasi pribadi Anda dengan cara:
              <h1 className='mt-5 font-bold'>Membatasi akses ke dalam informasi pribadi Anda</h1>
              <ul>
                <li>
                    Mengurus dan mengelola akses perangkat yang tidak memiliki izin
                </li>
                <li>
                    Secara aman menghancurkan informasi pribadi Anda saat kami tidak lagi membutuhkannya untuk tujuan catatan retensi
                </li>
              </ul>
              <h1 className='font-bold'>Meminta akses lokasi saat menggunakan aplikasi</h1>
              <ul>
                <li>
                    Saat menggunakan aplikasi, akan ada pemberitahuan aktivasi lokasi untuk keperluan tracking TPK saat melakukan kegiatan.
                </li>
                <li>
                    Jika aplikasi tidak digunakan maka akses lokasi pada aplikasi secara otomatis akan mati.
                </li>
              </ul>
              </p>

              <h1 className='mt-10 text-center font-bold'>Penyingkapan Informasi Pribadi</h1>
              <p>
              Kami tidak akan membagikan informasi Anda dengan organisasi lain selain organisasi yang bekerjasama dengan <span className="font-bold">Mentari Berdasi</span> . Dalam situasi yang dikecualikan, <span className="font-bold">Mentari Berdasi</span>  mungkin akan membutuhkan Anda untuk menyingkapkan informasi pribadi Anda, termasuk saat dimana adanya sesuai perintah pengadilan atau undang-undang yang berlaku bukti bahwa penyingkapan informasi dapat mencegah ancaman hidup atau kesehatan, atau untuk kepentingan hukum. <span className="font-bold">Mentari Berdasi</span>  memiliki komitmen untuk mematuhi the Privacy Act and the National Privacy Principles kebijakan perundang undangan yang berlaku
              </p>
              <p className="mt-5">
              Bila Anda percaya bahwa privasi Anda telah dilanggar oleh <span className="font-bold">Mentari Berdasi</span> , harap hubungi kami di agrayasateknotama@gmail.com dan kami akan menyelesaikan masalah tersebut
              </p>
              <h1 className='mt-10 text-center font-bold'>Pengumpulan Data Komputer</h1>
              <p>
              Saat Anda mengunjungi Mentari Berdasi , server perusahaan kami akan mengumpulkan informasi yang smartphone Anda kirim saat Anda membuka aplikasi secara otomatis. Data ini mungkin akan termasuk : Alamat IP Komputer Anda dan Tracking Lokasi Anda saat ini.
              </p>
              <p className="mt-5">
              Informasi yang dikumpulkan akan digunakan untuk analisa dan evaluasi untuk membantu kami memperbaiki aplikasi kami, dan pelayanan-pelayanan yang kami beri. Data-data ini tidak akan digunakan berhubungan dengan informasi pribadi lainnya
              </p>
              <h1 className='mt-10 text-center font-bold'>Perubahan dalam Kebijakan Privasi</h1>
              <p className="">
              <span className="font-bold">Mentari Berdasi</span>  memiliki hak untuk merubah dan memodifikasi kebijakan privasi kapan saja. Rencana perubahan kebijakan privasi tersebut akan dipublikasikan di website kami 7 (tujuh) hari sebelum diberlakukan.
              </p>
              <h1 className='mt-10 text-center font-bold'>Keluhan mengenai Pelanggaran Hak Privasi</h1>
              <p>
              Bila Anda tidak puas dengan cara kami menangani pertanyaan atau keluhan Anda, harap langsung hubungi kami di agrayasateknotama@gmail.com
              </p>
          </section>

          <footer className="footer p-10 bg-neutral text-neutral-content">
            <div>
              <Image src={'/favicon/android-icon-144x144.png'} width={90} height={90} alt='favicon' />
              <p>{process.env.APP_NAME}<br />Jl. Kenari No.1A, Selabatu, Kec. Cikole, Kota Sukabumi, Jawa Barat 43114</p>
            </div>
            {/* <div>
              <span className="footer-title">Social</span>
              <div className="grid grid-flow-col gap-4">
                <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
                <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
                <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
              </div>
            </div> */}
          </footer>
        </div>
      </main>
    </>
  )
}
