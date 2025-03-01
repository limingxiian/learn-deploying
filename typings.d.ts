import 'umi/typings';

declare module 'umi' {
    interface IConfig {
        customOption?: string;
    };
    export function useModel(namespace: string): any;
}