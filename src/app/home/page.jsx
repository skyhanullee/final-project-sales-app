import Image from 'next/image';
import Link from 'next/link';
import UserInfo from '../components/UserInfo';

export default function Home() {

  return (
    <main className="main-container">
      <h1 className="heading">Home</h1>
      <UserInfo />
    </main>
  )
}
