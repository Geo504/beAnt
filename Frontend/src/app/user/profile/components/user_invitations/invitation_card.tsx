import { Invitation } from "@/src/interfaces";

import InvitationButtons from "./invitation_buttons";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";



interface Props {
  invitation: Invitation;
  isReceived?: boolean;
}



export default async function InvitationCard({ invitation, isReceived=true }: Props) {

  const user = isReceived ? invitation.sender : invitation.guest;



  const formatDate = (date: Date): string => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  
    return formattedDate;
  };

  const firstLetter = user.name.charAt(0).toUpperCase();


  
  return (

    <div key={invitation.id} className="flex gap-1 p-1 rounded-md border border-transparent transition-all duration-150 hover:border-primary/20 hover:shadow dark:hover:shadow-primary/30">

      <Avatar className="h-12 w-12 hover:shadow-none">
        <AvatarImage src={ user.img } alt="user pic"/>
        <AvatarFallback className="bg-background">{firstLetter}</AvatarFallback>
      </Avatar>

      <aside className="text-xs font-medium grow flex justify-between gap-1 overflow-hidden">
        <div className="min-w-0">
          <div className="flex gap-1">
            <p className="min-w-0 truncate">{user.name}</p>
            <Badge className="capitalize" variant={"tertiary"}>{invitation.role}</Badge>
          </div>
          <p className="text-muted-foreground truncate">
            {user.email}
          </p>
          <p className="truncate"> 
            <span className="text-muted-foreground italic">To: </span>
            {invitation.account.name}
          </p>
        </div>

        <div className="min-w-max">
          <p className="text-right text-muted-foreground mb-1">{formatDate(invitation.createdAt)}</p>
          <InvitationButtons
            invitationId={invitation.id}
            isReceived={isReceived}
          />
        </div>
      </aside>

    </div>

  )
}
