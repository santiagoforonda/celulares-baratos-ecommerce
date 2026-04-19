import { ContainerFilter } from "../components/products/ContainerFilter"

export const CellPhonesPage = () => {




  return (
    <>
      <h1 className="text-5xl font-semibold text-center mb-12" >CelularesS</h1>
    
    
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <ContainerFilter></ContainerFilter>

          <div className="col-span-2 lg:col-span-2 xl:col-span-4 flex flex-col gap-12">
            <div className="grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4">
                {}
            </div>
          </div>
      </div>
    
    </>
  )
}
