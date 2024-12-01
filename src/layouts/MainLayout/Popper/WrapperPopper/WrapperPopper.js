import classNames from "classnames/bind";
import styles from "./WrapperPopper.module.scss";

const cx = classNames.bind(styles);
function WrapperPopper({ children }) {
  return <div className={cx("wrapper")}>{children}</div>;
}

export default WrapperPopper;
