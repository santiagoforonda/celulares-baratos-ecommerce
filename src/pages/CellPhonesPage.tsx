import { useState } from "react";
import { ContainerFilter } from "../components/products/ContainerFilter"
import { useFilteredProducts } from "../hooks/products/useFilteredProducts";
import { Pagination } from "../components/shared/Pagination";


export const CellPhonesPage = () => {

  const [page,setPage] = useState(1);
  const [selectedBrands,setSelectedBrands] = useState<string[]>([]);

  const {data:products = [],isLoading,totalProducts} = useFilteredProducts({page,brands:selectedBrands});

    

  return (
    <>
      <h1 className="text-5xl font-semibold text-center mb-12" >CelularesS</h1>
    
    
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <ContainerFilter setSelectedBrands={setSelectedBrands} selectedBrands={selectedBrands}></ContainerFilter>
          {isLoading? (
            <div className="col-span-2 flex items-center justify-center h-[500px]">
              <p className="text-2xl">Cargando...</p>
            </div>
          ):(

            <div className="col-span-2 lg:col-span-2 xl:col-span-4 flex flex-col gap-12">
            <div className="grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4">
                {}
            </div>

            <Pagination totalItems={totalProducts} page={page} setPage={setPage}></Pagination>
          </div>
          )}
          
      </div>
    
    </>
  )
}
