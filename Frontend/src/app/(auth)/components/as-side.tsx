import { lifeSavers } from "@/src/components/ui/fonts";

import { GoogleSvg, InstagramSvg, LinkedinSvg, LogoSvg } from "@/src/components/icons";
import { Button } from "@/src/components/ui/button";

export default function AsSideAuth() {
  const contactsLink = [
    {
      Icon: InstagramSvg,
      url: "https://www.instagram.com",
    },
    {
      Icon: LinkedinSvg,
      url: "https://www.linkedin.com",
    },
    {
      Icon: GoogleSvg,
      url: "https://www.google.com",
    },
  ]



  return (
    <div className="w-full min-h-[32rem] md:min-h-full px-4 py-6 bg-primarySoft text-primary-foreground flex flex-col justify-between">
      <header className="flex">
        <LogoSvg size={36}/>
        <h1 className={`${lifeSavers.className} text-4xl`}>BeAnt</h1>
      </header>

      <main className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold h-6">
            Welcome to BeAnt
          </h2>
          <h2 className="text-2xl font-bold text-primary-foreground/60 mb-3">
            A personal finance app
          </h2>
          <p className="text-sm">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
          </p>
        </div>

        <ul className="flex gap-2">
          {contactsLink.map(({url, Icon}) => (
            <li key={url}>
              <Button variant={"outline"} size={"icon"}>
                <Icon size={29}/>
              </Button>
            </li>
          ))}
        </ul>

        <p className="text-xs">Privacy PolicyContact© 2024</p>
      </main>
    </div>
  )
}
