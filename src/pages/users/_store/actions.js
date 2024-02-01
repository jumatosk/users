import api from "../_api";

const searchByCep = async(context, params) => {
    const result = await api.searchByCep(params);
    context.commit("STORE_ADDRESS", result);
};

export default {
    searchByCep,
};