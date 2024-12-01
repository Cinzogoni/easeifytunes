import styles from "~/components/GridSystem/GridSystem.module.scss";
import classNames from "classnames/bind";

import { memo } from "react";

const cx = classNames.bind(styles);

function GridSystem({
  children,
  gridClass,
  wideClass,
  rowClass,
  colClass,
  colRatio,
  colL,
  colML,
  colM,
  colSM,
  colS,
  colMo,
}) {
  const classes = cx(
    gridClass,
    wideClass,
    rowClass,
    colClass,
    colRatio,
    colL,
    colML,
    colM,
    colSM,
    colS,
    colMo
  );

  return <div className={classes}>{children}</div>;
}

export default memo(GridSystem);
