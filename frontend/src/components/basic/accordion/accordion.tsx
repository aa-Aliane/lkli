export interface IAccordionProps extends React.ComponentPropsWithoutRef<"ul"> {
  children: React.ReactNode;
}


const Accordion = (props: IAccordionProps) => {
  const { children, ...otherProps } = props;
  
  return <ul {...otherProps}>{children}</ul>;
};

export default Accordion;
