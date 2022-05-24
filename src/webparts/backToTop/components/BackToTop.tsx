import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
// eslint-disable-next-line import/no-unresolved
import * as strings from "BackToTopWebPartStrings";

import styles from "./BackToTop.module.scss";

export interface IBackToTopProps {
    backgroundColor: string;
    disabled: boolean;
    scrollHeight: number;
    positionX: number;
    positionY: number;
    onHoverText: string;
    isEditMode: boolean;
    scrollBehavior: string;
}

const BackToTop: React.FC<IBackToTopProps> = ({ backgroundColor, disabled, scrollHeight, positionX, positionY, onHoverText, isEditMode, scrollBehavior }) => {
    const [shouldDisplay, setShouldDisplay] = React.useState<boolean>(false);

    const divWrapper = document.querySelectorAll('[data-automation-id="contentScrollRegion"]')[0];

    const scroll = () => {
        if (divWrapper.scrollTop > scrollHeight) {
            setShouldDisplay(true);
        } else {
            setShouldDisplay(false);
        }
    };

    const goTop = () => {
        divWrapper.scrollTo({ top: 0, behavior: scrollBehavior as ScrollBehavior });
    };

    divWrapper.addEventListener("scroll", () => {
        scroll();
    });

    return (
        <>
            {isEditMode && <h4>{strings.PropertyPaneDescription}</h4>}
            <div
                title={onHoverText}
                className={styles.backToTop}
                onClick={goTop}
                role="button"
                tabIndex={0}
                style={{ backgroundColor, display: disabled ? "none" : shouldDisplay || isEditMode ? "block" : "none", left: `${positionX}%`, bottom: `${positionY}%` }}
            >
                <Icon className={styles.icon} iconName="Up" />
            </div>
        </>
    );
};

export default BackToTop;
