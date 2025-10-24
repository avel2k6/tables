import './index.css';

console.log(
    '👋 This message is being logged by "renderer.js", included via webpack1',
);

window.api
    .notificationApi
    .sendNotification('My custom message!');

// Используем экспортированную функцию
async function readFile(filePath: string) {
    const result = await window.api.fileApi.openFile(filePath);
    if (result.success) {
        console.log('result: ', JSON.parse(result.data));
    }

    // try {
    //     const result = await window.api.fileApi.openFile(filePath);
    //     if (result.success) {
    //         console.log('Содержимое файла:', result.data);
    //         document.getElementById('file-content').textContent = result.data;
    //     } else {
    //         console.error('Ошибка чтения файла:', result.error);
    //     }
    // } catch (error) {
    //     console.error('Ошибка при вызове IPC:', error);
    // }
}

readFile('D:/svn/my-new-app/test.csv');
