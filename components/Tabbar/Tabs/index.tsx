import React from "react";

import cn from "classnames";

import styles from "./styles.module.scss";
import { TabContext } from "./TabContext";

export { TabContext } from "./TabContext";

export const Tabs = (props: any) => {
  const {
    component: Component = "div",
    className,
    onChange,
    value,
    size,
    ...rest
  } = props;

  const classOfComponent = cn(styles.tabs, className);

  return (
    <TabContext.Provider value={{ onChange, value }}>
      <Component {...rest} className={classOfComponent} />
    </TabContext.Provider>
  );
};

export default Tabs;
