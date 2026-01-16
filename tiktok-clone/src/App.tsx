import { Header, VideoFeed, BottomNav } from './components';
import './App.css';

function App() {
  return (
    <div className="app" data-testid="app">
      <Header />
      <main className="main-content">
        <VideoFeed />
      </main>
      <BottomNav />
    </div>
  );
}

export default App;

