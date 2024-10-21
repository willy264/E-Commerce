import './index.css'
import 'react-multi-carousel/lib/styles.css';

import BannerCategories from './ui/BannerCategories'
import HomeBanner from './ui/HomeBanner'
import Highlights from './ui/Highlights';
import Categories from './ui/Categories';

function App() {

  return (
    <main>
      <BannerCategories />
      <HomeBanner />
      <Highlights />
      <Categories />

      
    </main>
  )
}

export default App
