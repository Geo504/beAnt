"use client";
import { toast } from "sonner";

import { acceptInvitation, cancelInvitation, rejectInvitation } from "@/src/services/invitationsAccount";

import { Button } from "@/src/components/ui/button";
import { CheckSvg, CloseSvg } from "@/src/components/icons";



interface Props {
  invitationId: string;
  isReceived: boolean;
}



export default function InvitationButtons({ invitationId, isReceived }: Props) {

  const handleAccept = async () => {
    const accepted = await acceptInvitation(invitationId);
    if (accepted) {
      toast.success("Invitation accepted");
    } else {
      toast.error("Error accepting invitation");
    }
  }

  const handleReject = async () => {
    const rejected = await rejectInvitation(invitationId);
    if (rejected) {
      toast.success("Invitation rejected");
    } else {
      toast.error("Error rejecting invitation");
    }
  }

  const handleDelete = async () => {
    const canceled = await cancelInvitation(invitationId);
    if (canceled) {
      toast.success("Invitation canceled");
    } else {
      toast.error("Error canceling invitation");
    }
  }
  

  const handleCancel = async () => {
    if (isReceived) {
      handleReject();
    } else {
      handleDelete();
    }
  }


  
  return (
    <div className="flex justify-end gap-2">
      {isReceived && (
        <Button
          variant="default" 
          size="icon_sm" 
          className="h-7 w-7"
          onClick={handleAccept}
        >
          <CheckSvg className="w-4 h-4" />
        </Button>
      )}
      <Button
        variant="secondary"
        size="icon_sm"
        className="h-7 w-7 hover:bg-background"
        onClick={handleCancel}
      >
        <CloseSvg className="w-4 h-4" />
      </Button>
    </div>
  )
}