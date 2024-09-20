import NumericFont from "../../ui/NumericFont";
import { useRouter } from "@tanstack/react-router";
import { Button } from "../../basic/buttons";

interface IProps {
  data: any;
}
const Header = (props: IProps) => {
  const { data } = props;

  const router = useRouter();
  return (
    <>
      <Button
        className="goback btn btn--variant-3"
        icon={<span className="material-symbols-outlined">arrow_left_alt</span>}
        onClick={() => router.history.back()}
      />
      <p className="name">{data?.name}</p>
      <div className="datetime flex flex--row gap-1">
        <NumericFont className="datetime__date">{data?.date}</NumericFont>
        <NumericFont className="datetime__time">{data?.time}</NumericFont>
      </div>
    </>
  );
};

export default Header;
