import '../css/homepage.css'
import landing from '../assets/landing.svg'
import landingTwo from '../assets/landing 2.svg'
import { useEffect, useState } from "react"
import { GiDeathSkull, GiHealthCapsule, GiHealthNormal } from 'react-icons/gi'
import {MdHealthAndSafety} from 'react-icons/md'
import { Link } from 'react-router-dom'


function HomePage(){
    const [data, setData] = useState([])

    const getDataUsers = async () => {
        const response = await fetch('https://apicovid19indonesia-v2.vercel.app/api/indonesia')
        const data = await response.json()
        // console.log(data)
        setData(data);
    }

    useEffect(() => {
        getDataUsers()
    }, [])

    return (
       <div>
            <div className="homepage">

                {/* ====================== Landing Page */}

                <div className="homepage-item">
                    <div className="homepage-item_landing">
                        <div className="homepage-item_landing__right">
                            <img src={landing} alt="landing" />
                        </div>
                        <div className="homepage-item_landing__left">
                            <p>Temukan Ruang Inap Anda Menggunakan <span>Health</span><span>Room</span></p>
                            <div className="sublanding">
                                <p>Web ini membantu anda dalam mencari ruang inap baik ruang inap Covid-19 maupun non Covid-19</p>
                            </div>
                            <Link to="/link" className='cari'>Cari</Link>
                        </div>
                    </div>
                </div>

                {/* ======================  Data Covid */}

                <div className="homepage-data__covid">
                    <div className="title-datacovid">Data Statistik Covid-19</div>
                    <div className="container-card">
                        <div className="card">
                            <div className="icon d-flex justify-content-center"><GiHealthCapsule/></div>
                            <div className="card-body d-flex justify-content-center">
                                <p className='cart-text'>Sedang Dirawat </p><span>{data.dirawat}</span>
                            </div>
                        </div>
                        <div className="card">
                            <div className="icon d-flex justify-content-center"><GiDeathSkull/></div>
                            <div className="card-body d-flex justify-content-center">
                                <p className='cart-text'>Meninggal </p><span>{data.meninggal}</span>
                            </div>
                        </div>
                        <div className="card">
                            <div className="icon d-flex justify-content-center"><GiHealthNormal/></div>
                            <div className="card-body d-flex justify-content-center">
                                <p className='cart-text'>Positif </p><span>{data.positif}</span>
                            </div>
                        </div>
                        <div className="card">
                            <div className="icon d-flex justify-content-center"><MdHealthAndSafety/></div>
                            <div className="card-body d-flex justify-content-center">
                                <p className='cart-text'>Berhasil Sembuh </p> <span>{data.sembuh}</span>
                            </div>
                        </div>
                        <div className="update-data-covid">
                            <div className="update-data-covid_isi"><p>Update Data</p></div>
                            <p><b>{data.lastUpdate}</b></p>
                        </div>
                    </div>
                </div>

                {/* ====================== Landing Page Two */}
                
                <div className="homepage-item">
                    <div className="homepage-item_landing">
                        <div className="right two">
                            <img src={landingTwo} alt="landing" />
                        </div>
                        <div className="left two">
                            <p>Keadaan <span>darurat</span>, butuh ruang <span>inap</span> ? Serahkan pada kami!!</p>
                            <div className="sublanding">
                                <p>Tidak perlu mengunjungi satu persatu dari rumah sakit ketika dalam keadaaan darurat, Kekhawatiran ketika kamar penuh? tentu saja tidak lagi, Anda bisa melakukan reservasi melalui no-telp setiap rumah sakit. <span>Tetap Waspada COVID-19</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==========Foooter */}

            <div className="footer">
                <div className="footer-wave">
                </div>
                <div className="footer-item">
                    <p>Resource</p>
                    <p>https://rs-bed-covid-api.vercel.app</p>
                    <p>https://apicovid19indonesia-v2.vercel.app/api/indonesia</p>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
