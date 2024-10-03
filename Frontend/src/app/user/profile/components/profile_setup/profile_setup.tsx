import { getUserProfile, updateUser } from "@/src/services/authData";
import ProfileForm from "./profile_form";
import ProfilePic from "./profile_pic";



export default async function ProfileSetup() {
  const profileData = await getUserProfile();

  return (
    <div className="col-span-8 2xl:col-span-6 flex flex-col md:flex-row gap-2 md:gap-6 p-4 bg-secondary rounded min-h-60 text-primary">
      <section className="flex flex-col justify-center items-center md:border-r-2 md:pr-6">
        <ProfilePic profileData={profileData}/>
      </section>

      <section className="grow">
        <ProfileForm profileData={profileData} updateProfile={updateUser}/>
      </section>
    </div>
  )
}