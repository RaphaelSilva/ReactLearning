export function fetchPost<T>(url: string,
    body?: BodyInit | null,): Promise<T> {
    return new Promise((resolve, rejection) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }).then((response: Response) => {
            if (response.status === 200) {                
                response.json().then((data) => {                    
                    if (response.status === 200) {
                        resolve(data)
                    } else {
                        rejection(data)
                    }
                })
            } else {
                rejection(response)
            }
        }).catch((error) => {
            rejection(error)
        })
    })    
}

export function fetchGet<T>(url: string): Promise<T> {
    return new Promise((resolve, rejection) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response: Response) => {
            if (response.status === 200) {                
                response.json().then((data) => {                    
                    if (response.status === 200) {
                        resolve(data)
                    } else {
                        rejection(data)
                    }
                })
            } else {
                rejection(response)
            }
        }).catch((error) => {
            rejection(error)
        })
    })    
}
