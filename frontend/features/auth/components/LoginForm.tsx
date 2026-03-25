"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

function LogoIcon() {
    return (
        <svg
            className="w-9 h-9 text-green-600"
            viewBox="0 0 40 40"
            fill="none"
        >
            <path
                d="M3.33331 16.6667C4.63331 10.3067 9.44998 5.21671 15.6766 3.48337C16.2 3.33837 16.46 3.26504 16.6016 3.42004C16.7433 3.57671 16.6383 3.83337 16.4316 4.35004L15 7.50004M23.3333 3.33337C29.6933 4.63337 34.7833 9.45004 36.5166 15.6767C36.6616 16.2 36.735 16.46 36.58 16.6017C36.4233 16.7434 36.1666 16.6384 35.65 16.4317L32.5 15M36.6666 23.3334C35.3666 29.6934 30.55 34.7834 24.3233 36.5167C23.8 36.6617 23.54 36.735 23.3983 36.58C23.2566 36.4234 23.3616 36.1667 23.5683 35.65L25 32.5M16.6666 36.6667C10.3066 35.3667 5.21665 30.55 3.48331 24.3234C3.33831 23.8 3.26498 23.54 3.41998 23.3984C3.57665 23.2567 3.83331 23.3617 4.34998 23.5684L7.49998 25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M14.355 19.4417L20.1866 11.955C20.6433 11.37 21.4983 11.735 21.4983 12.515V18.3083C21.4983 18.775 21.8316 19.155 22.2466 19.155H25.0833C25.7266 19.155 26.07 20.0117 25.645 20.5584L19.8133 28.045C19.3566 28.63 18.5016 28.265 18.5016 27.485V21.6917C18.5016 21.225 18.1683 20.845 17.7533 20.845H14.9166C14.2733 20.845 13.9283 19.9884 14.355 19.4417Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        router.push("/dashboard");
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-white">

            {/* 🔹 Topbar */}
            <div className="h-[60px] flex items-center px-6 border-b border-gray-200 shrink-0">
                <div className="flex items-center gap-3">
                    <LogoIcon />
                    <div>
                        <p className="font-bold text-sm text-gray-800">
                            ASSIGNMENT
                        </p>
                        <p className="text-xs text-gray-400">
                            Energy Assignment
                        </p>
                    </div>
                </div>
            </div>

            {/* 🔹 Content */}
            <div className="flex flex-1 min-h-0">

                {/* 🖼️ Image */}
                <div className="hidden md:block md:w-1/2 relative">
                    <img
                        src="/images/login_image.png"
                        alt="login"
                        className="absolute inset-0 w-full h-full object-cover object-[50%_0]"
                    />

                    {/* overlay */}
                    <div className="absolute inset-0 bg-white/10" />
                </div>

                {/* 🧾 Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-12 overflow-y-auto">
                    <div className="w-full max-w-[360px] space-y-5">

                        {/* Title */}
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Internal Access
                            </h1>
                            <p className="text-sm text-gray-400 mt-1">
                                Authorized personnel Only. Please sign in to continue.
                            </p>
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <label className="text-sm text-gray-700">E-mail</label>
                            <Input
                                placeholder="E-mail"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <label className="text-sm text-gray-700">Password</label>
                            <Input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Button */}
                        <Button onClick={handleLogin}>
                            Login
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    );
}