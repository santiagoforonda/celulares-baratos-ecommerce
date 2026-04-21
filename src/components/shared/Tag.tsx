
type TagType ="nuevo" | "agotado";

interface Props{
    contentTag:TagType;
}


const getTagColor = (content: TagType):string=>{
    const lowerContent = content.toLocaleLowerCase();
    if(lowerContent === "nuevo"){
        return "bg-blue-500";
    }else if(lowerContent === "agotado") {
        return "bg-black";
    }

    return "bg-gray-500";
}

export const Tag = ({contentTag}:Props) => {
  return (
    <div className={`text-white w-fit px-2 ${getTagColor(contentTag)}`}>
        <p className="uppercase text-xs font-medium">{contentTag}</p>
    </div>
  )
}
