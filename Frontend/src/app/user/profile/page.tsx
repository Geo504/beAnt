import { getAllAccounts } from "@/src/services/accountData";
import ProfileModal from "./components/profileModal";
import ProfileSetup from "./components/profile_setup/profile_setup";
import UserInvitations from "./components/user_invitations/user_invitations";


export default async function ProfilePage() {
  const allAccounts = await getAllAccounts();

  return (
    <>
    <ProfileModal allAccounts={allAccounts?.accounts || []} />

    <h1 className="text-2xl font-semibold mt-1 text-primary">Profile</h1>

    <main className="grid grid-cols-8 gap-4">
      <ProfileSetup />
      <UserInvitations />
    </main>
    </>
  )
}