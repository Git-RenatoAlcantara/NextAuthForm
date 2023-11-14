'use client';

import { signOut } from "next-auth/react";



const Dashboard = async () => {
    return (
        <>
            <button
                className="px-4 py-2 bg-gray-300 text-white"
                onClick={() => signOut()}
            >
                Logout
            </button>
        </>
    )

}

export default Dashboard