import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push(
    {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader',
        ],
    },
    {
        test: /\.less$/i,
        use: [
            'style-loader',
            'css-loader',
            'less-loader',
        ],
    },
);

export const rendererConfig: Configuration = {
    module: {
        rules,
    },
    plugins,
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    },
};
