import {Settings} from "./settings.interface"


export interface SettingsState {
    data: Settings;
    tradingStarted: boolean;
}