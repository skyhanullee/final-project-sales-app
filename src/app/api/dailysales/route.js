import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'public', 'data', 'sales.json');

async function readDailySales() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    console.log(data)
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading daily sales file:', e);
  }
}

async function writeDailySales(dailySales) {
  try {
    await fs.writeFile(filePath, JSON.stringify(dailySales, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing daily sales file:', e);
  }
}

export async function POST(req) {
  try {
    const { dateValue, foodValue, electronicsValue, clothesValue, drinksValue, totalValue, username } = await req.json();
    console.log(dateValue, foodValue, electronicsValue, clothesValue, drinksValue, totalValue, username)
    if (!dateValue || !username || totalValue === undefined) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }
    const dailySales = await readDailySales();

    // Check for duplicate entries
    const existingDate = dailySales.find(sale => sale.dateValue === dateValue && sale.username === username);
    if (existingDate) {
      return NextResponse.json({ message: "Daily Sale Already Exists" }, { status: 400 });
    }

    // Generate a new ID for the new sale
    const newId = dailySales.length ? Math.max(dailySales.map(sale => sale.id)) + 1 : 1;
    
    // Create a new sale record
    const newSale = {
      id: newId,
      dateValue,
      foodValue,
      electronicsValue,
      clothesValue,
      drinksValue,
      totalValue,
      username,
    };

    dailySales.push(newSale);
    await writeDailySales(dailySales);

    return NextResponse.json({ message: "Daily Sale Created" }, { status: 201 });
  } catch (e) {
    console.error('Error creating daily sale:', e);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const dailySales = await readDailySales();

    const index = dailySales.findIndex(sale => sale.id === parseInt(id));
    if (index === -1) {
      return NextResponse.json({ message: "Daily Sale not found" }, { status: 404 });
    }

    dailySales.splice(index, 1);
    await writeDailySales(dailySales);

    return NextResponse.json({ message: "Daily Sale deleted" }, { status: 200 });
  } catch (e) {
    console.error('Error deleting daily sale:', e);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const { id } = params;
  const {
    newElectronicsValue: electronicsValue,
    newFoodValue: foodValue,
    newClothesValue: clothesValue,
    newDrinksValue: drinksValue,
    newTotalValue: totalValue
  } = await req.json();

  try {
    const dailySales = await readDailySales();
    const index = dailySales.findIndex(sale => sale.id === id);

    if (index === -1) {
      return NextResponse.json({ message: "Daily Sale not found" }, { status: 404 });
    }

    // Update the specific daily sale
    dailySales[index] = {
      ...dailySales[index],
      electronicsValue,
      foodValue,
      clothesValue,
      drinksValue,
      totalValue
    };

    await writeDailySales(dailySales);

    return NextResponse.json({ message: "Daily Sale updated" }, { status: 200 });
  } catch (e) {
    console.error('Error updating daily sale:', e);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const dailySales = await readDailySales();
    const dailySale = dailySales.find(sale => sale.id === id);

    if (!dailySale) {
      return NextResponse.json({ message: "Daily Sale not found" }, { status: 404 });
    }

    return NextResponse.json({ dailySale }, { status: 200 });
  } catch (e) {
    console.error('Error fetching daily sale:', e);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
