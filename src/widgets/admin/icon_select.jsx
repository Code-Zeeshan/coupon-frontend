import icons from "@/assets/svg/index";

import { Select, Option } from "@material-tailwind/react";

export function IconSelect({ icon, setIcon }) {
  const handleChange = (e) => setIcon(icon === e ? "" : e);

  return (
    <Select value={icon} onChange={(e) => handleChange(e)}>
      {Object.keys(icons).map((iconName) => {
        const IconComponent = icons[iconName];
        return (
          <Option key={iconName} value={iconName} className="items-center">
            <IconComponent className="inline-block w-6 h-6 mr-2" />
            {iconName}
          </Option>
        );
      })}
    </Select>
  );
}
