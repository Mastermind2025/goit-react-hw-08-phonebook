import { STATUS } from "constans/status.constans";

export const authInitState = {
    status: STATUS.idle,
    values: null,
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
};