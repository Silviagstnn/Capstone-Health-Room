import '../css/findpage.css'
import {BiPhoneCall} from 'react-icons/bi'
import React from "react";
import { useEffect, useState } from "react";

function Links() {
	const [Provinsi, setProvinsi] = useState([]);
	const [Provinsiid, setProvinsiid] = useState("");
	const [Kota, setKota] = useState([]);
	const [Kotaid, setKotaId] = useState("");
	const [RSType, setRSTType] = useState("");
	const [RS, setRS] = useState([]);
	const [kotaLoading, setKotaLoading] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isViewDetail, setIsViewDetail] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`https://rs-bed-covid-api.vercel.app/api/get-provinces`
			);
			const Provinsi = await response.json();
			//console.log(JSON.stringify(Provinsi))
			// console.log(Provinsi.provinces.name)
			setProvinsi(Provinsi.provinces);
			// setProvinsi(newData)
			// console.log(newData)
		};
		fetchData();
	}, []);

	const handlerProvinsi = (event) => {
		const getProvid = event.target.value;
		//console.log(getProvid)
		setProvinsiid(getProvid);
	};

	useEffect(() => {
		if (!Provinsiid) {
			return;
		}
		const getKota = async () => {
			setKotaLoading(true);
			const response = await fetch(
				`https://rs-bed-covid-api.vercel.app/api/get-cities?provinceid=${Provinsiid}`
			);
			const Kota = await response.json();
			setKotaLoading(false);
			//console.log(JSON.stringify(Kota))
			//console.log(Kota.cities.name)
			setKota(Kota.cities);
		};
		getKota();
	}, [Provinsiid]);

	const handlerKota = (event) => {
		const getKotaid = event.target.value;
		//console.log(getKotaid)
		setKotaId(getKotaid);
	};
	const handleRadio = (event) => {
		const getRStype = event.target.value;
		// console.log(getRStype);
		setRSTType(getRStype);
	};

	const getRS = async () => {
		setIsLoading(true);
		const response = await fetch(
			`https://rs-bed-covid-api.vercel.app/api/get-hospitals?provinceid=${Provinsiid}&cityid=${Kotaid}&type=${RSType}`
		);
		let res = await response.json();
		const RS = res.hospitals;
		setIsLoading(false);
		setIsViewDetail(null);
		// console.log(RS);

		setRS(RS);
	};

	return (
		<div>
			<div className="findpage">
				<h2><span>Health</span><span>Room</span></h2>
				<p>Silahkan cari ketersediaan Kamar Rumah Sakit, Cukup Pilih Provinsi Kemudian Pilih Kota Dan Pilih Jenis kamar </p>
				<div className="findpage-option">
					<select className="form-control" onChange={(e) => handlerProvinsi(e)}>
						<option value="">Pilih Provinsi</option>

						{Provinsi.map((provinsi) => (
							<option value={provinsi.id} key={provinsi.id}>
								{provinsi.name}
							</option>
						))}
					</select>
					{!kotaLoading ? (
						<select className="form-control" onChange={(e) => handlerKota(e)}>
							<option value="">Pilih Kota</option>

							{Kota.map((kota) => (
								<option value={kota.id} key={kota.id}>
									{kota.name}
								</option>
							))}
						</select>
					) : (
						<p>Loading...</p>
					)}
				</div>

				{/* ============= Jenis Kamar */}

				<div className="jeniskamar">
					<div className="jeniskamar-item">
						<h4>Jenis Kamar</h4>
					</div>
					<div className="checkbox">
						<div className="check">Covid <input onChange={handleRadio} type="radio" name="rstype" value="1" /></div>
						<div className="check">Non-Covid <input onChange={handleRadio} type="radio" name="rstype" value="2" /></div>
					</div>
				</div>

				{/* Button Search */}

				<div className="container-btn">
					<button onClick={getRS}>Cari</button>
				</div>

				{/* =================  HASIL */}

				<div className="container-hasil">
					{!isLoading ? (
						!isViewDetail ? (
							<div className="hasil-dicari">
								<h3>Hasil RS Yang Dicari</h3>
									{RS.map((rs) => (
										<div key={rs.id} className='container-item_hasil'>
											<div className="tombol-btn"
													style={{ cursor: "pointer" }}
													onClick={() =>
														setIsViewDetail(async () => {
															setIsLoading(true);
															const response = await fetch(
																`https://rs-bed-covid-api.vercel.app/api/get-bed-detail?hospitalid=${rs.id}&type=${RSType}`
															);

															let res = await response.json();
															setIsLoading(false);
															const detail = res.data;
															// console.log(detail);

															setIsViewDetail(detail);
														})
													}
											>
												<div className="namaRS">
													<p>{rs.name}</p>
												</div>
											</div>
										</div>
									))}
							</div>
						) : (
							<div className="detile">
								<h2>{isViewDetail.name}</h2>
								<p>Alamat : {isViewDetail.address}</p>
								<div className="telp">
									<p>
										<BiPhoneCall/> {isViewDetail.phone || "Nomor Telpon Tidak Tersedia"}
									</p>
								</div>
								<ul>
									{isViewDetail.bedDetail &&
										isViewDetail.bedDetail.map((bed, index) => {
											const room = bed.stats;
											return (
												<li key={index} className='jenis-ruangan'>
													<p className='jenis-ruangan_title'>Jenis Ruangan: {room.title}</p>
													<div className="jenis-ruangan_list">
														<p>Ranjang Tersedia : {room.bed_available}</p>
														<p>Ranjang Kosong : {room.bed_empty}</p>
														<p>Antrian : {room.queue}</p>
														<p>Data Diambil Pada : {bed.time}</p>
													</div>
												</li>
											);
										})}
								</ul>
							</div>
						)
					) : (
						<p>Loading...</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Links;
