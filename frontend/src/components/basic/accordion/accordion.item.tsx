

export interface IAccordionItemProps
  extends React.ComponentPropsWithoutRef<"div"> {
  title: string;
  children: React.ReactNode;
  displayFaq: Boolean;
  toggleButton: React.ReactNode;
}

const AccordionItem = (props: IAccordionItemProps) => {
  const { title, displayFaq, toggleButton, children, ...otherProps } = props;
  return (
    <div {...otherProps}>
      <div className="flex flex--row">
        <h3>{title}</h3>
        {toggleButton}
      </div>
      <div className="accordion__item__content" data-display-faq={displayFaq}>
        {children}
      </div>
    </div>
  );
};

export default AccordionItem;
