import {PostCategories, PostTypes} from "./enums"

export default class Post {
    readonly type: string
    readonly category: string
    readonly title?: string
    readonly url?: string
    readonly text?: string

    constructor(type: string, category: string, title?: string, url?: string, text?: string) {
        this.type = type;
        this.category = category;

        if (title !== '') this.title = title || '';
        if (url !== '') this.url = url || '';
        if (text !== '') this.text = text || '';
    }
}