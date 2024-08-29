"use client";
import { toast } from "sonner";

import { useNavbarStore } from "@/src/store/navbar";
import { GetProfileResponse, updateProfileImage } from "@/src/services/authData";

import { CameraSvg } from "@/src/components/icons";



interface Props {
  profileData: GetProfileResponse | null;
}



export default function ProfilePic({ profileData }: Props) {

  const { profileUrlImage, setProfileUrlImage } = useNavbarStore();


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const resp = await updateProfileImage(formData);
      if ('errorMessage' in resp) {
        return toast.error(resp.errorMessage);
      }
      toast.success('Profile picture updated');
      setProfileUrlImage(`${resp.url}?`);
      
    } catch (error) {
      toast.error('Error updating profile picture');
    } finally {
      e.target.value = '';
    }
  }



  return (
    <>
    <div className="relative">
      <img src={profileUrlImage || "https://beant.s3.eu-west-3.amazonaws.com/web_images/default_avatar.jpg"} alt="profile" className="rounded-full aspect-square h-40 object-cover" />

      <label htmlFor="profile_picture" className="cursor-pointer p-2 bg-primary text-primary-foreground rounded-full border-2 border-primary-foreground absolute right-0 bottom-0 hover:bg-primarySoft transition-colors duration-150">
        <CameraSvg />
      </label>
      <input
        type="file"
        id="profile_picture"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>

    <h2 className="font-medium text-primary mt-4 text-center">
      {`${profileData?.user.name} ${profileData?.lastName}`}
    </h2>
    <p className="text-muted-foreground">{profileData?.profession}</p>
    </>
  )
}