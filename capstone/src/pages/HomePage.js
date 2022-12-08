import { useEffect, useState } from "react"

function HomePage(){
    const [data, setData] = useState([])

    const getDataUsers = async () => {
        const response = await fetch('https://62a6dcabbedc4ca6d7bb825a.mockapi.io/api/indonesia')
        const data = await response.json()
        console.log(JSON.stringify(data))
        console.log(data[0].meninggal)
        setData(data[0]);
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
                    <li>Kasus Terkonfirmasi : {data.kasusterkonfirmasi}</li>
                    {/* <li>Sedang Dirawat : {data.dirawat}</li>
                    <li>Berhasil Sembuh :{data.sembuh}</li> */}
                </ul>
            </div>
        
        </div>
    )
}

export default HomePage
