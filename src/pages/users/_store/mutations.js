import { constants } from "../_constants";

const itemsStateName = Object.keys(constants.state);

const STORE_ADDRESS = (state, itemsState) => {
    state[itemsStateName[0]] = itemsState;
};

export default {
    STORE_ADDRESS,
}