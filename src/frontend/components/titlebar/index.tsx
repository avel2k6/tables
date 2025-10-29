import './index.less';

const classes = {
    component: 'titlebar',
};

export const Titlebar = ({
    title = 'Редактор CSV таблиц',
}) => <div className={classes.component}>
    {title}
</div>;
