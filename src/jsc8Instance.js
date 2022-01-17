const jsC8 = require("jsc8")

let jsc8Client

const initClient = (fabricName) => {
    jsc8Client = new jsC8({
        url: "https://tushar.eng.macrometa.io",
        fabricName,
        agent: fetch,
        agentOptions: {
            backend: "gdn_url",
        },
    })
}

export const getJsc8Client = (fabricName) => {
    if (!jsc8Client) {
        initClient(fabricName)
    }
    return jsc8Client
}
