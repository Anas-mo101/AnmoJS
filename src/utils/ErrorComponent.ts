import BuildElement from '../BuildElement';

export default class ErrorComponent {

    error: string | null;

    constructor(error: string | null) {
        this.error = error;
    }

    getComponentHTML() {
        try {
            return BuildElement ({
                tag: 'div',
                attributes: [
                    { attribute: 'class', value: ['bg-red-500 h-full items-center']},
                ],
                content: [
                    BuildElement ({
                        tag: 'div',
                        attributes: [
                            { attribute: 'class', value: ['text-lg text-black font-bold']},
                        ],
                        content: [
                            BuildElement ({
                                tag: 'h1',
                                attributes: [
                                    { attribute: 'class', value: ['text-lg text-center text-black font-bold']},
                                ],
                                content: `Something went wrong !`,
                            }),
                            !this.error ? null : BuildElement ({
                                tag: 'h1',
                                attributes: [
                                    { attribute: 'class', value: ['text-sm text-center text-black font-bold']},
                                ],
                                content: `Error: ` + this.error,
                            }) 
                        ]
                    })
                ]
            });
        } catch (error) {
            console.error(`ErrorComponent: ${error}`);
        }
    }
}
