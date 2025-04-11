import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

export default function Home() {
  return (
    <div>
      <Head>
        <title>KI-Portfolio von Viktor Baal</title>
        <meta name="description" content="Data Analyst Portfolio mit KI-Fokus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <header role="banner">
          <h1>Viktor Baal - KI-Portfolio</h1>
          <p>Zukunftsarbeitsbereiche, Methoden und Strategien als Data Analyst mit KI-Unterstützung</p>
          <nav role="navigation" aria-label="Hauptnavigation">
            <ul>
              <li>
                <a href="https://www.linkedin.com/in/viktor-baal-bbb30383" 
                   target="_blank" 
                   rel="noopener noreferrer">LinkedIn</a>
              </li>
              <li>
                <a href="mailto:vb2019project@gmail.com">Kontakt</a>
              </li>
            </ul>
          </nav>
        </header>

        <section aria-labelledby="about-heading">
          <h2 id="about-heading">Über mich</h2>
          <p>Strategien für barrierefreies Arbeiten: Kombination mit mehreren großen Bildschirmen 
             (mindestens 32 Zoll) für eine produktive Arbeitsumgebung als sehbehinderter Data Analyst.</p>
        </section>

        <section aria-labelledby="projects-heading">
          <h2 id="projects-heading">Projekte</h2>
          <p>In Kürze: Projekte aus den Bereichen KI-Text, KI-Bild, KI-Sound und KI-Video.</p>
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Viktor Baal. Alle Rechte vorbehalten.</p>
      </footer>

      <Analytics />
    </div>
  );
} 