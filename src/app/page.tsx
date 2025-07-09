import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect the root path to the new splash screen
  redirect('/portfolio/splash');
}
