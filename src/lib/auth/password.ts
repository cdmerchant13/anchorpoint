// Mock password utilities for frontend-isolated branch
// These functions don't actually hash passwords since we're using mock authentication

export async function hashPassword(password: string): Promise<string> {
  // In a real app, this would hash the password with bcrypt
  // For mock purposes, we'll just return a simple hash of the password
  // This is NOT secure and is only for demonstration purposes
  const mockHash = `mock_hash_${password.length}_${password.charCodeAt(0)}_${Date.now()}`;
  return mockHash;
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  // In a real app, this would compare with bcrypt
  // For mock purposes, we'll just check if it's our mock hash format
  return hashedPassword.startsWith('mock_hash_') && hashedPassword.includes(password.length.toString());
}
