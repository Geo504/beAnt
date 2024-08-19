import ProfileSetup from "./components/profile_setup";


export default function ProfilePage() {
  return (
    <>
    <h1 className="text-2xl font-semibold mt-1 text-primary">Profile</h1>

    <main className="grid grid-cols-4 gap-4">
      <ProfileSetup />
    </main>
    </>
  )
}