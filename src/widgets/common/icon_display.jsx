import icons from "@/assets/svg/index";

import { Fragment } from "react";

export function IconDisplay({ iconName, className }) {
  const IconComponent = icons[iconName];

  if (!IconComponent) {
    return <Fragment></Fragment>;
  }

  const classes = className ? className : "inline-block w-6 h-6 mr-2";

  return (
    <Fragment>
      <IconComponent className={classes} />
    </Fragment>
  );
}
