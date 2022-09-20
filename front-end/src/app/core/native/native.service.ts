import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { EventBusService } from "../event-bus/event-bus.service";

export enum NativeMessageType {
    OPEN = 'openNui',
    CLOSE_NUI = 'closeNui',
    OPEN_INFOS = "openInfos"
}

@Injectable({providedIn: 'root'})
export class NativeService {
    public showNui = true;
    public data: any = null;

    constructor(private httpClient: HttpClient, 
                private router: Router,
                private eventBus: EventBusService) {
        window.addEventListener('message', this.handleNativeEvent.bind(this));
        
        window.addEventListener('keyup', this.close.bind(this));
    }

    public async sendData(event, data) {
        return await this.httpClient.post(`http://zo_blitz/${event}`, JSON.stringify(data)).toPromise();
    }

    public async close(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            await this.sendData("closeNui", { showNui: this.showNui });
        }
    }

    async handleNativeEvent(event: MessageEvent<any>) {
        this.data = event?.data;
        
        switch (this.data?.type) {
            case NativeMessageType.OPEN:
                this.showNui = true;
                await this.router.navigate(['/blitz']);

                break;

            case NativeMessageType.OPEN_INFOS:
                this.showNui = true;
                await this.router.navigate(['/iblitz']);

                break;

            case NativeMessageType.CLOSE_NUI:
                this.showNui = false;

                await this.router.navigate(['/']);

                break;
        }
    }
}