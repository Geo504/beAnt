import OptionAccount from "./optionAccount";



interface Props {
  accountName: string;
  users: any[];
}

export default async function HeaderCurrentAccount({accountName, users}: Props) {


  return (
    <div className="my-2 flex items-center justify-between">
      <h2 className="text-2xl font-semibold mt-1 text-primary">{accountName}</h2>

      <OptionAccount accountName={accountName} users={users} />
    </div>
  )
}
