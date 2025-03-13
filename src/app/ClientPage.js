"use client";

import Image from "next/image";
import bg from "../../public/background/codebg.jpg";
import RenderModel from "@/components/RenderModel";
import Model from "@/components/models/model";

export default function ClientPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <Image
        src={bg}
        alt="background-image"
        className="w-full h-full object-cover object-center opacity-25"
      />
      <div className="w-full h-screen">
        <RenderModel>
          <Model />
        </RenderModel>
      </div>
    </main>
  );
}
