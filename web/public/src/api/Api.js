const axios = require("axios");

class Response {
    constructor(response) {
        if (response == undefined) {
            this.response = {
                data: {
                    status: "error",
                    message: "Offline.",
                    data: {}
                }
            }
        } else
            this.response = response;

        this.status = this.response.data.status;
    }

    getResponseCode() {
        return this.response.status;
    }

    isSuccess() {
        return this.getResponseCode() == 200;
    }

    isError() {
        return !this.isSuccess();
    }

    getResponse() {
        if (this.isError()) {
            return null;
        }

        return this.response.data;
    }
}

class Api {
    constructor() {
        this.baseURI = process.env.NODE_ENV == "development" ? "http://localhost:2017/" : "https://api.cajthaml.eu/";
    }

    async getLectures() {
        let response;

        try {
            response = await axios.get(this.baseURI + "subjects");
        } catch (err) {
            response = err.response;
        }

        return new Response(response);
    }

    /*
    async getLecture(shortcut) {
        let response;

        try {
            response = await axios.get(this.baseURI + "lecture/" + shortcut);
        } catch (err) {
            response = err.response;
        }

        return new Response(response);
    }

    async getLecturePage(shortcut, page) {
        let response;

        try {
            response = await axios.get(this.baseURI + "lecture/" + shortcut + "/page/" + page);
        } catch (err) {
            response = err.response;
        }

        return new Response(response);
    }

    async getLectureTest(shortcut, test) {
        let response;

        try {
            response = await axios.get(this.baseURI + "lecture/" + shortcut + "/test/" + test);
        } catch (err) {
            response = err.response;
        }

        return new Response(response);
    }

    async getLectureHomework(shortcut, homework) {
        let response;

        try {
            response = await axios.get(this.baseURI + "lecture/" + shortcut + "/homework/" + homework);
        } catch (err) {
            response = err.response;
        }

        return new Response(response);
    }*/
}


const api = new Api();

export default api;
