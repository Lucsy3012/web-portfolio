// Destructuring objects into their responses
export async function unwrap (res) {
    const json = await res.json()
    const { ok, status, statusText, headers } = res

    return {
        json,
        ok,
        status,
        statusText,
        headers
    }
}

export function checkStatus (status) {
    if (status !== 200) {
        const error = {
            message: 'Whoops, something went wrong'
        }
        return getErrorResponse(error)
    }
}

export function getErrorResponse (error) {
    return {
        ok: false,
        status: error.status || 500,
        statusText: error.message,
        json: error.json || {},
    }
}

export function export404 (res, error) {
    const responseError = {
        status: 404,
        statusText: error.message,
        json: error.json || {}
    }
    res.statusCode = 404
    res.status = 404
    rejectHitBadRequest(res, responseError)
    res.end()
}

export function rejectHitBadRequest (res, json) {
    res.statusCode ? null : res.statusCode = 400
    if (json) { res.end(JSON.stringify(json)) } else { res.end() }
}

export function sendJson (data, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}
