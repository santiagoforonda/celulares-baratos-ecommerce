import { EditorContent, useEditor, type JSONContent } from "@tiptap/react"
import type {  FieldErrors, UseFormSetValue } from "react-hook-form"
import type { ProductsFormValues } from "../../../lib/validators"
import StarterKit from "@tiptap/starter-kit";
import { useEffect, type ReactNode } from "react";

interface Props{
    setValue: UseFormSetValue<ProductsFormValues>;
    errors:FieldErrors<ProductsFormValues>;
    initialContent?: JSONContent;
}

export const AreaDescription = ({setValue,initialContent,errors}:Props) => {
  
  
    const editor = useEditor({
        extensions:[StarterKit],
        content:initialContent || "",
        onUpdate:({editor}) => {
            const content = editor.getJSON();
            setValue("description",content,{shouldValidate:true});
        },
        editorProps:{
            attributes:{
                class:
                    "focus:outline-none min-h-[150px] prose prose-sm sm:prose-base",
            }
        }
    })

    useEffect(()=>{
        if(initialContent && editor){
            editor.commands.setContent(initialContent);
        }
    },[initialContent,editor]);

    return (
    <div className="space-y-3">
        <EditorContent editor={editor}></EditorContent>
        {
            errors.description && (
                <p className="text-red-500 text-xs mt-1">
                    {
                        (errors.description.message as ReactNode) || "DEBES ESCRIBIR UNA DESCRIPCION" 
                    }
                </p>
            )
        }
    </div>
    )
}
