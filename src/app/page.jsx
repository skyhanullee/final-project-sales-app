import Image from 'next/image';
import Link from 'next/link';
import LoginForm from './components/LoginForm';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/home");
  }

  return (
    <main className="main-container">
      <h1 className="heading">Home</h1>
      <LoginForm />
    </main>
  )
}