import Link from "next/link";
export default function BuyTicketPage() {
  return (
    <div>
      숙박권 메인 페이지
      <br />
      <br />
      <br />
      <Link className="btn" href="/buyticket/detail/1">
        숙박권상세
      </Link>
    </div>
  );
}
