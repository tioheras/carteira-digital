import { Outlet } from 'react-router-dom';

function App() {
  return (
    <main className="flex items-center justify-center h-screen">
      <Outlet /> {/* Este componente renderiza as páginas filhas */}
    </main>
  );
}

export default App;