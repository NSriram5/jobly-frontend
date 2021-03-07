import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
    // the token for interactive with the API will be stored here.
    static token = "";

    // constructor(token = "") {
    //     this.token = token
    // }

    async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${JoblyApi.token}` };
        const params = (method === "get") ?
            data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** Get details on a company by handle. */
    async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }

    async getCompanies() {
        let res = await this.request(`companies`);
        return res.companies;
    }

    async getJob(id) {
        let res = await this.request(`jobs/${id}`);
        return res.job;
    }

    async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    async getJobs() {
        let res = await this.request(`jobs`);
        return res.jobs;
    }

    async postNewRegistration(newUser) {
        try {
            let res = await this.request(`auth/register`, newUser, "post");
            return res.token;
        } catch (e) {
            return { error: e };
        }
    }

    async postNewLogin(login) {
        try {
            let res = await this.request(`auth/token`, login, "post");
            return res.token;
        } catch (e) {
            return { error: "Invalid login" }
        }
    }

    async patchUser(updatedUser) {
        const username = updatedUser.username;
        debugger
        delete updatedUser.username;
        try {
            let res = await this.request(`users/${username}`, updatedUser, "patch");
            updatedUser["username"] = username;
            return res.user;
        } catch (e) {
            return { error: "Invalid password" }
        }
    }

    async userJobApply(application) {
        try {
            let res = await this.request(`users/${application.username}/jobs/${application.jobId}`, {}, "post");
            return res;
        } catch (e) {
            return { error: "Invalid job application attempt" };
        }
    }

}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;