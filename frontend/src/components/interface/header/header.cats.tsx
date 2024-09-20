import { useRef } from "react";
import { Button } from "../../basic/buttons";
import { useCategoriesQuery } from "../feed/queries/categories/categories.queries";
import { useCatsStore } from "../../../context/events/events.cats.context";
import { list } from "../../basic/list";
import { useEventsStore } from "../../../context/events/events.context";

const Cats = () => {
  const { data: items } = useCategoriesQuery();
  const categoriesRef = useRef(null);
  const { cats, setCatActive } = useCatsStore();
  const { addFilter, removeFilter } = useEventsStore();

  const handleSlideLeft = () => {
    categoriesRef?.current?.scrollBy({
      left: -200, // Adjust the value as needed
      behavior: "smooth",
    });
  };

  const handleSlideRight = () => {
    console.log("first", categoriesRef.current);
    categoriesRef?.current?.scrollBy({
      left: 200, // Adjust the value as needed
      behavior: "smooth",
    });
  };

  const handleSelectCategory = (cat: ICat, index: number) => {
    if (!cat.active) addFilter("cats", cat.name);
    else removeFilter("cats", cat.name);
    setCatActive(index, !cat.active);
  };
  return (
    <>
      <Button
        className="btn btn--variant-0 arrow"
        icon={<span className="material-symbols-outlined">arrow_left</span>}
        onClick={handleSlideLeft}
      />
      <list.List
        className="flex flex--align-center gap-1 header__categories"
        ref={categoriesRef}
      >
        {cats?.map((item: any, index: number) => (
          <list.Item key={item.id}>
            <Button
              className="btn btn--variant-4"
              onClick={() => handleSelectCategory(item, index)}
              data-active={item.active}
            >
              {item.name}
            </Button>
          </list.Item>
        ))}
      </list.List>
      <Button
        className="btn btn--variant-0 arrow"
        icon={<span className="material-symbols-outlined">arrow_right</span>}
        onClick={handleSlideRight}
      />
    </>
  );
};

export default Cats;
