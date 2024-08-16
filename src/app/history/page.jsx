import { promises as fs } from 'fs';
import path from 'path';
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

const filePath = path.join(process.cwd(), 'public', 'data', 'sales.json');

const getDailySales = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error('Not authenticated');
    }

    const userId = session.user.id;

    const jsonData = await fs.readFile(filePath, 'utf-8');
    const dailySales = JSON.parse(jsonData);

    const userSales = dailySales.filter(sale => sale.userId === userId);

    return userSales;
  } catch (e) {
    console.log("Error loading daily sales: ", e);
    return [];
  }
};

export default async function History() {
  const dailySales = await getDailySales();

  if (dailySales.length === 0) {
    return (
      <main className="main-container">
        <h1 className="heading">History</h1>
        <ul className="max-w-lg mx-auto">
          <li>
            <section className="flex flex-row flex-wrap justify-between p-8 my-8 border-2 rounded-lg text-gray-300 border-gray-300">
              <p className="font-bold text-3xl">No sales found.</p>
            </section>
          </li>
        </ul>
      </main>
    );
  }

  const salesList = dailySales.map(d => {
    const formattedDate = new Date(d.dateValue).toLocaleDateString('en-US', { timeZone: 'UTC' });
    return (
      <li key={d.id}>
        <Link href={`/history/${d.id}`} className="">
          <section className="flex flex-row flex-wrap justify-between p-6 my-6 border-2 rounded-lg text-gray-300 border-gray-300">
            <p className="font-bold text-2xl">{formattedDate}</p>
            <p className="font-bold text-2xl">{`$${d.totalValue}`}</p>
          </section>
        </Link>
      </li>
    );
  });

  return (
    <main className="main-container">
      <h1 className="heading">History</h1>
      <p className="paragraph">Here is a list of the daily sales. Scroll through and click a day if you want to see more details!</p>
      <ul className="max-w-lg mx-auto">
        {salesList}
      </ul>
    </main>
  );
}
