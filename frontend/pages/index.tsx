import Image from "next/image";
import user from "../assets/images/user.svg";
import logo from "../assets/images/chainide_shield.svg";
import silhouetteSplash from "../assets/images/silhouette_splash.svg";
import silhouettePeople from "../assets/images/silhouette_people.svg";
export default function Home() {
  return (
    <div className="h-screen w-full relative overflow-auto">
      {/* bg */}
      <div className="absolute left-0 top-0 mix-blend-soft-light w-full h-full bg-center bg-cover bg-[url('../assets/images/bg.png')]"></div>
      <div className="absolute left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.8)]"></div>
      {/* nav */}
      <div>
        <Image
          alt="user"
          src={user}
          className="w-[21px] absolute right-[5%] top-5 cursor-pointer z-10"
        />
      </div>
      {/* content */}
      <div className="absolute h-[60%] w-full top-[25%] bg-[url('../assets/images/content_bg.png')] bg-repeat bg-[length:250px]">
        <div className="relative mx-auto my-2 h-[calc(100%_-_16px)] aspect-[1.68] bg-primaryBlack rounded-2xl shadow-[inset_0px_0px_3px_rgba(0,0,0,0.25)]">
          <Image
            alt="logo"
            src={logo}
            className="absolute left-[25%] w-[50%] -translate-y-[50%]"
          />
          <Image
            alt="silhouette splash"
            src={silhouetteSplash}
            className="absolute -left-[30%] w-[20%] top-[10%]"
          />
          <Image
            alt="silhouette people"
            src={silhouettePeople}
            className="absolute -right-[35%] w-[25%] -bottom-[30%]"
          />
        </div>
      </div>
    </div>
  );
}
