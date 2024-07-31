import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const filePath = path.join(process.cwd(), 'public', 'data', 'users.json');

async function readUsersFromFile() {
  try {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading users file:', e);
    return [];
  }
}

export async function POST(req) {
  const secret = process.env.NEXTAUTH_SECRET;
  try {
    const { email } = await req.json();
    const users = await readUsersFromFile();

    // Find the user by email
    const user = users.find(user => user.email === email);

    // Get the authentication token
    const token = await getToken({ req, secret });

    console.log("token: ", token);

    // Return the user data (only including _id equivalent, which could be index or some unique identifier)
    return NextResponse.json({ user: user ? { _id: user.email } : null });
  } catch (e) {
    console.error('Error handling POST request:', e);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
