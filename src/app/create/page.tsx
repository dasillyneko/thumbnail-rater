'use client'

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import "@xixixao/uploadstuff/react/styles.css";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { useState } from "react";
import Image from "next/image";


export default function CreatePage(){
    
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const saveStorageId = useMutation(api.files.saveStorage);
    const createThumbnail = useMutation(api.thumbnails.createThumbnail);

    const [imageA, setImageA] = useState("");
    const [imageB, setImageB] = useState("");


    return (
    <div className="mt-24 flex flex-col gap-2">
        <h1 className="text-4xl font-bold mb-2">Create a Thumbnail Test</h1>

        <p className="text-lg max-w-md mb-8">Get your thumbnails rated by millions of people</p>
    
    <form className="grid grid-cols-2 gap-4 ">
        <div>
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
        </div>
        <div>
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

        </div>
        <button>Create Thumbnail Test</button>
    </form>

    </div>

    );
}

