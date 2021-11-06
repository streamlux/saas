/* eslint-disable-next-line */
export interface TemplatesProps {}

export function Templates(props: TemplatesProps) {
    return (
        <div>
            <h1>Welcome to Templates!</h1>
        </div>
    );
}

export const Hello: React.FC<TemplatesProps> = (props: TemplatesProps) => {
    return (
        <div>
            <h1>Hello, world!</h1>
        </div>
    );
};

export default {
    hello: Hello,
    templates: Templates,
};
