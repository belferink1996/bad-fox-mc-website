import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import FoxTraitsCatalog from '../../../components/Catalogs/Traits/Fox'

export default function Page() {
  return (
    <div className='App flex-col'>
      <Header />
      <FoxTraitsCatalog />
      <Footer />
    </div>
  )
}
