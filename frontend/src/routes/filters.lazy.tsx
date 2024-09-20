import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "../components/basic/buttons";
import { useNavigate } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/filters")({
  pendingComponent: () => <div className="">loading</div>,
  component: Index,
});

function Index() {
  const navigate = useNavigate({ from: "/" });
  return (
    <div className="filters-page">
      <div className="flex flex-row">filters header</div>
      <Button
        icon={<span className="material-symbols-outlined">close</span>}
        onClick={() => navigate({ to: "/" })}
      ></Button>
    </div>
  );
}
