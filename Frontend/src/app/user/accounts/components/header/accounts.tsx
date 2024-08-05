import { createAccount, GetAccountsResponse, updateFavoriteAccount } from "@/src/services/accountData";

import AccountCard from "./account_card";
import CreateAccountCard from "./create_account_card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel"

interface Props {
  allAccounts: GetAccountsResponse | null;
}

export default async function AllAccounts({allAccounts}: Props) {


  
  return (
    <>
    <h1 className="text-2xl font-semibold mt-1 text-primary">
      Accounts
    </h1>

    <Carousel
      className="w-full"
      opts={{
        dragFree: true,
      }}
    >
      <CarouselContent className="">

        {allAccounts?.accounts.map((account) => (
          <CarouselItem key={account.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
            <AccountCard
              account={account}
              favoriteAccountId={allAccounts?.favoriteAccountId}
              updateFavoriteAccount={updateFavoriteAccount}
            />
          </CarouselItem>
        ))}
        
        <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
          <CreateAccountCard
            accountNumber={allAccounts?.accounts.length || 0} 
            createAccount={createAccount}
          />
        </CarouselItem>
      
      </CarouselContent>
      <CarouselPrevious className="block"/>
      <CarouselNext />
    </Carousel>
    </>
  )
}