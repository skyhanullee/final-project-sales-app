import { promises as fs } from 'fs';
import path from 'path';
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

// Define the path to the JSON file containing daily sales data
const filePath = path.join(process.cwd(), 'public', 'data', 'sales.json');

const getDailySales = async () => {
  try {
    // Get session information to identify the user
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error('Not authenticated');
    }

    const userId = session.user.id;

    // Read the daily sales data from the JSON file
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const dailySales = JSON.parse(jsonData);

    // Filter sales data by user ID
    const userSales = dailySales.filter(sale => sale.userId === userId);

    return { dailySales: userSales };
  } catch (e) {
    console.log("Error loading daily sales: ", e);
    return { dailySales: [] };
  }
};

export default async function History() {
  const { dailySales } = await getDailySales();

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
