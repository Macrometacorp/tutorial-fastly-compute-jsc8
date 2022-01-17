import { getJsc8Client } from "./jsc8Instance"
import { getBodyParameters } from "./utils/helper"

const HEADERS = {
    CONTENT_TYPE: {
        TEXT: "text/plain",
        JSON: "application/json",
    },
}

// 405 Method Not Allowed
export const createCollection = async (request) => {
    const headers = new Headers()
    const { username, password, fabricName, collectionName } = await getBodyParameters(request.body)

    const jsc8Client = await getJsc8Client(fabricName)
    await jsc8Client.login(username, password)

    const collectionExists = await jsc8Client.hasCollection(collectionName)

    if (!collectionExists) {
        const createCollectionResponse = await jsc8Client.createCollection(collectionName, {
            isLocal: false,
            stream: true,
        })

        headers.set("Content-Type", HEADERS.CONTENT_TYPE.JSON)
        return new Response(JSON.stringify(createCollectionResponse), {
            headers,
            status: 200,
        })
    }

    headers.set("Content-Type", HEADERS.CONTENT_TYPE.TEXT)
    return new Response("Collection already exists.", {
        headers,
        status: 409,
    })
}

export const getAllDocuments = async (request) => {
    const headers = new Headers()
    const { username, password, fabricName, collectionName } = await getBodyParameters(request.body)

    const jsc8Client = await getJsc8Client(fabricName)
    await jsc8Client.login(username, password)

    const collectionExists = await jsc8Client.hasCollection(collectionName)

    let documents = []
    if (collectionExists) {
        documents = await jsc8Client.getDocumentMany(collectionName)
    }

    headers.set("Content-Type", HEADERS.CONTENT_TYPE.JSON)
    return new Response(JSON.stringify(documents), {
        headers,
        status: 200,
    })
}

export const insertDocument = async (request) => {
    const headers = new Headers()
    const { username, password, fabricName, collectionName, content } = await getBodyParameters(request.body)

    const jsc8Client = await getJsc8Client(fabricName)
    await jsc8Client.login(username, password)

    const collectionExists = await jsc8Client.hasCollection(collectionName)
    if (!collectionExists) {
        headers.set("Content-Type", HEADERS.CONTENT_TYPE.TEXT)
        return new Response("Collection does not exists. Please Click on Create Collection", {
            headers,
            status: 404,
        })
    }

    const response = await jsc8Client.insertDocument(collectionName, content)
    headers.set("Content-Type", HEADERS.CONTENT_TYPE.JSON)
    return new Response(JSON.stringify(response), {
        headers,
        status: 200,
    })
}

export const deleteDocument = async (request) => {
    const headers = new Headers()
    const { username, password, fabricName, collectionName, key } = await getBodyParameters(request.body)

    const jsc8Client = await getJsc8Client(fabricName)
    await jsc8Client.login(username, password)

    const response = await jsc8Client.deleteDocument(collectionName, key)
    headers.set("Content-Type", HEADERS.CONTENT_TYPE.JSON)
    return new Response(JSON.stringify(response), {
        headers,
        status: 200,
    })
}
