"use client";

import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";

import Link from "next/link";

export function Header(){
    return(
        <div className="border-b">
             <div className="h-16 container flex justify-between items-center">
              <div>ThumbnailRater</div>
               </div>
             </div>


    );
}