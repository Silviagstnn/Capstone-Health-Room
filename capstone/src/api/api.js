const BASE_URL = "https://rs-bed-covid-api.vercel.app/api/get-provinces";

class API {
	static async fetchProvinsi() {
		const response = await fetch(`${BASE_URL}`);
		const responseJson = await response.json();
		return responseJson.provinces;
	}

	static async fetchKota(idProv) {
		const response = await fetch(
			"https://rs-bed-covid-api.vercel.app/api/get-cities?provinceid=" + idProv
		);
		const responseJson = await response.json();

		return responseJson.cities;
	}

	static async fetchRS(idProv, idKota, tipeBed) {
		const response = await fetch(
			"https://rs-bed-covid-api.vercel.app/api/get-hospitals?provinceid=" +
				idProv +
				"&cityid=" +
				idKota +
				"&type=" +
				tipeBed
		);
		const responseJson = await response.json();

		return responseJson.data;
	}

	static async fetchStatistik() {
		const response = await fetch(
			"https://62a6dcabbedc4ca6d7bb825a.mockapi.io/api/indonesia"
		);
		const responseJson = await response.json();

		return responseJson;
	}
}

export default API;
