import { useFaqStore } from "./faq.context";
import { Button } from "../../basic/buttons";
import { useEffect } from "react";
import { IFaqItem } from "./faq.types";

export const useFaqProps = (items: IFaqItem[]) => {
  const { toggle, itemsState, initItemsState, setItemsState } = useFaqStore();

  const accordionProps = {
    className: "accordion",
  };

  const accordionItemsProps = itemsState.map((displayFaq, index) => ({
    className: "accordion__item",
    title: items[index].title,
    displayFaq,
    toggleButton: Button({
      text: "",
      className: "accordion__item__toggle",
      icon: (
        <span
          data-display-faq={displayFaq}
          className="material-symbols-outlined"
        >
          arrow_drop_down
        </span>
      ),
      onClick: () =>
        setItemsState(
          itemsState?.map((item, i) => (i === index ? !item : false))
        ),
    }),
    content: items[index].content,
  }));

  useEffect(() => {
    if (items) initItemsState(items.length);
  }, [items]);

  return { accordionProps, accordionItemsProps };
};
