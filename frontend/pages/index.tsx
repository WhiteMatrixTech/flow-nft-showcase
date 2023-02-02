import { Content, Header } from "../components";

export default function Home() {
  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* bg */}
      <div className="absolute left-0 top-0 mix-blend-soft-light w-full h-full bg-center bg-cover bg-[url('../assets/images/bg.png')]"></div>
      <div className="absolute left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.8)]"></div>
      {/* header */}
      <Header />
      {/* content */}
      <Content />
    </div>
  );
}
