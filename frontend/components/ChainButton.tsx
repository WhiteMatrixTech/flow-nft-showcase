import Image, { StaticImageData } from "next/image";

export interface IChain {
  name: string;
  link: string;
  icon: StaticImageData;
}
type IChainButtonProps = IChain;
export function ChainButton(props: IChainButtonProps) {
  const { name, link, icon } = props;
  return (
    <a
      href={link}
      target="_blank"
      className="items-center justify-center flex px-3 py-[4px] xl:px-4 xl:py-[6px] gap-x-[7px] xl:gap-x-[11px] rounded-lg shadow-[inset_0px_0px_1px_rgba(0,0,0,0.25)] bg-secondaryBlack"
      rel="noreferrer"
    >
      <Image src={icon} alt={name} height={18} />
      <span className="text-sm xl:text-base">{name}</span>
    </a>
  );
}
