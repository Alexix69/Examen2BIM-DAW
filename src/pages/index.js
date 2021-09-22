import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Advices</title>
      </Head>
      <main>
          <Link href="/advice-management">Ir al administrador de consejos</Link>
          </main>
    </div>
  );
}
