
interface Props{
    content:string | number
}

export const CellTableProducts = ({content}:Props) => {
  return (
    <td className="p-4 font-medium tracking-tighter">
        {content}
    </td>
  )
}
