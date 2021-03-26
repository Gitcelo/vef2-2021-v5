//import s from './Layout.module.scss';

export function Layout({ children }) {
  return (
    <div>
      <header>
        <h1>Rúv fréttir</h1>
      </header>
      <main>
        {children}
      </main>
      <hr/>
      <footer>
      <p>Fréttir frá <a href="https://www.ruv.is/">RÚV</a>.</p>
      </footer>
    </div>
  );
}
