import BuildElement from '../BuildElement.js';
export default class ErrorComponent {
    constructor(error) {
        this.error = error;
    }
    getComponentHTML() {
        try {
            return BuildElement({
                tag: 'div',
                style: {
                    'height': '100%', 'background-color': 'rgb(239 68 68)', 'align-items': 'center'
                },
                content: [
                    BuildElement({
                        tag: 'div',
                        style: {
                            'font-size': '1.125rem', 'line-height': '1.75rem', 'color': '#000000', 'font-weight': 'bold',
                        },
                        content: [
                            BuildElement({
                                tag: 'h1',
                                style: {
                                    'font-size': '1.125rem', 'line-height': '1.75rem', 'color': '#000000',
                                    'font-weight': 'bold', 'text-align': 'center'
                                },
                                content: `Something went wrong !`,
                            }),
                            !this.error ? null : BuildElement({
                                tag: 'h1',
                                style: {
                                    'font-size': '0.875rem', 'line-height': '1.25rem', 'color': '#000000',
                                    'font-weight': 'bold', 'text-align': 'center'
                                },
                                content: `Error: ` + this.error,
                            })
                        ]
                    })
                ]
            });
        }
        catch (error) {
            console.error(`ErrorComponent: ${error}`);
        }
    }
}
