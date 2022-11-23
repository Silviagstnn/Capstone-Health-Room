import { useEffect, useState } from "react"

function HomePage(){
    const [data, setData] = useState([])

    const getDataUsers = async () => {
        const response = await fetch('https://apicovid19indonesia-v2.vercel.app/api/indonesia')
        const data = await response.json()
        console.log(data)
        setData(data);
    }

    useEffect(() => {
        getDataUsers()
    }, [])

    return (
        <div className="App">
            <h3>Statistik Covid-19 Di Indonesia</h3>
            <div>
                <ul>
                    <li>Meninggal : {data.meninggal}</li>
                    <li>Kasus Terkonfirmasi : {data.positif}</li>
                    <li>Sedang Dirawat : {data.dirawat}</li>
                    <li>Berhasil Sembuh :{data.sembuh}</li>
                </ul>
            </div>
        
        </div>
    )
}

export default HomePage
