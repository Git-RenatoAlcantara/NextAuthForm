import Link from "next/link"



export default function Home() {
  return (
   <>
    <h1>Home</h1>
    <Link 
      className="px-2 bg-gray-300 text-white"
      href="/admin"
      >
        Open my admin
    </Link>
   </>
  )
}
