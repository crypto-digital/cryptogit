import { useState } from 'react';
import Sidebar from './components/Sidebar';
import LoadingScreen from './components/LoadingScreen';
import Hero from './sections/Hero';
import DataComparison from './sections/DataComparison';
import WhatIsCrypto from './sections/WhatIsCrypto';
import History from './sections/History';
import Ciphers from './sections/Ciphers';
import EncryptionTool from './sections/EncryptionTool';
import Hashing from './sections/Hashing';
import Quiz from './sections/Quiz';
import WhyImportant from './sections/WhyImportant';
import Problems from './sections/Problems';
import Sources from './sections/Sources';
import Footer from './sections/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <div className={`min-h-screen bg-black text-white overflow-x-hidden transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Sidebar />
        <main className="lg:ml-0">
          <Hero />
          <DataComparison />
          <WhatIsCrypto />
          <History />
          <Ciphers />
          <EncryptionTool />
          <Hashing />
          <Quiz />
          <WhyImportant />
          <Problems />
          <Sources />
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;
