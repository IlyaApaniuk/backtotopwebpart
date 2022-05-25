declare interface IBackToTopWebPartStrings {
  WebPartLabel: string;
  PropertyPaneDescription: string;
  MainGroupName: string;
  BackgroundColorFieldLabel: string;
  DisabledFieldLabel: string;
  ScrollHeightLabel: string;
  PositionXLabel: string;
  PositionYLabel: string;
  OnHoverTextLabel: string;
  ScrollBehaviorLabel: string;
  ButtonSizeLabel: string;
  UseCustomButtonColorLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'BackToTopWebPartStrings' {
  const strings: IBackToTopWebPartStrings;
  export = strings;
}
