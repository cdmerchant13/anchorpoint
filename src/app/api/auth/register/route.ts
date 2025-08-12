import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, password, dutyStation } = await request.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'User with this email already exists' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // Already hashed on the client side
        dutyStation: dutyStation || null,
      },
    });

    // Return success response
    return new Response(
      JSON.stringify({ message: 'User created successfully', user: { id: user.id, name: user.name, email: user.email } }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}