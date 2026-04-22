import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

type SheetContent = "cart" | "search" | null; 

export interface GlobalState{
    isSheetOpen: boolean;
    sheetContent:SheetContent;

    activeNavMobile:boolean;
    //Todo NavBar mobile

    setActiveNavMobile:(active:boolean) => void;
    openSheet:(Content:SheetContent) => void;
    closeSheet:() =>void;
}

const storeApi:StateCreator<GlobalState> = set => ({
    isSheetOpen:false,
    sheetContent:null,
    activeNavMobile:false,




    openSheet:(content) =>{
        set({isSheetOpen:true, sheetContent: content});
    },
    closeSheet: ()=>{
        set({isSheetOpen:false,sheetContent:null});
    },

    setActiveNavMobile:(active) =>{
        set({activeNavMobile:active});
    }
    
})

export const useGlobalStore = create<GlobalState>()(devtools(storeApi));