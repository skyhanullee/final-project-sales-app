import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const filePath = path.join(process.cwd(), 'public', 'data', 'users.json');

async function readUsersFromFile() {
  try {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

async function writeUsersToFile(users) {
  await fs.promises.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
}

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 11);

    const users = await readUsersFromFile();

    // Check if the user already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      return NextResponse.json({ message: "User already exists." }, { status: 400 });
    }

    users.push({ name, email, password: hashedPassword });

    await writeUsersToFile(users);

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (e) {
    console.error("Error registering user:", e);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
