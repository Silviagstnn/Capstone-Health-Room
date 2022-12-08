import '../css/aboutus.css'
import { AiFillGithub } from "react-icons/ai";

function AboutUs(){
    return (
        <div>
             <div className="aboutus">
                <div className="aboutus-title">
                    <h2>SIB TEAM C22-248</h2>
                    <p>Perkenalkan, Kami Team Capstone Dicoding yang ingin membuat Web HealthRoom, dengan tujuan untuk mempermudah dalam mencari informasi seputar Rumah Sakit, baik ruangan kosong, No Telp, Alamat, inilah Team Kitaaa !!!</p>
                </div>
                <div className="aboutus-list">
                    <div className="aboutus-list_item">
                        <img src={require('../assets/qois.png')} alt="qois"/>
                        <p>Qois Al 'Ariq</p>
                        <p>Seorang Mahasiswa Universitas Hasyim Asy'ari yang tertarik bidang IT, dia juga memiliki motto 'Bersemangatlah atas hal-hal yang bermanfaat bagimu'  </p>
                        <div className="socmed">
                            <a href="https://github.com/Qois30">GIthub <span><AiFillGithub/></span></a>
                        </div>
                    </div>
                    <div className="aboutus-list_item">
                        <img src={require('../assets/silvi.png')} alt="qois"/>
                        <p>Silvi Agustina</p>
                        <p>Seorang Mahasiswa Universitas Sriwijaya yang tertarik bidang IT, yang memiliki motto "Semangat terus sampai mampus"  </p>
                        <div className="socmed">
                            <a href="https://github.com/Silviagstnn">GIthub <span><AiFillGithub/></span></a>
                        </div>
                    </div>
                </div>
             </div>
        </div>
     )
}

export default AboutUs;