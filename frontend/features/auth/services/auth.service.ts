const API_URL = process.env.NEXT_PUBLIC_API_URL;

console.log("API_URL:", API_URL);

export async function loginApi(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error("Login failed");
    }

    return res.json();
}