import { ipcRenderer, contextBridge } from 'electron';
import { TReadFile } from './interfaces';

export const api = {
    notificationApi: {
        sendNotification(message: string) {
            ipcRenderer.send('notify', message);
        },
    },
    fileApi: {
        saveFile(data: any) {
            ipcRenderer.invoke('save-file', data);
        },
        openFile(filePath: string): Promise<TReadFile> {
            return ipcRenderer.invoke('read-file', filePath);
        },
    },
};

contextBridge.exposeInMainWorld('api', api);
