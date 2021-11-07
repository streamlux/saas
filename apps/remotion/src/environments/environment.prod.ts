export const environment = {
    production: true,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getTemplates: () => import('../app/components')
};
