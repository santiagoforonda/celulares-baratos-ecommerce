import { Brands } from "../components/home/Brands"
import { FeatureGrid } from "../components/home/FeatureGrid"
import { ProductGrid } from "../components/home/ProductGrid"

export const HomePage = () => {


  
  return (
    <section>
      <FeatureGrid></FeatureGrid>
      <ProductGrid title="Nuevos productos" products={[{id:1,title:"producto 1"}]}></ProductGrid>
      <ProductGrid title="Productos destacados" products={[{id:1,title:"producto 1"}]}></ProductGrid>
      <Brands></Brands>
    </section>
  )
}
