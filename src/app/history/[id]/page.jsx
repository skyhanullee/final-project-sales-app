import { promises as fs } from 'fs';
import path from 'path';
import Link from "next/link";
import RemoveButton from "../../components/RemoveButton";

// Define the path to the JSON file containing daily sales data
const filePath = path.join(process.cwd(), 'public', 'data', 'sales.json');

// Fetch the daily sale data by ID from the JSON file
const getDailySalesById = async (id) => {
  try {
    // Read the daily sales data from the JSON file
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const dailySales = JSON.parse(jsonData);

    // Find the sale by ID
    const dailySale = dailySales.find(sale => sale.id === parseInt(id, 10));
    if (!dailySale) {
      throw new Error("Sale not found");
    }

    return { dailySale };
  } catch (e) {
    console.error("Error loading daily sales:", e);
    return { dailySale: null };
  }
};

export default async function DailySalesInfo({ params }) {
  const { id } = params;
  const { dailySale } = await getDailySalesById(id);

  if (!dailySale) {
    return (
      <main className="main-container">
        <h1 className="heading">Info</h1>
        <p className="text-center text-gray-300 text-2xl">Sale not found.</p>
      </main>
    );
  }

  const { dateValue, foodValue, electronicsValue, clothesValue, drinksValue, totalValue } = dailySale;
  const formattedDate = new Date(dateValue).toLocaleDateString('en-US', { timeZone: 'UTC' });

  return (
    <main className="main-container">
      <section className="flex flex-row items-center justify-center">
        <h1 className="heading">Info</h1>
        {/* <Link href={`/editdailysales/${id}`} className="text-xl p-4 m-6 border-2 rounded-lg text-gray-300 border-gray-300 flex flex-row justify-around gap-8">
          Edit
        </Link> */}
      </section>
      <section className="max-w-lg mx-auto">
      <p className="paragraph pt-8">This page contains a specific day's sales data.</p>
        <table className="table-fixed w-full text-gray-300 border-gray-300 rounded-lg">
          <tbody>
            <tr>
              <td className="px-6 py-4 text-2xl border">Date:</td>
              <td className="px-6 py-4 text-2xl border">{formattedDate}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-2xl border">Food:</td>
              <td className="px-6 py-4 text-2xl border">{foodValue ? `$${foodValue}` : `-`}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-2xl border">Electronics:</td>
              <td className="px-6 py-4 text-2xl border">{electronicsValue ? `$${electronicsValue}` : `-`}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-2xl border">Clothes:</td>
              <td className="px-6 py-4 text-2xl border">{clothesValue ? `$${clothesValue}` : `-`}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-2xl border">Drinks:</td>
              <td className="px-6 py-4 text-2xl border">{drinksValue ? `$${drinksValue}` : `-`}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-2xl border">Total:</td>
              <td className="px-6 py-4 text-2xl border">{totalValue ? `$${totalValue}` : `-`}</td>
            </tr>
          </tbody>
        </table>
      </section>
      {/* <p className="paragraph">Click <strong>Edit</strong> if you want to edit or update the records.</p> */}
    </main>
  );
}
