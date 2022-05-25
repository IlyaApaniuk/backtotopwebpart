import * as React from "react";
import * as ReactDom from "react-dom";
import { DisplayMode, Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration, PropertyPaneToggle, PropertyPaneSlider, PropertyPaneTextField, PropertyPaneDropdown } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
// eslint-disable-next-line import/no-unresolved
import * as strings from "BackToTopWebPartStrings";
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from "@pnp/spfx-property-controls";

import BackToTop, { IBackToTopProps } from "./components/BackToTop";

export interface IBackToTopWebPartProps {
    backgroundColor: string;
    disabled: boolean;
    scrollHeight: number;
    positionX: number;
    positionY: number;
    onHoverText: string;
    scrollBehavior: string;
    buttonSize: number;
    useCustomColor: boolean;
}

export default class BackToTopWebPart extends BaseClientSideWebPart<IBackToTopWebPartProps> {
    protected onInit(): Promise<void> {
        const canvasZone = this.context.domElement.parentElement.parentElement.parentElement;

        canvasZone.style.padding = "0";

        return super.onInit();
    }

    public render(): void {
        const element: React.ReactElement<IBackToTopProps> = React.createElement(BackToTop, {
            backgroundColor: this.properties.backgroundColor,
            disabled: this.properties.disabled,
            scrollHeight: this.properties.scrollHeight,
            positionX: this.properties.positionX,
            positionY: this.properties.positionY,
            onHoverText: this.properties.onHoverText,
            scrollBehavior: this.properties.scrollBehavior,
            size: this.properties.buttonSize,
            useCustomColor: this.properties.useCustomColor,
            isEditMode: this.displayMode === DisplayMode.Edit
        });

        ReactDom.render(element, this.domElement);
    }

    protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
        if (!currentTheme) {
            return;
        }

        const { semanticColors } = currentTheme;

        this.domElement.style.setProperty("--bodyText", semanticColors.bodyText);
        this.domElement.style.setProperty("--link", semanticColors.link);
        this.domElement.style.setProperty("--linkHovered", semanticColors.linkHovered);
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse("1.0");
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.MainGroupName,
                            groupFields: [
                                PropertyPaneTextField("onHoverText", {
                                    label: strings.OnHoverTextLabel,
                                    value: this.properties.onHoverText
                                }),
                                PropertyPaneToggle("useCustomColor", {
                                    label: strings.UseCustomButtonColorLabel,
                                    checked: this.properties.useCustomColor
                                }),
                                PropertyFieldColorPicker("backgroundColor", {
                                    label: "Color",
                                    selectedColor: this.properties.backgroundColor,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    properties: this.properties,
                                    disabled: false,
                                    debounce: 300,
                                    isHidden: false,
                                    alphaSliderHidden: false,
                                    style: PropertyFieldColorPickerStyle.Full,
                                    iconName: "Precipitation",
                                    key: "colorFieldId"
                                }),
                                PropertyPaneDropdown("scrollBehavior", {
                                    label: strings.ScrollBehaviorLabel,
                                    selectedKey: this.properties.scrollBehavior,
                                    options: [
                                        {
                                            key: "auto",
                                            text: "Auto"
                                        },
                                        {
                                            key: "smooth",
                                            text: "Smooth"
                                        }
                                    ]
                                }),
                                PropertyPaneToggle("disabled", {
                                    label: strings.DisabledFieldLabel,
                                    checked: this.properties.disabled
                                }),
                                PropertyPaneSlider("buttonSize", {
                                    label: strings.ButtonSizeLabel,
                                    value: this.properties.buttonSize,
                                    min: 10,
                                    max: 30
                                }),
                                PropertyPaneSlider("scrollHeight", {
                                    label: strings.ScrollHeightLabel,
                                    value: this.properties.scrollHeight,
                                    min: 50,
                                    max: 200
                                }),
                                PropertyPaneSlider("positionX", {
                                    label: strings.PositionXLabel,
                                    value: this.properties.positionX,
                                    min: 0,
                                    max: 100
                                }),
                                PropertyPaneSlider("positionY", {
                                    label: strings.PositionYLabel,
                                    value: this.properties.positionY,
                                    min: 0,
                                    max: 100
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
