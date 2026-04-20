import { Brands } from "../components/home/Brands"
import { FeatureGrid } from "../components/home/FeatureGrid"
import { ProductGrid } from "../components/home/ProductGrid"
import { ProductGridSkeleton } from "../components/skeletons/ProductGridSkeleton"
import { useHomeProducts } from "../hooks/products/useHomeProducts"


export const HomePage = () => {
  
  const {recentProducts,popularProducts,isLoading,isError} = useHomeProducts();

  
  return (
    <section>
      <FeatureGrid></FeatureGrid>
    {
      isLoading? (<ProductGridSkeleton numberOfProducts={4}></ProductGridSkeleton>):(
        <ProductGrid title="Nuevos productos" products={}></ProductGrid>
      )
    }

    {

      isLoading ? (<ProductGridSkeleton numberOfProducts={4}></ProductGridSkeleton>):(
        <ProductGrid title="Productos destacados" products={}></ProductGrid>
      )
    }
      
      <Brands></Brands>
    </section>
  )
}
