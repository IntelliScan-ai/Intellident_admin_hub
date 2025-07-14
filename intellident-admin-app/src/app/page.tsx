import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/login');
  return null; // This line is unreachable, but good practice to include
}
