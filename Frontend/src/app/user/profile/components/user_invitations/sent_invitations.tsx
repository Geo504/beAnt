import { getInvitationsSent } from "@/src/services/invitationsAccount";

import InvitationCard from "./invitation_card";




export default async function SentInvitations() {
  const invitationsSent  = await getInvitationsSent();


  
  return (
    <div className="max-h-48 overflow-y-auto">
      {invitationsSent?.map((invitation) => (
        <InvitationCard key={invitation.id} invitation={invitation} isReceived={false} />
      ))}
    </div>
  )
}
