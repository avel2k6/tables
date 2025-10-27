import { createRoot } from 'react-dom/client';
import { App } from './components/app';

export const initApp = () => {
    const appContainerRoot = createRoot(document.getElementById('root'));
    appContainerRoot.render(<App/>);
};
