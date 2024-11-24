import cn from "classnames";
import { useContext } from "react";

import styles from "./styles.module.scss";

import { TabContext } from "../Tabs";

export const Tab = (props: any) => {
  const {
    component: Component = "div",
    className,
    size,
    disabled,
    fullWidth,
    index,
    border,
    label,
    tag,
    children,
    ...rest
  } = props;

  const context = useContext(TabContext);
  const activated = context.value === index;

  const classOfComponent = cn(
    'tab-item',
    styles.root,
    {
      [styles[`size-${size}`]]: size,
      [styles.activated]: activated,
      [styles.disabled]: disabled,
      [styles["full-width"]]: fullWidth,
      [styles.border]: border,
      activated: activated,
    },
    className
  );

  function handleClick() {
    if (context.onChange) {
      context.onChange(index);
    }
  }

  let contentOfTab = children;
  return (
    <Component {...rest} onClick={handleClick} className={classOfComponent}>
      {contentOfTab}
    </Component>
  );
};

export default Tab;
