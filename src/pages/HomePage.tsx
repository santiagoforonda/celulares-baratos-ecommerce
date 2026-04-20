import { Brands } from "../components/home/Brands"
import { FeatureGrid } from "../components/home/FeatureGrid"
import { ProductGrid } from "../components/home/ProductGrid"
import { ProductGridSkeleton } from "../components/skeletons/ProductGridSkeleton"
import { prepareProducts } from "../helpers"
import { useHomeProducts } from "../hooks/products/useHomeProducts"


export const HomePage = () => {
  
  const {recentProducts,popularProducts,isLoading} = useHomeProducts();

  const preparedRecentsProducts = prepareProducts(recentProducts);
  const preparedPopularProducts = prepareProducts(popularProducts);

  return (
    <section>
      <FeatureGrid></FeatureGrid>
    {
      isLoading? (<ProductGridSkeleton numberOfProducts={4}></ProductGridSkeleton>):(
        <ProductGrid title="Nuevos productos" products={preparedRecentsProducts}></ProductGrid>
      )
    }

    {

      isLoading ? (<ProductGridSkeleton numberOfProducts={4}></ProductGridSkeleton>):(
        <ProductGrid title="Productos destacados" products={preparedPopularProducts}></ProductGrid>
      )
    }
      
      <Brands></Brands>
    </section>
  )
}
