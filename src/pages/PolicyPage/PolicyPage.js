import classNames from "classnames/bind";
import styles from "./PolicyPage.module.scss";
const cx = classNames.bind(styles);

import { useTranslation } from "react-i18next";

function PolicyPage() {
  const { t } = useTranslation();

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <h1>{t("beingUpdated")}</h1>
      </div>
    </div>
  );
}

export default PolicyPage;
