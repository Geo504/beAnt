import { Badge } from "@/src/components/ui/badge";


interface Props {
  usersAccount: any[];
}



export default function UsersAccount({ usersAccount }: Props) {


  return (
    <section className="mt-8">

      <h2 className="text-lg font-semibold text-center sm:text-left">Users Account</h2>
      <p className="text-sm text-muted-foreground text-center sm:text-left">List of all users related to this account</p>
      <div className="flex flex-col mt-1">
        {usersAccount.map((user) => (
          <div key={user.email} className="flex gap-2 items-center px-2 py-1 rounded-md hover:bg-primary-foreground transition-colors duration-200">
            <img
              src={user.img || "https://beant.s3.eu-west-3.amazonaws.com/web_images/default_avatar.jpg"}
              alt={user.name}
              className="w-9 h-9 rounded-full"
            />
            <div className="text-sm">
              <p className="font-semibold">
                {user.name}
                <Badge className="ml-1.5 capitalize" variant={"tertiary"}>{user.role}</Badge>
              </p>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
