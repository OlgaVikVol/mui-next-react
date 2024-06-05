import Link from 'next/link';

export default function About() {
  return (
    <div className="tw-flex tw-min-h-screen tw-flex-col tw-gap-y-2 tw-items-center tw-p-24">
      <h1>About Page</h1>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
