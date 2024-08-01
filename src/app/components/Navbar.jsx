import Link from "next/link";


export default function Navbar() {
  return (
    <nav className="flex flex-row justify-end p-6 gap-10 bg-[#788bff]">
      <Link href="/home">
        Home
      </Link>
      <Link href="/history">
        History
      </Link>
      <Link href="/createdailysales">
        New Sales
      </Link>
    </nav>
  )
}
