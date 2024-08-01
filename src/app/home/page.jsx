import Image from 'next/image';
import Link from 'next/link';
import UserInfo from '../components/UserInfo';

export default function Home() {

  return (
    <main className="main-container">
      <h1 className="heading">Home</h1>
      <p className="paragraph">Now that you're logged in, you can use the navbar to navigate through the site!</p>
      <UserInfo />
      <p className="paragraph">If you want to log out, you can click <strong>Log Out</strong> to leave.</p>
      <p className="paragraph">You can go to <strong>History</strong> to look at past sales or go to <strong>New Sales</strong> to record your daily sales.</p>
    </main>
  )
}
