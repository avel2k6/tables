export const texts = {
    confirm: 'Ок',
    cancel: 'Отмена',
    close: 'Закрыть',
};
export const classes = {
    component: 'cons-modal',
    wrapper: 'cons-modal__wrapper',
    wrapperFullscreen: 'cons-modal__wrapper_fullscreen',
    wrapperTab: 'cons-modal__wrapper_tab',
    backdrop: 'cons-modal__backdrop',
    focus: 'cons-modal__focus',
    dialog: 'cons-modal__dialog',
    dialogFullscreen: 'cons-modal__dialog_fullscreen',
    dialogTab: 'cons-modal__dialog_tab',
    header: 'cons-modal__header',
    headerRight: 'cons-modal__header_right',
    title: 'cons-modal__title',
    close: 'cons-modal__close',
    body: 'cons-modal__body',
    bodyFullscreen: 'cons-modal__body_fullscreen',
    bodyTab: 'cons-modal__body_tab',
    bodyRight: 'cons-modal__body_right',
    footer: 'cons-modal__footer',
    footerRight: 'cons-modal__footer_right',
};

export const modalSizes = {
    NORMAL: 'normal',
    TAB: 'tab',
    FULLSCREEN: 'fullscreen',
} as const;

export const roles = {
    dialog: 'dialog',
};

// Дефолтные тексты для окна подтверждения
export const confirmDefaultTexts = {
    title: '',
    body: 'Подтвердите действие',
    confirm: 'Ок',
    cancel: 'Отмена',
};
