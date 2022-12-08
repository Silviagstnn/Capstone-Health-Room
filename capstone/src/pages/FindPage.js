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
		console.log(getRStype);
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
		console.log(RS);

		setRS(RS);
	};

	return (
		<div>
			<h1> Form </h1>

			<select className="form-control" onChange={(e) => handlerProvinsi(e)}>
				<option value="">Pilih Provinsi {Provinsiid}</option>

				{Provinsi.map((provinsi) => (
					<option value={provinsi.id} key={provinsi.id}>
						{provinsi.name}
					</option>
				))}
			</select>
			{!kotaLoading ? (
				<select className="form-control" onChange={(e) => handlerKota(e)}>
					<option value="">Pilih Kota {Kotaid}</option>

					{Kota.map((kota) => (
						<option value={kota.id} key={kota.id}>
							{kota.name}
						</option>
					))}
				</select>
			) : (
				<p>Loading...</p>
			)}

			<div className="checkbox">
				Covid{RSType}
				<input onChange={handleRadio} type="radio" name="rstype" value="1" />
				Non-Covid{RSType}
				<input onChange={handleRadio} type="radio" name="rstype" value="2" />
			</div>
			<div>
				<button onClick={getRS}>Cari</button>
			</div>

			{!isLoading ? (
				!isViewDetail ? (
					<div>
						<h2>RS yang Dicari</h2>
						{RS.map((rs) => (
							<div key={rs.id}>
								<p
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
											console.log(detail);

											setIsViewDetail(detail);
										})
									}
								>
									{rs.name}
								</p>
							</div>
						))}
					</div>
				) : (
					<div>
						<h2>{isViewDetail.name}</h2>
						<p>Alamat : {isViewDetail.address}</p>
						<p>
							Telpon : {isViewDetail.phone || "Nomor Telpon Tidak Tersedia"}
						</p>
						<ol>
							{isViewDetail.bedDetail &&
								isViewDetail.bedDetail.map((bed, index) => {
									const room = bed.stats;
									return (
										<li key={index}>
											<p>Jenis Ruangan: {room.title}</p>
											<p>Ranjang Tersedia : {room.bed_available}</p>
											<p>Ranjang Kosong : {room.bed_empty}</p>
											<p>Antrian : {room.queue}</p>
											<p>Data Diambil Pada : {bed.time}</p>
										</li>
									);
								})}
						</ol>
					</div>
				)
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}

export default Links;
