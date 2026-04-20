const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getHeaders() {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

// 🔹 GET LIST
export async function getPRList() {
    const res = await fetch(`${API_URL}/pr`, {
        headers: getHeaders(),
    });

    if (!res.ok) throw new Error("Failed to fetch PR");

    return res.json();
}

// 🔹 CREATE
export async function createPR(data: any) {
    const res = await fetch(`${API_URL}/pr`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Create failed");

    return res.json();
}

// 🔹 DELETE
export async function deletePR(id: number) {
    const res = await fetch(`${API_URL}/pr/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
    });

    if (!res.ok) throw new Error("Delete failed");

    return res.json();
}

// 🔹 UPDATE
export async function updatePR(id: number, data: any) {
    const res = await fetch(`${API_URL}/pr/${id}`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Update failed");

    return res.json();
}


export async function getPRDetail(id: number) {
    const res = await fetch(`${API_URL}/pr/${id}`, {
        headers: getHeaders(),
    });

    if (!res.ok) throw new Error("Failed to fetch detail");

    return res.json();
}