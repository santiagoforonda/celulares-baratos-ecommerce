export const AboutPage = () => {
  return (
    <div className="space-y-5">
      <h1 className="text-center text-4xl font-semibold tracking-tight mb-5">Nuestra empresa</h1>

      <img src="" alt="Imagen de fondo" className="h-[500px] w-full object-cover"></img>

      <div className="flex flex-col gap-4 tracking-tighter leading-7 text-sm font-medium text-slate-800">
          <p>
            CelularesBaratos es una tienda en linea que se dedica a la
            venta de celulares, fundada en 2021. Nuestro objetivo es ofrecer a nuestros clientes la mejor
            calidad y precio en celulares. Contamos con un equipo de profesionales que se encargan de seleccionar
            los mejores productos para ti.
          </p>

          <p>
            En CelularesBaratos podras encontrar una amplia variedad de celulares de las mejores marcas. A demas, contamos
            con promociones y descuentos exclusivos para que puedas comprar tu celular al mejor precio.
          </p>


          <h2 className="text-3xl font-semibold tracking-tight mt-8 mb-4">
            
            ¡¡¡No esperes mas y compra tu celular en celularesBaratos!!!
          </h2>

          <p>Para mas informacion, no dudes en ponerte en contacto con nosotros, a traves de nuestro correo electronico: <a href="mailto:correo@celularesbaratos.com">correo@celularesbaratos.com</a>
          o llama al 33333333333</p>
      </div>
    </div>
  )
}
