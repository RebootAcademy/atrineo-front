import api from "./config";

const getAtrineoCollectionAPI = async () => {
    // const id = '65a94d09aa0a5c3a29f6306a'
    const id = "65c64b05450a06186d100fee" // Local
    try {
        const { data } = await api.get(`/collection/${id}`, {
            headers: {
                token: localStorage.getItem("token"),
            }
        });
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Cannot send data");
    }
}

export default getAtrineoCollectionAPI