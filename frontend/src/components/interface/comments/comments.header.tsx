import { bhf } from "../../basic/bhf";
import { Button } from "../../basic/buttons";
import { useRouter } from "@tanstack/react-router";

const Header = () => {
  const router = useRouter();
  return (
    <bhf.Header>
      <Button
        className="btn btn--naked"
        icon={<span className="material-symbols-outlined">arrow_left_alt</span>}
        onClick={() => router.history.back()}
      />
    </bhf.Header>
  );
};

export default Header;
