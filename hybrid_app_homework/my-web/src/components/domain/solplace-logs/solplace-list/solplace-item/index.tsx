import Image from "next/image";
import Link from "next/link";
import { FiMapPin } from "react-icons/fi";

type ISolPlaceItemProps = {
  id: string;
  images: string[];
  title: string;
  contents: string;
  addressCity: string;
  addressTown: string;
};

export default function SolPlaceItem(props: ISolPlaceItemProps) {
  return (
    <Link className="flex flex-col gap-2" href={`/solplace-logs/${props.id}`}>
      <div className="rounded-lg w-full overflow-hidden">
        <Image
          className="object-cover"
          src={props.images[0]}
          width={375}
          height={200}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <h3 className="text-base leading-[1.5rem] font-bold truncate">
            {props.title}
          </h3>
          <p className="truncate text-[#5f5f5f] text-sm">{props.contents}</p>
        </div>

        <div className="flex gap-2">
          <div className="text-[0.8125rem] leading-5 font-semibold text-[#777] flex items-center gap-1 truncate">
            <FiMapPin size={14} color="#777" />
            {props.addressCity} {props.addressTown}
          </div>
        </div>
      </div>
    </Link>
  );
}
