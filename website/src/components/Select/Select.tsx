import React, {
  FC,
  ReactNode,
  SelectHTMLAttributes,
  DetailedHTMLProps,
} from "react";
import Label from "../Label";
import SelectWrapper from "./SelectWrapper";

interface SelectboxProps extends
  DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  children: ReactNode;
  label: string;
}

const Select: FC<SelectboxProps> = (
  { label, children, ...rest }: SelectboxProps,
): JSX.Element => {
  return (
    <div>
      <Label>{label}</Label>
      <SelectWrapper {...rest as SelectHTMLAttributes<HTMLSelectElement>}>
        {children}
      </SelectWrapper>
    </div>
  );
};

export default Select;
