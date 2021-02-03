import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { Splashpage } from './pages/splash/splash.component';
import { TopNav } from './components/TopNav.component';
import Homepage from './pages/homepage/homepage.component';
import { Footer } from './components/Footer/Footer.component';

function App() {
  return (
    <div className="app">
      <TopNav />
      <Homepage />
      <Footer />
    </div>
  );
}

export default App;
