import { useEffect, useState } from "react"
import apiClient from "../../api/apiClient"
import Header from "../common/Header"

function UserDashboard() {
    const [stores, setStores] = useState([])
    const [selectedStore, setSelectedStore] = useState(null)
    const [rating, setRating] = useState(1)
    const [search, setSearch] = useState("")
    useEffect(() => {
        fetchStores()
    }, [])

    const fetchStores = async () => {
        try {
            const response = await apiClient.get("/user/stores")
            setStores(response.data)
        } catch (error) {
            console.log("Failed to load stores")
        }
    }

    const submitRating = async () => {
        try {
            await apiClient.post("/user/rate", {
                storeId: selectedStore.id,
                rating,
            })
            alert("Rating submitted successfully")
            setSelectedStore(null)
            fetchStores()
        } catch (error) {
            alert("Rating failed")
        }
    }

    const filteredStores = stores.filter((store) =>
        store.name.toLowerCase().includes(search.toLowerCase()) ||
        store.address.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <>
            <Header />
            <div style={{ padding: "20px" }}>
                <h2>Stores</h2>

                {filteredStores.map((store) => (
                    <div key={store.id} style={styles.card}>
                        <h4>{store.name}</h4>
                        <p>{store.address}</p>
                        <p>Rating: {Number(store.rating).toFixed(1)}</p>

                        <button onClick={() => setSelectedStore(store)}>
                            Rate Store
                        </button>
                    </div>
                ))}

                <input
                    placeholder="Search by name or address"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ marginBottom: "15px", width: "300px" }}
                />

                {selectedStore && (
                    <div style={styles.modal}>
                        <h3>Rate {selectedStore.name}</h3>

                        <select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                        >
                            {[1, 2, 3, 4, 5].map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>

                        <button onClick={submitRating}>Submit</button>
                        <button onClick={() => setSelectedStore(null)}>Cancel</button>
                    </div>
                )}
            </div>
        </>
    )
}

const styles = {
    card: {
        background: "#fff",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "5px",
    },
    modal: {
        position: "fixed",
        top: "30%",
        left: "40%",
        background: "#fff",
        padding: "20px",
        borderRadius: "6px",
    },
}

export default UserDashboard
