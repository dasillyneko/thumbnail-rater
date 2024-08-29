'use client'

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import "@xixixao/uploadstuff/react/styles.css";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import clsx from "clsx";
import {isEmpty} from "lodash";
import { title } from "process";
import { useRouter } from "next/navigation";


const defaultErrorState={
    title: "",
    imageA: "",
    imageB: ""
}

export default function CreatePage(){
    
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    

    const createThumbnail = useMutation(api.thumbnails.createThumbnail);

    const [imageA, setImageA] = useState("");
    const [imageB, setImageB] = useState("");
    const [error, setError] = useState(defaultErrorState);
     
    const { toast } = useToast()  
    const router=useRouter() 


    return (
    <div className="mt-24 flex flex-col gap-2">
        <h1 className="text-4xl font-bold mb-2">Create a Thumbnail Test</h1>

        <p className="text-lg max-w-md mb-8">Get your thumbnails rated by millions of people</p>
    
    <form 
     onSubmit={async(e)=>{
        e.preventDefault();
        const form =e.target as HTMLFormElement;
        const formDate = new FormData(form);
        let newError={
            ...defaultErrorState
        }
        const title=formDate.get('title') as string;

        setError(()=>newError);

        if(!title){
            newError={
            ...newError,
                title: "required"
         }; 
        }


        if(!imageA){
            newError={
                ...newError,
                imageA: "required"
             };   
        }


        if(!imageB){
            newError={
                ...newError,
                imageB: "required"
             };    
        }

        setError(newError)


        const hasErrors = Object.values(newError).some(Boolean);

        if ( hasErrors){

            toast({
                title: "Form Error",
                description: "Please fill all fiels on the page",
                variant: "destructive",
              })
            return;
        }
        
        const thumbnailId = await createThumbnail({
            aImage:imageA,
            bImage:imageB,
            title,
        });

        router.push('/thumbnails/&{thumbnailId}');
     }}>
    <div className="flex flex-col gap-4 mb-8">
    <Label htmlFor="titile">Your test thumbnail title</Label>
    <Input 
    required id ="title"
     type="text" 
     name="title"
     placeholder="Label your test to make it simpler to manage" 
    className={clsx({
    border: error.title,
    "border-red-500": error.title,})}
    />
    {error.title && <p className="text-red-500 text-sm">{error.title}</p>}
    </div>

     <div className="grid grid-cols-2 gap-4 ">

        <div
         className={clsx("flex flex-col gap-4 rounded p-2 mb-8",{
            border: error.imageA,
            "border-red-500": error.imageA,
        })}>
            <h2 className="text-2xl font-bold">Check Image A</h2>

            {imageA && (
            <Image
            
             width="200"
             height="200"
             alt="image test a"
             src={`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${imageA}`}
            />
            )}

            <UploadButton
             uploadUrl={generateUploadUrl}
             fileTypes={["image/*"]}
             onUploadComplete={ async (uploaded: UploadFileResponse[]) => {
                setImageA((uploaded[0].response as any).storageId)
               
              }}
             onUploadError={(error: unknown) => {
        // Do something with the error.
             alert(`ERROR! ${error}`);
            }}
            />
            {error.imageA && <p className="text-red-500 text-sm">{error.imageA}</p>}
        </div>
        <div          
        className={clsx("flex flex-col gap-4 rounded p-2 mb-8",{
            border: error.imageB,
            "border-red-500": error.imageB,
        })}>
            <h2 className="text-2xl font-bold">Check Image B</h2>

            {imageB && (
            <Image
            width="200"
            height="200"
            alt="image test b"
            src={`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${imageB}`}
            />
            )}

            <UploadButton
             uploadUrl={generateUploadUrl}
             fileTypes={["image/*"]}
             onUploadComplete={ async (uploaded: UploadFileResponse[]) => {
                setImageB((uploaded[0].response as any).storageId)
               
              }}
             onUploadError={(error: unknown) => {
        // Do something with the error.
             alert(`ERROR! ${error}`);
            }}
            />
        {error.imageB && <p className="text-red-500 text-sm">{error.imageB}</p>}
        </div>
        <Button>Create Thumbnail Test</Button>
    </div>
    </form>

    </div>

    );
}

