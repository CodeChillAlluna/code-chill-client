export default class Response {

    status: number;
    statusText: String;
    content: Object;

    constructor() {
        this.status = null;
        this.statusText = "";
        this.content = {};
    }

}