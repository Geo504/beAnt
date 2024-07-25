"use client";

import { useState } from "react";

import { CameraSvg } from "@/src/components/icons";
import { GetProfileResponse } from "@/src/services/authData";



interface Props {
  profileData: GetProfileResponse | null;
}

export default function ProfilePic({ profileData }: Props) {
  const [imageUrl, setImageUrl] = useState<string>("https://beant.s3.eu-west-3.amazonaws.com/web_images/default_avatar.jpg");

  if (profileData && profileData.user.img) {
    setImageUrl(profileData.user.img);
  }



  return (
    <>
    <div className="relative">
      <img src={imageUrl} alt="profile" className="rounded-full h-40" />

      <label htmlFor="profile_picture" className="cursor-pointer p-2 bg-primary text-primary-foreground rounded-full border-2 border-primary-foreground absolute right-0 bottom-0 hover:bg-primarySoft transition-colors duration-150">
        <CameraSvg />
      </label>
      <input type="file" id="profile_picture" className="hidden" />
    </div>

    <h2 className="font-medium text-primary mt-4 text-center">
      {`${profileData?.user.name} ${profileData?.lastName}`}
    </h2>
    <p className="text-muted-foreground">{profileData?.profession}</p>
    </>
  )
}