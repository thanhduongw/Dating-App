// services/authApi.ts
const BASE_URL = "https://67f59cbe913986b16fa51f11.mockapi.io/auth";

export async function registerUser(name: string, phone: string, password: string) {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, password }),
    });
    if (!res.ok) throw new Error("Register failed");
    return res.json();
}

export async function loginUser(phone: string, password: string) {
    const res = await fetch(`${BASE_URL}?phone=${phone}`);
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    if (data.length === 0) throw new Error("User not found");

    const user = data[0];
    if (user.password !== password) throw new Error("Invalid password");

    return user;
}

export async function requestOTP(phone: string) {
    // Giả lập gửi OTP
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, otp: "123456" };
}

export async function verifyOTP(otp: string) {
    // Xác minh OTP (giả lập)
    await new Promise((resolve) => setTimeout(resolve, 500));
    return otp === "123456";
}

export async function resetPassword(phone: string, newPassword: string) {
    // Tìm user bằng phone
    const res = await fetch(`${BASE_URL}?phone=${phone}`);
    if (!res.ok) throw new Error("Cannot find account");
    const users = await res.json();
    if (users.length === 0) throw new Error("Phone not found");

    // Cập nhật mật khẩu
    const user = users[0];
    const update = await fetch(`${BASE_URL}/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, password: newPassword }),
    });
    if (!update.ok) throw new Error("Failed to reset password");
    return update.json();
}