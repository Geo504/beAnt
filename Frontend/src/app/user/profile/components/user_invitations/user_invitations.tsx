import NewInvitationBtn from "./new_invitation_btn";
import ReceivedInvitations from "./received_invitations";
import SentInvitations from "./sent_invitations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";



export default async function InvitationsAccounts() {


  return (
    <section className="col-span-8 sm:col-span-4 md:col-span-3 2xl:col-span-2 bg-secondary rounded px-3 py-2">
      <header className="flex justify-between mb-1">
        <h2 className="text-lg font-semibold">Invitations Account</h2>

        <NewInvitationBtn />
      </header>

      <Tabs defaultValue="received" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-8">
          <TabsTrigger value="received">Received</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
        </TabsList>

        <TabsContent value="received">
          <ReceivedInvitations />
        </TabsContent>

        <TabsContent value="sent">
          <SentInvitations />
        </TabsContent>
      </Tabs>

    </section>
  )
}
