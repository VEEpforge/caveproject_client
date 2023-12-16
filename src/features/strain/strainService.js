import axios from "../../api/axios"

const STRAIN_URL = '/strains'

const addStrain = async (strainData, token) => {
	const authHeader = {
		headers: {
			'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
		},
	}
  const response = await axios.post(STRAIN_URL, strainData, authHeader)

  if(response.data && (response.data.error == null) ) {
		return response.data
	} else {
		throw new Error(response.data.error)
	}
}

const getAllStrains = async () => {
	const response = await axios.get(STRAIN_URL)

	if(response.data && (response.data.error == null) ) {
		localStorage.setItem( 'strain', JSON.stringify(response.data) )
		return response.data
	} else {
		throw new Error(response.data.error)
	}
}

const getStrainByUser = async (token) => {
	const headerAuth = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
	const response = await axios.get(STRAIN_URL + '/collection', headerAuth)

	console.log(response.data)

	if(response.data && (response.data.error == null) ) {
		localStorage.setItem( 'strain', JSON.stringify(response.data) )
		return response.data
	} else {
		throw new Error(response.data.error)
	}
}

const strainService = {
	addStrain,
	getAllStrains,
	getStrainByUser,
}

export default strainService