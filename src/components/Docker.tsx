interface Idocker {
    id: String;
    name?: String;
    os?: String;
    creationDate?: String;
    state?: String;
    status?: String;
    cpuPercent?: Number;
    ramUsed?: Number;

    getId?: () => String;
    getName?: () => String;
    getOs?: () => String;
    getCreationDate?: () => String;
    getStatus?: () => String;
    getState?: () => String;
    getCpuPercent?: () => Number;
    getRamUsed?: () => Number;
    setName?: (name: String) => void;
    turnOn?: () => Boolean;
    turnOff?: () => Boolean;
    pause?: () => Boolean;
    resume?: () => Boolean;
    delete?: () => Boolean;
}

export default class Docker implements Idocker {
    id: String;
    name: String;
    os: String;
    creationDate: String;
    state: String;
    status: String;
    cpuPercent: Number;
    ramUsed: Number;

    constructor() {
        this.id = this.getId();
        this.name = this.getName();
        this.os = this.getOs();
        this.creationDate = this.getCreationDate();
        this.state = this.getState();
        this.status = this.getStatus();
        this.cpuPercent = this.getCpuPercent();
        this.ramUsed = this.getRamUsed();
    }

    getId() {
        let id: String = "0123456789";
        return id;
    }

    getName() {
        let name: String = "Dummy docker";
        return name;
    }

    getOs() {
        let os: String = "ubuntu:latest";
        return os;
    }

    getCreationDate() {
        let date: String = "";
        return date;
    }

    getState() {
        let state: String = "ok";
        return state;
    }

    getStatus() {
        let status: String = "working";
        return status;
    }

    getCpuPercent() {
        let cpuPercent: Number = 0;
        return cpuPercent;
    }

    getRamUsed() {
        let ramUsed: Number = 0;
        return ramUsed;
    }
}