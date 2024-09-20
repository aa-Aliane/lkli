interface IBodyProps extends React.ComponentPropsWithoutRef<"div"> {
    children: React.ReactNode;
}

const Body = (props: IBodyProps) => {
    const { children, ...otherProps } = props;
    return <div className="dialog__body" {...otherProps}>{children}</div>;
};

export default Body;