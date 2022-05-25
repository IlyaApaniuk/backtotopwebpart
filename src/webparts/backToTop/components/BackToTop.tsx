import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { TooltipHost } from "@fluentui/react/lib/Tooltip";
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
    size: number;
    useCustomColor: boolean;
}

const BackToTop: React.FC<IBackToTopProps> = ({ backgroundColor, disabled, scrollHeight, positionX, positionY, onHoverText, isEditMode, scrollBehavior, size, useCustomColor }) => {
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
                className={styles.backToTopWrapper}
                style={{
                    display: disabled ? "none" : shouldDisplay || isEditMode ? "block" : "none",
                    left: `${positionX}%`,
                    bottom: `${positionY}%`
                }}
            >
                <TooltipHost content={onHoverText} calloutProps={{ gapSpace: size }}>
                    <PrimaryButton
                        className={styles.backToTop}
                        onClick={goTop}
                        style={{
                            minWidth: 10,
                            minHeight: 10,
                            padding: size,
                            backgroundColor: useCustomColor ? backgroundColor : "",
                            borderColor: useCustomColor ? backgroundColor : ""
                        }}
                    >
                        <Icon className={styles.icon} iconName="Up" />
                    </PrimaryButton>
                </TooltipHost>
            </div>
        </>
    );
};

export default BackToTop;
