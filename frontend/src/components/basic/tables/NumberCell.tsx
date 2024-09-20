import { useState } from "react";

interface propsType {
  initialValue?: number;
}

const NumberCell = (props: propsType) => {
  //   props
  const { initialValue } = props;

  // states
  const [value, setValue] = useState<number | undefined>(initialValue);

  //   handlers
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return <input type="number" value={value} onChange={handleChange} />;
};

export default NumberCell;
