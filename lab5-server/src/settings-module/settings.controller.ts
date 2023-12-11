import {Controller, Param, Body, Get, Put} from "@nestjs/common";
import {SettingsService} from "./settings.service";
import {Settings} from "./settings.interface";

@Controller('api/settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Get('get/')
    getSettings(): Settings {
        return this.settingsService.getSettings();
    }

    @Put('put/')
    updateSettings(@Body() updatedSettings: Partial<Settings>): Settings {
        this.settingsService.updateSettings(updatedSettings);
        return this.settingsService.getSettings();
    }
}