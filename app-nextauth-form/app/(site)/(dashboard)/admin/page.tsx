import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"


const Dashboard = () => {
    const session = getServerSession(authOptions)
    
    return (
        <h1>Dashboard</h1>
    )
}

export default Dashboard