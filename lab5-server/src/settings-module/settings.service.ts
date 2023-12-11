import {Injectable, OnModuleInit} from "@nestjs/common";
import {Settings} from "./settings.interface";
import * as fs from 'fs';
import * as path from "path";

@Injectable()
export class SettingsService implements OnModuleInit {
    private readonly settingsFilePath = './src/data/settings.json'
    private settings: Settings = {} as Settings;

    public onModuleInit(): void {
        this.load()
    }

    private load(): void {
        try{
            const content = fs.readFileSync(path.join(__dirname, '..', '..', this.settingsFilePath), 'utf-8');
            this.settings = JSON.parse(content) as Settings;
        } catch (error) {
            console.error('Error loading settings', error.message);
        }
    }

    private save(): void {
        try {
            fs.writeFileSync(this.settingsFilePath, JSON.stringify(this.settings, null, 2), 'utf-8')
        } catch (error) {
            console.error('Error saving settings', error.message);
        }
    }

    public getSettings(): Settings {
        return this.settings;
    }

    public updateSettings(updatedSettings: Partial<Settings>): void {
        this.settings = { ...this.settings, ...updatedSettings};
        this.save();
    }

    public setNextDate(newDate: string): void {
        this.settings.currentDate = newDate;
    }


}