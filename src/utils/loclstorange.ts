export const getUserInfo = () => {
    try {
        if (typeof window !== "undefined") {
            const jsonValue = localStorage.getItem("user");
            return jsonValue ? JSON.parse(jsonValue) : null;
        }
        return null;
    } catch (e) {
        console.error("Error parsing user:", e);
        return null;
    }
};
export const getCustomerInfo = () => {
    try {
        if (typeof window !== "undefined") {
            const jsonValue = localStorage.getItem("customer");
            return jsonValue ? JSON.parse(jsonValue) : null;
        }
        return null;
    } catch (e) {
        console.error("Error parsing user:", e);
        return null;
    }
};


export const getToken = () => {
    try {
        if (typeof window !== "undefined") {
            const jsonValue = localStorage.getItem("token");
            return jsonValue ? jsonValue : null;
        }
        return null;
    } catch (e) {
        console.error("Error parsing token:", e);
        return null;
    }
};