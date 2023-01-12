import type { SelectChangeEvent } from "@mui/material";
import { MenuItem, Select } from "@mui/material";

export type menuItem = {
  value: any;
  text: string
}
interface DropDownProps {
  currValue: any;
  menuItems: menuItem[];
  handleChange: (value:any) => void;
}
export function DropDown(props: DropDownProps) {
  const {
    currValue,
    menuItems,
    handleChange,
  } = props;
  
  return (
    <Select
      value={currValue}
      onChange={(event: SelectChangeEvent) => {
        handleChange(event.target.value)
      }}
    >
      {menuItems.map((item, index) => (
        <MenuItem value={item.value} key={index}>{item.text}</MenuItem>
      ))}
    </Select>
  )
}
