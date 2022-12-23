import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

type menuItem = {
  value: string;
  text: string
}
interface DropDownProps {
  currValue: any;
  menuItems: menuItem[];
  handleChange: (value:string) => void;
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
      {menuItems.map((item) => (
        <MenuItem value={item.value}>{item.text}</MenuItem>
      ))}
    </Select>
  )
}
