export interface Authenticated {
    isAuthenticated: boolean
}

export default class UserAuth implements Authenticated{

    private static user: UserAuth

    static getInst(): UserAuth {
        return this.user
    }
    
    static setInst(user: UserAuth): void {
        this.user = user
    }

    static clone(uAuth: UserAuth): UserAuth {
        const nUAuth = new UserAuth()
        nUAuth.name = uAuth.name
        nUAuth.isAuthenticated = uAuth.isAuthenticated
        nUAuth.addressIp = uAuth.addressIp
        nUAuth.route = uAuth.route
        nUAuth.filePath = uAuth.filePath
        nUAuth.fileName = uAuth.fileName
        nUAuth.profileId = uAuth.profileId
        return nUAuth
    }

    public name: string
    public isAuthenticated: boolean
    public addressIp: string
    public route: string
    public filePath: string
    public fileName: string
    public profileId: string

    constructor() {
        this.route = ''
        this.isAuthenticated = false
        this.name = ''
        this.addressIp = ''
        this.filePath = ''
        this.fileName = ''
        this.profileId = ''
    }

    public getUserProps(): Promise<void> {
        return fetch(this.route).then((res) => {
            res.json().then((data: UserAuth) => {
                this.name = data.name
                this.isAuthenticated = data.isAuthenticated
                console.log(data)
                console.log(this)
            })
        })
    }


}