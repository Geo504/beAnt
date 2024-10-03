import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/src/components/ui/sheet"


interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  description?: string;
  side?: "center" | "bottom" | "top" | "left" | "right";
  children?: React.ReactNode;
}



export default function Modal({ children, isOpen, onOpenChange, title, description, side  }: Props) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      
      <SheetContent side={side}>
        <SheetHeader className="mb-4">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {description}
          </SheetDescription>
        </SheetHeader>

        {children}
        
      </SheetContent>
    </Sheet>
  )
}
