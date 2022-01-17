//! Default Compute@Edge template program.
import tutorialPage from "./fastly-compute-jsc8-tutorial.html"
import { createCollection, deleteDocument, getAllDocuments, insertDocument } from "./collection"

// The entry point for your application.
//
// Use this fetch event listener to define your main request handling logic. It could be
// used to route based on the request properties (such as method or path), send
// the request to a backend, make completely new requests, and/or generate
// synthetic responses.

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)))

async function handleRequest(event) {
    // Get the client request.
    let response
    let request = event.request
    let url = new URL(request.url)

    switch (url.pathname) {
        case "/":
            response = new Response(tutorialPage, {
                status: 200,
                headers: new Headers({ "Content-Type": "text/html; charset=utf-8" }),
            })
            break
        case "/collection":
            response = await createCollection(request)
            break
        case "/insertDocument":
            response = await insertDocument(request)
            break
        case "/deleteDocument":
            response = await deleteDocument(request)
            break
        case "/getAllDocuments":
            response = await getAllDocuments(request)
            break
        default:
            response = new Response("The page you requested could not be found", {
                status: 404,
            })
            break
    }

    return response
}
