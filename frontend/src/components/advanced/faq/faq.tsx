import { Accordion, AccordionItem } from "../../basic/accordion";
import { useFaqProps } from "./faq.hooks";
import { IFaqItem } from "./faq.types";

interface IFaqProps {
  items: IFaqItem[];
}
const Faq = (props: IFaqProps) => {
  const { items } = props;

  const { accordionProps, accordionItemsProps } = useFaqProps(items);

  return (
    <Accordion {...accordionProps}>
      {accordionItemsProps?.map((item: any) => (
        <AccordionItem {...item}>{item.content}</AccordionItem>
      ))}
    </Accordion>
  );
};

export default Faq;
