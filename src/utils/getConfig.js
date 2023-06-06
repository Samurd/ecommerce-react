export const getConfig = () => (
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenUser")}`
        }
    }
)
