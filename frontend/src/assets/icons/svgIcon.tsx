interface IconProps extends React.ComponentPropsWithoutRef<"svg"> {}

const Icon = (props: IconProps) => {
  const { children, ...otherProps } = props;

  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="black"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      {children}
    </svg>
  );
};

export default Icon;
