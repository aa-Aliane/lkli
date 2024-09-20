import Header from "./dialog.header";
import Footer from "./dialog.footer";
import Body from "./dialog.body";

interface IDialogProps extends React.ComponentPropsWithoutRef<"dialog"> {
  children: React.ReactNode;
}

const Dialog = (props: IDialogProps) => {
  const { children, open, ...otherProps } = props;
  return (
    <dialog className="dialog" {...otherProps} open={open}>
      {children}
    </dialog>
  );
};

export { Dialog, Footer, Header, Body };
