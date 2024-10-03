import { getInvitationsReceived, getInvitationsSent } from "@/src/services/invitationsAccount";

import InvitationCard from "./invitation_card";



export default async function ReceivedInvitations() {
  const invitationsReceived  = await getInvitationsReceived();


  
  return (
    <div className="max-h-48 overflow-y-auto">
      {invitationsReceived?.map((invitation) => (
        <InvitationCard key={invitation.id} invitation={invitation} />
      ))}
    </div>
  )
}
