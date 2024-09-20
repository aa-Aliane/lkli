interface IFooterProps extends React.ComponentPropsWithoutRef<"footer"> {}

const Footer = (props: IFooterProps) => {
  const { children, ...otherProps } = props;
  return (
    <footer className="dialog-footer" {...otherProps}>
      {children}
    </footer>
  );
};

export default Footer;
