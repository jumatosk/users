import axios from "axios";

async function searchByCep(cep) {
    const url = "https://viacep.com.br/ws/";
    try {
        const response = await axios.get(`${url}${cep}/json/`);

        return response.data;
    } catch (error) {
        return null;
    }
}

export default {
    searchByCep,
};