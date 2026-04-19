

const brands =[
    {
        iamge:"/img/logos/Apple-Logo.webp",
        alt:"Apple"
    },
    {
        iamge:"/img/logos/honor-logo.png",
        alt:"Honor"
    },
    {
        iamge:"/img/logos/huawei-logo.png",
        alt:"Huawei"
    },
    {
        iamge:"/img/logos/realme-logo.webp",
        alt:"Realme"
    },
    {
        iamge:"/img/logos/Samsung_Logo.webp",
        alt:"Samsung"
    },
    {
        iamge:"/img/logos/xiaomi-logo.webp",
        alt:"Xiaomi"
    }
]


export const Brands = () => {
  return (
    <article className="flex flex-col items-center gap-3 pt-16 pb-12">
        <h2 className="font-bold text-2xl">
            Marcas que disponemos
        </h2>

        <p className="w-2/3 text-center text-sm md:text-base">
            Tenemos lo mas moderno en tecnologia y los ultimos modelos de celulares disponible.
        </p>


        <div className="grid grid-cols-3 gap-6 mt-8 items-center md:grid-cols-6">
            {
                brands.map(brand=>(
                    <figure key={brand.alt}>
                        <img src={brand.iamge} alt={brand.alt} className="w-20 h-20 object-contain"></img>
                    </figure>
                ))
            }
        </div>
    </article>

  )
}
